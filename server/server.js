const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const app = express();
const { port, mongodb } = require("./config");
const content = require("./routes/content");
const users = require("./routes/users");

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/content", content);
app.use("/api/users", users);

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
