import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";

const theme = createTheme({
  palette: {
    primary: { main: "#1E824C" },
    secondary: { main: "#2ECC71" },
    text: { primary: "#555555" },
    background: { default: "#FFFFFF", paper: "#F2F4F4" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
