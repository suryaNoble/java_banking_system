import api from "./AxiosInstance";

export const getAccount = async (accountNumber) => {
  const res = await api.get(`/accounts/${accountNumber}`);
  return res.data;
};

export const checkBalance = async (accountNumber, pin) => {
  const res = await api.get(`/accounts/${accountNumber}/pin/${pin}`);
  return res.data;
};

export const updatePin = async (accountNumber, pin) => {
  const res = await api.put(`/accounts/${accountNumber}/pin/${pin}`);
  return res.data;
};
