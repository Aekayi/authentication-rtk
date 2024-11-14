import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../app/features/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password })).then((result) => {
      if (result.payload) {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    });
  };

  const isDisabled = !name || !email || !password || loading;
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h4>Register Form</h4>
      <form className="border p-5 rounded-3" onSubmit={handleSignup}>
        <div class="mb-3">
          <label for="name" class="form-label">
            UserName
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={isDisabled}
        >
          {loading ? (
            <>
              <i className="fa fa-spinner fa-spin me-3"></i>Loading...
            </>
          ) : (
            "Register"
          )}
        </button>
        {error && (
          <p className="alert alert-danger" role="alert">
            {error}
          </p>
        )}
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Register;
