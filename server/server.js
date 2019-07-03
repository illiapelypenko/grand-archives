const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 5000;
const contentURL = `${__dirname}/contentStorage`;

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
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

app.get("/audios", (req, res) => {
  const audios = fs
    .readdirSync(`${contentURL}/audios/`)
    .filter(file => file !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`${contentURL}/audios/${file2}`).birthtimeMs -
        fs.statSync(`${contentURL}/audios/${file1}`).birthtimeMs
    );

  res.send(JSON.stringify(audios));
});

app.get("/pictures", (req, res) => {
  const pictures = fs
    .readdirSync(`${contentURL}/pictures/`)
    .filter(file => file !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`${contentURL}/pictures/${file2}`).birthtimeMs -
        fs.statSync(`${contentURL}/pictures/${file1}`).birthtimeMs
    );

  res.send(JSON.stringify(pictures));
});

app.get("/texts", (req, res) => {
  const texts = fs
    .readdirSync(`${contentURL}/texts/`)
    .filter(file => file !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`${contentURL}/texts/${file2}`).birthtimeMs -
        fs.statSync(`${contentURL}/texts/${file1}`).birthtimeMs
    );

  res.send(JSON.stringify(texts));
});

app.get("/picture/:id", (req, res) => {
  res.sendFile(`${__dirname}/contentStorage/pictures/${req.params.id}`);
});

app.get("/text/:id", (req, res) => {
  res.sendFile(`${__dirname}/contentStorage/texts/${req.params.id}`);
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

app.get(`/audio/:id`, (req, res) => {
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
