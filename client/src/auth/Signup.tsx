import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import ButtonElement from "../components/ButtonElement";
import { useAuth } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (data.token) {
        setError(null);
        login(data.token);
        navigate("/home");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-full max-w-md border rounded bg-white px-8 py-12 shadow-md">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl mb-7 text-center">Signup</h3>

          <InputElement
            placeholder="First Name"
            value={firstName}
            setValue={setFirstName}
            type="text"
          />

          <InputElement
            placeholder="Last Name"
            value={lastName}
            setValue={setLastName}
            type="text"
          />

          <InputElement
            placeholder="Email"
            value={email}
            setValue={setEmail}
            type="email"
          />

          <InputElement
            placeholder="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <ButtonElement title="Signup" />
        </form>
        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
