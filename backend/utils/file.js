import fs from "fs";
import path from "path";

export const __dirname = path.resolve();

export const deleteFile = filePath => {
  const file = path.join(__dirname, filePath);

  if (fs.existsSync(file)) {
    return fs.unlink(file, err => {
      if (err) {
        console.log(error);
        throw new Error(err);
      }
    });
  }
};

export const checkIsGuestFoto = file => {
  const defaultFoto = [
    "sample-guest.jpg",
    "sample-guest.png",
    "sample-guest.jpeg",
  ];
  const fileToArr = file.split("/");
  const fileName = fileToArr[fileToArr.length - 1];
  return defaultFoto.some(f => f === fileName);
};
