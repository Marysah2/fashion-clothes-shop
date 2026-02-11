
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
    <div className="select-role-page">
      <div className="hero">
        <h1 className="site-title">FASHION CLOTHES SHOP</h1>
        <p className="site-subtitle">Step into your fashion world</p>
      </div>

      <div className="role-card">
        <h2 className="role-card-title">Choose Your Role</h2>
        <p className="role-card-subtitle">Admin or Customer</p>
        <div className="role-buttons">
          <button className="role-btn" onClick={() => handleSelectRole("admin")}>
            Admin
          </button>
          <button className="role-btn" onClick={() => handleSelectRole("customer")}>
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;