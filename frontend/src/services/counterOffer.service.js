import api from "../api/axios";

export const sendCounterOffer = (requestId, responseId, payload) => {
  return api.post(
    `/counter-offers/${requestId}/responses/${responseId}/counter`,
    payload
  );
};

export const acceptCounterOffer = (requestId, responseId) => {
  return api.post(
    `/counter-offers/${requestId}/responses/${responseId}/accept-counter`
  );
};

export const rejectCounterOffer = (requestId, responseId) => {
  return api.post(
    `/counter-offers/${requestId}/responses/${responseId}/reject-counter`
  );
};

export const acceptQuotation = (requestId, responseId) => {
  return api.post(
    `/counter-offers/${requestId}/responses/${responseId}/accept`
  );
};