
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  clearResponseMsg,
  refreshToken,
} from "../slices/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedRole = useSelector((state) => state.auth.selectedRole);
  const responseMsg = useSelector((state) => state.auth.responseMsg);
  const user = useSelector((state) => state.auth.user);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (user || storedUser) {
      navigate("/home");
    }
  }, [user, navigate]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 58 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  
  useEffect(() => {
    if (responseMsg) {
      const timer = setTimeout(() => {
        dispatch(clearResponseMsg());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMsg, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) return alert("Please select a role first.");

    if (isLogin) {
      dispatch(loginUser({ email, password, role: selectedRole }));
    } else {
      dispatch(registerUser({ email, password, role: selectedRole }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="back-button" onClick={() => navigate("/select-role")}>
          ← Back
        </button>

        <h1 className="auth-title">{isLogin ? "Login" : "Register"}</h1>
        <p className="auth-role">
          as <strong>{selectedRole || "..."}</strong>
        </p>

        <div className="auth-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        {responseMsg && (
          <p className={`response-msg ${responseMsg.type}`}>
            {responseMsg.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth