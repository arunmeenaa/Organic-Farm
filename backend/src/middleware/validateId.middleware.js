const mongoose = require("mongoose");

function validateObjectId(resourceName) {
  return (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${resourceName} ID`,
      });
    }

    next();
  };
}

module.exports = validateObjectId;