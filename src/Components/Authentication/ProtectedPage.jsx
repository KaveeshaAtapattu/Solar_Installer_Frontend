import { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";

function ProtectedPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/protected");
        setMessage(response.data);
      } catch (error) {
        setMessage("Unauthorized");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Protected Page</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ProtectedPage;
