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
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/auth/get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            throw new Error("User data not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome to the Home Page</h1>
        {user ? (
          <div className="bg-white p-6 border rounded shadow-md">
            <h2 className="text-2xl mb-4">User Information</h2>
            <p className="mb-2">
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add any additional user information here */}
          </div>
        ) : (
          <p>No user information available</p>
        )}
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
