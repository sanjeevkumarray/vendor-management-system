import React, { useState } from "react";
import "./CSS/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handelesubmit = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://65a396d3a54d8e805ed3bf5a.mockapi.io/admin",
        {
          email: email,
          password: password,
        },
        { headers }
      )
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100  loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2>Login Pages</h2>

          <form>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="off"
                placeholder="abc@gmail.com"
                className="form-control rounded-0"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                autoComplete="off"
                placeholder="password"
                className="form-control rounded-0"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="checkbox"
                name="tick"
                id="tickmark"
                className="me-2"
              />
              <label htmlFor="checkbox"> Agree with terms & condition</label>
            </div>
            <div className="mb-3">
              <button
                className=" btn btn-success w-100 rounded-0 md-2"
                onClick={handelesubmit}
              >
                Log in
              </button>
            </div>
            <div className=" googleauth  justify-content-center ">
              <strong>OR</strong>
            </div>

            <div className=" googleauth  justify-content-center ">
              <GoogleAuth />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
