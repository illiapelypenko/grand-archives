const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 5000;
// const contentURL = `${__dirname}/contentStorage`;
const content = require("./routes/content");

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/content", content);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// app.get("/videos", (req, res) => {
//   const videos = fs
//     .readdirSync(`${contentURL}/videos/`)
//     .filter(file => file !== ".DS_Store")
//     .sort(
//       (file1, file2) =>
//         fs.statSync(`${contentURL}/videos/${file2}`).birthtimeMs -
//         fs.statSync(`${contentURL}/videos/${file1}`).birthtimeMs
//     );

//   res.send(JSON.stringify(videos));
// });

// app.get("/audios", (req, res) => {
//   const audios = fs
//     .readdirSync(`${contentURL}/audios/`)
//     .filter(file => file !== ".DS_Store")
//     .sort(
//       (file1, file2) =>
//         fs.statSync(`${contentURL}/audios/${file2}`).birthtimeMs -
//         fs.statSync(`${contentURL}/audios/${file1}`).birthtimeMs
//     );

//   res.send(JSON.stringify(audios));
// });

// app.get("/pictures", (req, res) => {
//   const pictures = fs
//     .readdirSync(`${contentURL}/pictures/`)
//     .filter(file => file !== ".DS_Store")
//     .sort(
//       (file1, file2) =>
//         fs.statSync(`${contentURL}/pictures/${file2}`).birthtimeMs -
//         fs.statSync(`${contentURL}/pictures/${file1}`).birthtimeMs
//     );

//   res.send(JSON.stringify(pictures));
// });

// app.get("/texts", (req, res) => {
//   const texts = fs
//     .readdirSync(`${contentURL}/texts/`)
//     .filter(file => file !== ".DS_Store")
//     .sort(
//       (file1, file2) =>
//         fs.statSync(`${contentURL}/texts/${file2}`).birthtimeMs -
//         fs.statSync(`${contentURL}/texts/${file1}`).birthtimeMs
//     );

//   res.send(JSON.stringify(texts));
// });
