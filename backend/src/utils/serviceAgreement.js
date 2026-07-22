const ServiceOrder = require("../models/serviceOrder.model");
const User = require("../models/user.model");

async function finalizeAgreement(request, response, finalPrice) {
  response.status = "accepted";
  response.finalPrice = finalPrice;
  response.acceptedAt = new Date();
  response.contactUnlocked = true;

  request.responses.forEach((quote) => {
    if (!quote._id.equals(response._id)) {
      quote.status = "rejected";
    }
  });

  request.acceptedSeller = response.seller;
  request.status = "accepted";

  await request.save();

  const existingOrder = await ServiceOrder.findOne({
    request: request._id,
  });

  if (!existingOrder) {
    const buyer = await User.findById(request.buyer);
    const seller = await User.findById(response.seller);

    await ServiceOrder.create({
      request: request._id,

      buyer: request.buyer,
      seller: response.seller,

      quotationId: response._id,

      // Snapshot of request
      title: request.title,
      category: request.category,

      location: {
        village: request.location?.village,
        district: request.location?.district,
        state: request.location?.state,
        pincode: request.location?.pincode,
      },

      landArea: request.landArea,
      unit: request.unit,

      finalPrice,

      pricingType: response.pricingType,
      estimatedStartDate: response.estimatedStartDate,

      buyerPhone: buyer?.phone || "",
      sellerPhone: seller?.phone || "",
    });
  }

  return request;
}

module.exports = {
  finalizeAgreement,
};