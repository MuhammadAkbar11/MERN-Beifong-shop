import path from "path";
import multer from "multer";
import { UPLOAD_DIR } from "../../configs/constants.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
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

function UploadRoutes(app, prefix) {
  app.post(prefix + "/", upload.single("image"), (req, res) => {
    let filePath = req.file.path;
    filePath = filePath.replace(/.dev\//g, "/");
    res.send(`${filePath}`);
  });
}

export default UploadRoutes;
