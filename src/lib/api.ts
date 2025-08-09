import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const getCompanies = async () => {
  const res = await axios.get(`${API_URL}/companies`);
  return res.data;
};

export const getCompany = async (id: string) => {
  const res = await axios.get(`${API_URL}/companies/${id}`);
  return res.data;
};

export const createCompany = async (
  data: Record<string, unknown>,
  token: string
) => {
  const res = await axios.post(`${API_URL}/companies`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCompany = async (
  id: string,
  data: Record<string, unknown>,
  token: string
) => {
  const res = await axios.put(`${API_URL}/companies/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteCompany = async (id: string, token: string) => {
  const res = await axios.delete(`${API_URL}/companies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getIPOs = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API_URL}/ipos?page=${page}&limit=${limit}`);
  return res.data;
};

export const searchIPOs = async (q: string) => {
  const res = await axios.get(`${API_URL}/ipos/search?q=${q}`);
  return res.data;
};

export const getIPO = async (id: string) => {
  const res = await axios.get(`${API_URL}/ipos/${id}`);
  return res.data;
};

export const createIPO = async (
  data: Record<string, unknown>,
  token: string
) => {
  const res = await axios.post(`${API_URL}/ipos`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateIPO = async (
  id: string,
  data: Record<string, unknown>,
  token: string
) => {
  const res = await axios.put(`${API_URL}/ipos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteIPO = async (id: string, token: string) => {
  const res = await axios.delete(`${API_URL}/ipos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const uploadDocument = async (
  ipoId: string,
  file: File,
  token: string
) => {
  const formData = new FormData();
  formData.append("pdf", file);
  const res = await axios.post(`${API_URL}/ipos/${ipoId}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const downloadDocument = async (ipoId: string) => {
  const res = await axios.get(`${API_URL}/ipos/${ipoId}/download`, {
    responseType: "blob",
  });
  return res.data;
};

export const deleteDocument = async (ipoId: string, token: string) => {
  const res = await axios.delete(`${API_URL}/ipos/${ipoId}/delete-doc`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAdminStats = async (token: string) => {
  const res = await axios.get(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAdminLogs = async (token: string) => {
  const res = await axios.get(`${API_URL}/admin/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
