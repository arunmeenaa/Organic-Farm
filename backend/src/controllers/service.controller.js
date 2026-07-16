const Service = require("../models/service.model");
const { uploadImage } = require("../utils/imagekit");

const createService = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      pricingType,
      price,
      machineIncluded,
      operatorIncluded,
      village,
      district,
      state,
      pincode,
      machine,
    } = req.body;
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !village ||
      !district ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "All required fields are required.",
      });
    }

    let images = [];

    if (req.files?.length) {
      for (const file of req.files) {
        images.push(await uploadImage(file));
      }
    }

    const service = await Service.create({
      title,
      category,
      description,
      images,
      provider: req.user._id,
      machine: machine || null,
      pricingType,
      price,
      machineIncluded,
      operatorIncluded,
      location: {
        village,
        district,
        state,
        pincode,
      },
    });

    res.status(201).json({
      success: true,
      service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({
      availability: true,
    })
      .populate("provider", "name profileImage location")
      .populate("machine", "name category");

    res.json({
      success: true,
      services,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({
      provider: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      services,
    });
  } catch (err) {
    console.error("getMyServices Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("provider")
      .populate("machine");

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    if (req.body.village) {
      service.location = {
        village: req.body.village,
        district: req.body.district,
        state: req.body.state,
        pincode: req.body.pincode,
      };
    }
    Object.assign(service, req.body);

    if (req.files?.length) {
      const images = [];
      if (req.body.village) {
        service.location = {
          village: req.body.village,
          district: req.body.district,
          state: req.body.state,
          pincode: req.body.pincode,
        };
      }
      for (const file of req.files) {
        images.push(await uploadImage(file));
      }

      service.images = images;
    }

    await service.save();

    res.json({
      success: true,
      service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
};
