import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userCredentials = { email, password };
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };
  const isDisabled = !email || !password || loading;
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h4>Login Form</h4>
      <form className="border p-5 rounded-3" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3 me-3"
          disabled={isDisabled}
        >
          {loading ? (
            <>
              <i className="fa fa-spinner fa-spin me-3"></i>Loading...
            </>
          ) : (
            "Login"
          )}
        </button>
        {error && (
          <p className="alert alert-danger" role="alert">
            {error}
          </p>
        )}
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
