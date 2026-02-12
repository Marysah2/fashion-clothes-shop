import { useDispatch } from "react-redux";
import { setSelectedRole } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    dispatch(setSelectedRole(role));
    navigate("/auth");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black tracking-widest uppercase text-white">
          ELEVATE YOUR STYLE
        </h1>
        <p className="mt-3 text-lg font-light text-gray-300">
          Step into your fashion world
        </p>
      </div>

      <div className="relative z-10 bg-black text-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <h2 className="text-2xl font-bold mb-2 tracking-wide">
          Choose Your Role
        </h2>
        <p className="text-gray-400 mb-8">Admin or Customer</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleSelectRole("admin")}
            className="flex-1 py-4 rounded-xl border-2 border-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            Admin
          </button>

          <button
            onClick={() => handleSelectRole("customer")}
            className="flex-1 py-4 rounded-xl border-2 border-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;