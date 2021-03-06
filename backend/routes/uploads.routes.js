import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let filename = req.body.filename;

    if (!filename) {
      filename = file.fieldname;
    }
    cb(null, `${filename}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  // const oldImagePath = req.body.oldImage
  // if(oldImagePath !== "/uploads/images/sample-box.jpg") {
  //   fs.unlink(path.join(__dirname, ), err => {
  //     if (err) {
  //       throw new Error(err);
  //     }
  //   });
  // }

  res.send(`/${req.file.path}`);
});

export default router;
