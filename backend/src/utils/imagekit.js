const imagekit = require("../config/imagekit");

const uploadImage = async (file) => {
  console.log("uploadImage() called");

  const response = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/organic-farm/products",
  });

  const url = `${process.env.IMAGEKIT_URL_ENDPOINT}/tr:w-1200,q-80${response.filePath}`;

  console.log("Returning:", url);

  return url;
};

module.exports = {
  uploadImage,
};