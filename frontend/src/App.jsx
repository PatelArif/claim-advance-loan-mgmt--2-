import { useState, useEffect } from "react";
import LoginForm from "./components/Login.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!user ? <LoginForm onLogin={setUser} /> : <Dashboard />}
    </div>
  );
}

export default App;
