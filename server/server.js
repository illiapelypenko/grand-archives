const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/content", (req, res) => {
  const newestVideos = fs
    .readdirSync("./contentStorage/videos/")
    .filter(file => file !== ".DS_Store")
    .sort(
      (file1, file2) =>
        fs.statSync(`./contentStorage/videos/${file2}`).birthtimeMs -
        fs.statSync(`./contentStorage/videos/${file1}`).birthtimeMs
    ); // sorted names by creation date

  const content = newestVideos.map(vid => ({
    type: "video",
    name: vid
  }));

  res.send(JSON.stringify(content));
});

app.get(`/video/:id`, (req, res) => {
  const path = `./contentStorage/videos/${req.params.id}`;
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