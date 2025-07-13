const fs = require("fs");
const path = require("path");

const {
  CommonUtil: { generateFileName, isEmpty, getFileUrl },
} = require("../util");

class FileService {
  uploadFile = async (
    file,
    folderName,
    storageType,
    cloudStorageType = "s3"
  ) => {
    try {
      if (storageType == "disk") {
        if (isEmpty(file)) {
          throw new Error("No file provided");
        }

        const uploadDir = path.join(
          __dirname,
          "../../public/uploads",
          folderName
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = generateFileName(file.originalname);
        const filePath = path.join(uploadDir, fileName);

        await fs.promises.writeFile(filePath, file.buffer);

        return { fileName, location: getFileUrl(folderName, fileName) };
      } else if (storageType == "cloud") {
        if (cloudStorageType == "s3") {
          const fileBuffer = file.buffer;
          const fileName = generateFileName(file.originalname);
          const Key = `${RUN_MODE.toLowerCase()}/${folderName}/${fileName}`;

          const params = {
            Bucket: bucketName,
            Key: Key,
            Body: fileBuffer,
            ContentType: file.mimetype,
          };

          const s3 = getS3Configuration();

          const data = await s3.upload(params).promise();
          return { fileName, location: data.Location };
        } else if (cloudStorageType == "cloudinary") {
          // upload file code
        }
      }
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  };

  unlinkFile = async (
    file,
    folderName,
    storageType,
    cloudStorageType = "s3"
  ) => {
    try {
      if (storageType == "disk") {
        let res = 1;
        if (isEmpty(file)) {
          throw new Error("No file provided");
        }

        const fileDir = path.join(
          __dirname,
          "../../public/uploads",
          folderName
        );

        const filePath = path.join(fileDir, file);
        const exists = fs.existsSync(filePath);

        if (exists) {
          fs.unlinkSync(filePath);
          return { success: true, message: "File deleted successfully" };
        } else {
          return { success: false, message: "File does not exist" };
        }
      } else if (storageType == "cloud") {
        if (cloudStorageType == "s3") {
          const unlinkFileData = `${RUN_MODE.toLowerCase()}/${folderName}/${file}`;
          const params = {
            Bucket: bucketName,
            Key: unlinkFileData,
          };

          const s3 = getS3Configuration();
          const data = await s3.deleteObject(params).promise();
          console.log(data);
          return data;
        } else if (cloudStorageType == "cloudinary") {
          // upload file code
        }
      }
    } catch (error) {
      throw new Error(`File delete failed: ${error.message}`);
    }
  };
}

module.exports = FileService;
