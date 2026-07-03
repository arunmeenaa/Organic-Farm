const imagekit = require("../config/imagekit");

const uploadImage = async (file) => {
  const response = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/organic-farm/products",
  });

  return response.url;
};

module.exports = {
  uploadImage,
};