const express = require("express");
const fs = require("fs");
const router = express.Router();
const contentURL = `${__dirname}/../contentStorage`;
const path = require("path");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const ContentItem = require("../models/ContentItem");
const User = require("../models/User");

router.post("/evaluate", async (req, res) => {
  const { token, rating, itemId } = req.body;
  let verified;
  try {
    // checking if user's token is valid
    verified = await jwt.verify(token, secretKey);
  } catch (e) {
    res.status(400).send("invalid token");
    console.log(e);
  }
  try {
    if (verified) {
      // finding uploader by his id(from token)
      const uploader = await User.findById(verified._id);

      // checking if uploader has already rated this content-item
      let index = uploader.ratedContent.findIndex(
        // first itemId from database
        // second from request
        item => item.itemId === itemId
      );

      let ratedContent = uploader.ratedContent.slice();

      //if uploader has already rated this content-item -> rating changes
      //else pushes new information about rated content and it's rating
      if (index > -1) {
        ratedContent[index].rating = rating;
      } else {
        ratedContent.push({ itemId, rating });
      }

      await uploader.updateOne({ ratedContent });

      res.send();
    }
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.put("/all", async (req, res) => {
  try {
    let contentItems = await ContentItem.find();
    contentItems = contentItems.map(item => ({
      id: item._id,
      name: item.name,
      type: item.type,
      uploaderName: item.uploaderName,
      rating: item.rating
    }));

    let { videos, pictures, audios, texts, sortby, search, page } = req.query;

    // from string to valid type
    page = +page;
    videos = videos === "true" ? true : false;
    pictures = pictures === "true" ? true : false;
    audios = audios === "true" ? true : false;
    texts = texts === "true" ? true : false;

    if (!videos) {
      contentItems = contentItems.filter(item => item.type !== "video");
    }
    if (!pictures) {
      contentItems = contentItems.filter(item => item.type !== "picture");
    }
    if (!audios) {
      contentItems = contentItems.filter(item => item.type !== "audio");
    }
    if (!texts) {
      contentItems = contentItems.filter(item => item.type !== "text");
    }

    // sorted by old by default
    switch (sortby) {
      case "new":
        contentItems = contentItems.reverse();
        break;
      case "nameaz":
        contentItems = contentItems.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;
      case "nameza":
        contentItems = contentItems.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        break;
      case "uploadernameaz":
        contentItems = contentItems.sort((a, b) => {
          if (a.uploaderName < b.uploaderName) {
            return -1;
          }
          if (a.uploaderName > b.uploaderName) {
            return 1;
          }
          return 0;
        });
        break;
      case "uploadernameza":
        contentItems = contentItems.sort((a, b) => {
          if (a.uploaderName < b.uploaderName) {
            return 1;
          }
          if (a.uploaderName > b.uploaderName) {
            return -1;
          }
          return 0;
        });
        break;
    }

    // filtering based on search-word
    contentItems = contentItems.filter(
      item => item.uploaderName.indexOf(search) > -1
    );

    // 9 per page
    const contentLength = contentItems.length;
    contentItems = contentItems.slice(page * 9, page * 9 + 9);

    try {
      // adding personal rating to the content-item, if current user's token is verified
      const token = req.body.token;
      const validUser = await jwt.verify(token, secretKey);
      const uploader = await User.findById(validUser._id);
      const ratedContent = uploader.ratedContent;
      for (let ratedItem of ratedContent) {
        contentItems = contentItems.map(item => {
          if (JSON.stringify(item.id) === JSON.stringify(ratedItem.itemId)) {
            item.personalRating = ratedItem.rating;
          }
          return item;
        });
      }
    } catch (error) {}

    res.json({ contentItems, contentLength });
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.get("/picture/:id", async (req, res) => {
  try {
    res.sendFile(`${path.resolve(`${contentURL}/pictures/${req.params.id}`)}`);
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.get("/text/:id", (req, res) => {
  try {
    res.sendFile(`${path.resolve(`${contentURL}/texts/${req.params.id}`)}`);
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.get(`/video/:id`, (req, res) => {
  try {
    const path = `${contentURL}/videos/${req.params.id}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };

      res.writeHead(206, head); // returns a reference to the ServerResponse so that calls can be chained, 206 -> Partial Content
      file.pipe(res); // to transfer streams flow from source to destination
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      };

      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.get(`/audio/:id`, (req, res) => {
  try {
    const path = `${contentURL}/audios/${req.params.id}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg"
      };

      res.writeHead(206, head); // returns a reference to the ServerResponse so that calls can be chained, 206 -> Partial Content
      file.pipe(res); // to transfer streams flow from source to destination
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "audio/mpeg"
      };

      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

router.post("/upload", async (req, res) => {
  // checking if user is verified
  let isVerified;
  try {
    isVerified = await jwt.verify(req.body.token, secretKey);
  } catch (e) {
    res.status(500).send("invalid token");
    console.log(e);
  }

  try {
    if (isVerified) {
      const files = Object.values(req.files);
      for (let file of files) {
        let type = "";
        let extension = file.name
          .split("")
          .splice(file.name.lastIndexOf("."))
          .join("");
        switch (extension) {
          case ".mp4":
            type = "video";
            break;
          case ".mp3":
            type = "audio";
            break;
          case ".png":
          case ".jpg":
          case ".gif":
          case ".svg":
            type = "picture";
            break;
          case ".txt":
          case ".doc":
          case ".pdf":
          case ".docx":
            type = "text";
            break;
          default:
            throw Error("unknown type");
        }

        //saving files to the local server, path bases on type
        const path = `${contentURL}/${type}s/${file.name}`;
        await file.mv(path); // wait while saving a file
        const name = file.name;
        const uploaderName = req.body.uploaderName;
        const birthtimeMs = await fs.statSync(path).birthtimeMs;

        // adding information about files to the db
        let newContentItem = new ContentItem({
          path,
          name,
          type,
          birthtimeMs,
          uploaderName
        });

        await newContentItem.save();
      }

      res.status(200).send();
    }
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

module.exports = router;
