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
      navigate("/");
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
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1731170993322-11cfe3b57cd2?q=80&w=1534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 bg-black text-white w-full max-w-md p-10 rounded-3xl shadow-2xl transform transition duration-300 hover:-translate-y-2">
        <button
          onClick={() => navigate("/select-role")}
          className="absolute top-5 left-5 text-sm font-semibold hover:-translate-x-1 transition-transform"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-2 tracking-wide">
          {isLogin ? "Login" : "Register"}
        </h1>

        <p className="text-center text-gray-400 mb-8">
          as <span className="font-semibold">{selectedRole || "..."}</span>
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-xl border-2 font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-white text-black border-white"
                : "border-white hover:bg-white hover:text-black"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-xl border-2 font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-white text-black border-white"
                : "border-white hover:bg-white hover:text-black"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-wide transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white hover:scale-105"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {responseMsg && (
          <p
            className={`mt-6 text-center font-medium ${
              responseMsg.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {responseMsg.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;