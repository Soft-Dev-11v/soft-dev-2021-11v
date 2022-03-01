const express = require("express");
const app = express();
const drive = require("./drive");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "image.jpg");

app.use(express.json());

app.put("/image/:imageId", async (req, res) => {
  // Andreika
  try {
    const imageId = req.params.imageId;
    await drive.files.update({
      fileId: "", // TUKA PISHI
      requestBody: {
        name: "image.jpg",
      },
      media: {
        body: "", // TUKA PISHI
      },
    });
    res.send(imageId);
  } catch (err) {
    res.status(500).send({ [err.name]: err.message });
  }
});

app.post("/image", async (req, res) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "image.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.send({ [err.name]: err.message });
  }
});

app.delete("/image/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    const response = await drive.files.delete({ fileId: imageId });
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ [error.name]: error.message });
  }
});

const port = process.env.PORT || 8005;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
