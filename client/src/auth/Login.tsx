import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import ButtonElement from "../components/ButtonElement";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite
    if (!password || !email) {
      setError("invalid email or password");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data && data.token) {
        setError("");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-100 border rounded bg-white px-8 py-12">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl mb-7">Login</h3>
          <InputElement
            placeholder="Email: "
            value={email}
            setValue={setEmail}
            type="email"
          />

          <InputElement
            placeholder="Password: "
            value={password}
            setValue={setPassword}
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <ButtonElement title="Login" />
        </form>
        <p className="text-sm text-center mt-5">
          you do not have an Account,{" "}
          <Link to={"/signup"} className="font-medium text-blue-600 underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
