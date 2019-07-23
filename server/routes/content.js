const express = require("express");
const fs = require("fs");
const router = express.Router();
const contentURL = `${__dirname}/../contentStorage`;
const path = require("path");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const ContentItem = require("../models/ContentItem");

// router.get("/all", (req, res) => {
//   try {
//     const content = fs
//       .readdirSync(`${contentURL}`)
//       .filter(file => file !== ".DS_Store"); //get folders' names

//     let data = [];
//     for (dir of content) {
//       const files = fs
//         .readdirSync(`${contentURL}/${dir}/`)
//         .filter(file => file !== ".DS_Store");
//       for (file of files) {
//         data.push({
//           type: dir.slice(0, -1), //removes 's' from dir's name
//           content: file
//         });
//       }
//     }
//     data = data
//       .sort(
//         (file1, file2) =>
//           fs.statSync(`${contentURL}/${file2.type}s/${file2.content}`)
//             .birthtimeMs -
//           fs.statSync(`${contentURL}/${file1.type}s/${file1.content}`)
//             .birthtimeMs
//       )
//       .slice(0, 9);

//     res.send(JSON.stringify(data));
//   } catch (e) {
//     res.status(500).send("server error");
//     console.log(e);
//   }
// });

router.get("/all", async (req, res) => {
  try {
    let contentItems = await ContentItem.find(); // oldest
    contentItems = contentItems.reverse(); // newest
    // contentItems = contentItems.slice(0, 9); // only 9 per page
    contentItems = contentItems.map(item => ({
      name: item.name,
      type: item.type
    }));
    res.json(contentItems);
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
      files.forEach(async file => {
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
            type = "other";
            break;
        }

        const path = `${contentURL}/${type}s/${file.name}`;
        await file.mv(path); // wait while file saving
        const name = file.name;
        const uploaderName = req.body.uploaderName;
        const birthtimeMs = fs.statSync(path).birthtimeMs;

        let newContentItem;
        try {
          newContentItem = new ContentItem({
            path,
            name,
            type,
            birthtimeMs,
            uploaderName,
            rating: 0
          });
        } catch (e) {
          console.log(e);
        }

        await newContentItem.save();
      });

      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("server error");
    console.log(e);
  }
});

module.exports = router;
