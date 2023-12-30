const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const uploadImage = require("./s3");

const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.post("/api/image", upload.array("images"), async (req, res) => {
  const files = req.files;
  const locations = [];

  for (const file of files) {
    let location = uploadImage(file);
    locations.push(location);
  }
  res
    .status(200)
    .json({ message: "Images uploaded successfully", locations: locations });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
