import api from "../api/axios";

export const createBooking = (data) =>
  api.post("/machine-bookings", data);

export const getBuyerBookings = () =>
  api.get("/machine-bookings/my");

export const getsellerBookings = () =>
  api.get("/machine-bookings/seller");

export const getBooking = (id) =>
  api.get(`/machine-bookings/${id}`);

export const acceptBooking = (id) =>
  api.patch(`/machine-bookings/${id}/accept`);

export const rejectBooking = (id) =>
  api.patch(`/machine-bookings/${id}/reject`);

export const cancelBooking = (id) =>
  api.patch(`/machine-bookings/${id}/cancel`);

export const completeBooking = (id) =>
  api.patch(`/machine-bookings/${id}/complete`);