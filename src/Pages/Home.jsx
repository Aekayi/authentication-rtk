import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../app/features/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Can't Login</h1>;

  return (
    <div className="container">
      <h1>Welcome, {user?.name || "Guest"}!</h1>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
