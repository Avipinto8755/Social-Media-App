import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const loginRegisterClick = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PintoSocial</h3>
          <span className="loginDesc">Easy to connect with friends</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              type="text"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              type="password"
              ref={password}
              minLength="6"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              required
              ref={passwordAgain}
              className="loginInput"
            />

            <button className="loginButton" type="submit">
              Sing Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={loginRegisterClick}
            >
              Log Into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
