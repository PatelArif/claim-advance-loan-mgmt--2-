import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login
export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true } 
  );
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

// Protected Dashboard
export const fetchDashboard = async (token) => {
  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};
