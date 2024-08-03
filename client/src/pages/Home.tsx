import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async (token: string) => {
    try {
      const res = await fetch(`http://localhost:3000/auth/get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">Error: {errorMsg}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 ">
      <div className="text-center max-w-2xl w-full bg-blue-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Welcome to the Home Page
        </h1>
        {user ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border-t-4 border-blue-500">
            <h2 className="text-2xl mb-4 text-gray-700 font-semibold">
              User Information
            </h2>
            <div className="flex justify-evenly items-center gap-4">
              <div className="h-20 w-20 bg-blue-200 flex items-center justify-center rounded-full text-2xl font-bold text-blue-700">
                {user.firstName[0].toUpperCase() +
                  user.lastName[0].toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-lg text-gray-800 mb-1">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No user information available</p>
        )}
        <button
          onClick={logout}
          className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
