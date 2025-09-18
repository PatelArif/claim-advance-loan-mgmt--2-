import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  await authService.login(email, password, res);
};

export const logout = async (req, res) => {
  await authService.logout(res);
};
