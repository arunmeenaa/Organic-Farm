const express = require("express");
const {
  sendCounterOffer,
  acceptCounterOffer,
  rejectCounterOffer,
  acceptQuotation,
  rejectQuotation,
} = require("../controllers/counterOffer.controller");


const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post(
  "/:requestId/responses/:responseId/counter",
  auth,
  sendCounterOffer,
);

router.post(
  "/:requestId/responses/:responseId/accept-counter",
  auth,
  acceptCounterOffer,
);

router.post(
  "/:requestId/responses/:responseId/reject-counter",
  auth,
  rejectCounterOffer
);
router.post(
  "/:requestId/responses/:responseId/accept",
  auth,
  acceptQuotation
);

router.post(
  "/:requestId/responses/:responseId/reject",
  auth,
  rejectQuotation
);
module.exports = router;