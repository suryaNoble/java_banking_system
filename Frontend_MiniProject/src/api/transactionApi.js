import api from "./AxiosInstance";

export const getTransactions = async (accountNo) => {
  const res = await api.get(`/transaction/account/${accountNo}`);
  return res.data;
};

export const deposit = async (data) => {
  const res = await api.post(`/transaction/deposit`, data);
  return res.data;
};

export const withdraw = async (data) => {
  const res = await api.post(`/transaction/withdraw`, data);
  return res.data;
};

export const transfer = async (data) => {
  const res = await api.post(`/transaction/transfer`, data);
  return res.data;
};
