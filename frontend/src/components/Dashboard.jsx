import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Sidebar from "../components/sidebar.jsx";
import { fetchDashboard, logoutUser } from "../services/userService.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchDashboard(token)
      .then((res) => setData(res))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-softGray">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-primaryGreen">
            {data ? `Welcome Back ` : "Loading..."}
          </Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        {data && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold text-textGray">Users</h2>
              <p className="text-2xl font-bold text-primaryGreen">
                {data.stats.users}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold text-textGray">Revenue</h2>
              <p className="text-2xl font-bold text-primaryGreen">
                {data.stats.revenue}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold text-textGray">Reports</h2>
              <p className="text-2xl font-bold text-primaryGreen">
                {data.stats.reports}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
