import React from "react";
import { useContext } from "react";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route path="profile">
          <Route path=":username" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
