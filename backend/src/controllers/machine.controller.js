const Machine = require("../models/machine.model");
const { uploadImage } = require("../utils/imagekit");

exports.createMachine = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const url = await uploadImage(file);
      imageUrls.push(url);
    }

    const specifications = JSON.parse(req.body.specifications);
    const location = JSON.parse(req.body.location);

    const machine = await Machine.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,

      rentalType: req.body.rentalType,
      pricingType: req.body.pricingType,

      price: Number(req.body.price),
      quantity: Number(req.body.quantity),

      specifications,
      location,

      images: imageUrls,

      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Machine added successfully",
      machine,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add machine",
      error: err.message,
    });
  }
};

exports.getAllMachines = async (req, res) => {
  try {
    const { category, rentalType, pricingType, state, district, search } =
      req.query;

    const filter = {
      availabilityStatus: "available",
    };

    if (category) {
      filter.category = category;
    }

    if (rentalType) {
      filter.rentalType = rentalType;
    }

    if (pricingType) {
      filter.pricingType = pricingType;
    }

    if (state) {
      filter["location.state"] = state;
    }

    if (district) {
      filter["location.district"] = district;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const machines = await Machine.find(filter)
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 })
      .lean();
console.log(machines[0].owner);
console.log(machines.length);
    return res.status(200).json({
      success: true,
      count: machines.length,
      machines,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch machines",
      error: err.message,
    });
  }
};

exports.getMyMachines = async (req, res) => {
  try {
    const machines = await Machine.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    }).lean()

    return res.status(200).json({
      success: true,
      count: machines.length,
      machines,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your machines",
      error: err.message,
    });
  }
};

exports.getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id).populate(
      "owner",
      "name email phone",
    );

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    return res.status(200).json({
      success: true,
      machine,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch machine",
      error: err.message,
    });
  }
};

exports.updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    if (machine.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const specifications =
      typeof req.body.specifications === "string"
        ? JSON.parse(req.body.specifications)
        : req.body.specifications;

    const location =
      typeof req.body.location === "string"
        ? JSON.parse(req.body.location)
        : req.body.location;

    let images = [];

    if (req.body.existingImages) {
      images =
        typeof req.body.existingImages === "string"
          ? JSON.parse(req.body.existingImages)
          : req.body.existingImages;
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadImage(file);
        images.push(url);
      }
    }

    machine.name = req.body.name;
    machine.category = req.body.category;
    machine.description = req.body.description;

    machine.price = Number(req.body.price);
    machine.quantity = Number(req.body.quantity);

    machine.rentalType = req.body.rentalType;
    machine.pricingType = req.body.pricingType;
    machine.availabilityStatus = req.body.availabilityStatus;

    machine.specifications = specifications;
    machine.location = location;
    machine.images = images;

    await machine.save();

    return res.status(200).json({
      success: true,
      message: "Machine updated successfully",
      machine,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update machine",
      error: err.message,
    });
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    if (machine.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await machine.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Machine deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete machine",
      error: err.message,
    });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { availabilityStatus } = req.body;

    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    if (machine.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    machine.availabilityStatus = availabilityStatus;

    await machine.save();

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      machine,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error: err.message,
    });
  }
};
