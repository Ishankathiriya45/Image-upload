const isEmpty = (value) => {
  if (value === undefined || value === null) return true;

  if (typeof value === "string") {
    return ["", "null", "undefine", "0", "NaN"].includes(value.trim());
  }

  if (Array.isArray(value) || typeof value === "object") {
    return Object.keys(value).length === 0;
  }
};

module.exports = {
  isEmpty,
  generateFileName: (name) => {
    const fileParts = name.split(".").pop();
    return `${Date.now()}.${fileParts}`;
  },

  getFileUrl: (folderName, fileName) => {
    return `${process.env.FILE_URL}/public/uploads/${folderName}/${fileName}`;
    // return `https://${bucketName}.s3.${region}.amazonaws.com/${RUN_MODE.toLowerCase()}/${folderName}/${fileName}`;
  },
};
