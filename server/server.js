const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 5000;
const contentURL = "./server/contentStorage";

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/content", (req, res) => {
  let content = [];

  content = content
    .concat(fs.readdirSync(`${contentURL}/videos/`))
    .map(video => ({
      type: "video",
      name: video
    }))
    .filter(file => file.name !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`${contentURL}/videos/${file2.name}`).birthtimeMs -
        fs.statSync(`${contentURL}/videos/${file1.name}`).birthtimeMs
    );
  content = content.filter(file => file.name !== ".DS_Store");

  res.send(JSON.stringify(content));
});

app.get("/videos", (req, res) => {
  const videos = fs
    .readdirSync(`${contentURL}/videos/`)
    .filter(file => file !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`${contentURL}/videos/${file2}`).birthtimeMs -
        fs.statSync(`${contentURL}/videos/${file1}`).birthtimeMs
    );

  res.send(JSON.stringify(videos));
});

app.get(`/video/:id`, (req, res) => {
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

app.post("/upload", (req, res) => {
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
