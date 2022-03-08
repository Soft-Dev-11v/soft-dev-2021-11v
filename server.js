const express = require("express");
const app = express();
const drive = require("./drive");
const { readImage } = require("./middleware");

app.use(express.json());

app.put("/image/:imageId", readImage, async (req, res, next) => {
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
    next(err);
  }
});

app.post("/image", readImage, async (req, res, next) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: req.image.originalFilename,
        mimeType: req.image.mimetype,
      },
      media: {
        mimeType: req.image.mimetype,
        body: req.image.readable,
      },
    });

    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

app.delete("/image/:imageId", async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const response = await drive.files.delete({ fileId: imageId });
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

app.use((err, _, res, __) => {
  res.status(err.name ? 400 : err.status || 500).send({
    success: false,
    errors: err.name ? { [err.name]: err.message } : { ...err, status: undefined },
  });
});

const port = process.env.PORT || 8005;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
