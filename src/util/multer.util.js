const fs = require("fs");
const multer = require("multer");
const path = require("path");

const templateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const createImage = (filename, buffer) => {
  const filePath = path.join(
    __dirname,
    `../../public/uploads/multer/${filename}`
  );
  const writeFile = fs.createWriteStream(filePath);
  writeFile.write(buffer);
};

const fileSizeKb = (fileSize) => {
  let maxSize = fileSize / 1024;
  if (maxSize > 100) {
    throw new Error("File size too large");
  }
};

const templateUpload = multer({ storage: templateStorage });

module.exports = {
  templateUpload,
  createImage,
  fileSizeKb,
  fileUpload: () => {
    const allowedExtensions = [
      "png",
      "jpg",
      "jpeg",
      "svg",
      "pdf",
      "jfif",
      "docx",
      "glb",
    ];

    const fileFilter = (req, file, cb) => {
      const extension = path
        .extname(file.originalname)
        .toLowerCase()
        .substring(1);

      if (!allowedExtensions.includes(extension)) {
        const error = new Error(
          `Invalid file type: "${extension}". Allowed types: ${allowedExtensions.join(
            ", "
          )}`
        );
        error.code = "INVALID_FILE_TYPE";
        return cb(error, false);
      }

      cb(null, true);
    };

    return multer({ fileFilter });
  },
};
