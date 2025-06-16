import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UserRegister {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  owner_id?: number;
}

export const auth = {
  register: async (data: UserRegister) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  login: async (data: UserLogin) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
};

export const contacts = {
  getAll: async () => {
    const response = await api.get<Contact[]>("/contacts");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
  create: async (data: Contact) => {
    const response = await api.post<Contact>("/contacts", data);
    return response.data;
  },
  update: async (id: number, data: Contact) => {
    const response = await api.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default api;
