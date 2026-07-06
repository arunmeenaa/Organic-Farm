import api from "../api/axios";

export const getMachines = () => {
  return api.get("/machines");
};

export const getMachineById = (id) => {
  return api.get(`/machines/${id}`);
};

export const getMyMachines = () => {
  return api.get("/machines/my");
};

export const createMachine = (formData) => {
  return api.post("/machines", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMachine = (id, formData) => {
  return api.put(`/machines/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMachine = (id) => {
  return api.delete(`/machines/${id}`);
};