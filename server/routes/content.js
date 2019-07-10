const express = require("express");
const fs = require("fs");
const router = express.Router();
const contentURL = `${__dirname}/../contentStorage`;
const path = require("path");
const jwt = require("jsonwebtoken");

router.get("/all", (req, res) => {
  const content = fs
    .readdirSync(`${contentURL}`)
    .filter(file => file !== ".DS_Store");
  const data = content.map(dir => {
    return {
      type: dir,
      content: fs
        .readdirSync(`${contentURL}/${dir}/`)
        .filter(file => file !== ".DS_Store")
        .sort(
          (file1, file2) =>
            fs.statSync(`${contentURL}/${dir}/${file2}`).birthtimeMs -
            fs.statSync(`${contentURL}/${dir}/${file1}`).birthtimeMs
        )
        .slice(0, 9)
    };
  });
  res.send(JSON.stringify(data));
});

router.get("/picture/:id", async (req, res) => {
  try {
    if (await jwt.verify(req.body.token, "PrivateKey")) {
      res.sendFile(
        `${path.resolve(`${contentURL}/pictures/${req.params.id}`)}`
      ); // resolve -> fixes? ../
    } else {
      res.status(400).send("invalid token");
    }
  } catch (e) {
    res.status(500).send("Server error");
    console.log(e);
  }
});

router.get("/text/:id", (req, res) => {
  res.sendFile(`${path.resolve(`${contentURL}/texts/${req.params.id}`)}`);
});

router.get(`/video/:id`, (req, res) => {
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
});

router.get(`/audio/:id`, (req, res) => {
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
});

router.post("/upload", (req, res) => {
  const files = Object.values(req.files);

  files.forEach(file => {
    let extension = file.name
      .split("")
      .splice(file.name.lastIndexOf("."))
      .join("");
    switch (extension) {
      case ".mp4":
        file.mv(`${contentURL}/videos/${file.name}`).catch(err => {
          console.log(err);
          res.send();
        });
        break;
      case ".mp3":
        file.mv(`${contentURL}/audios/${file.name}`).catch(err => {
          console.log(err);
          res.send();
        });
        break;
      case ".png":
      case ".jpg":
      case ".gif":
      case ".svg":
        file.mv(`${contentURL}/pictures/${file.name}`).catch(err => {
          console.log(err);
          res.send();
        });
        break;
      case ".txt":
      case ".doc":
      case ".pdf":
      case ".docx":
        file.mv(`${contentURL}/texts/${file.name}`).catch(err => {
          console.log(err);
          res.send();
        });
        break;
    }
  });

  res.send();
});

module.exports = router;
