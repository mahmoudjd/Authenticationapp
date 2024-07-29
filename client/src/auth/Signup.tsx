import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import ButtonElement from "../components/ButtonElement";

function Signup() {
  const [firstName, setFname] = useState<string>("");
  const [lastName, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Invalid input vlaue");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (data && data.token) {
        setError("");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-100 border rounded bg-white px-8 py-12">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl mb-7">Signup</h3>

          <InputElement
            placeholder="First Name: "
            value={firstName}
            setValue={setFname}
            type="text"
          />

          <InputElement
            placeholder="Last Name: "
            value={lastName}
            setValue={setLname}
            type="text"
          />

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

          <ButtonElement title="Signup" />
        </form>
        <p className="text-sm text-center mt-5">
          you have an Account,{" "}
          <Link to={"/"} className="font-medium text-blue-600 underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
