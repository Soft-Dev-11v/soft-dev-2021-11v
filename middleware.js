const fs = require("fs");
const formidable = require("formidable");
const { Readable } = require("stream");

const readImage = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, { image }) => {
      try {
        var oldPath = image.filepath;
        const rawData = fs.readFileSync(oldPath);

        const buffer = new Buffer.from(rawData, "base64");
        const readable = new Readable();
        readable._read = () => {}; // _read is required but you can noop it
        readable.push(buffer);
        readable.push(null);

        req.image = { ...image, readable };
        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readImage,
};
