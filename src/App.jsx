import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchUserProfile } from "./app/features/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // if (storedUser) {
    //   dispatch(setUser(storedUser));
    dispatch(fetchUserProfile());
    // }
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
