import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });
  
      const { token, user } = response.data; // Assume backend returns token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data
  
      navigate("/user-details"); // Redirect to user details page
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
