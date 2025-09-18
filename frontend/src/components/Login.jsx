import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../services/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending login request...");
      const data = await loginUser(email, password); // call API service
      localStorage.setItem("token", data.token); // save JWT token
      toast.success(data.message);
      // setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-green-300 to-green-500">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-primaryGreen">
          Loans Program
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <EmailIcon className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 relative">
            <LockIcon className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none pr-8"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
