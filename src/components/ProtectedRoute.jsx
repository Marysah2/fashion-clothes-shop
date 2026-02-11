
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  
  const user = reduxUser || storedUser;

  const token = localStorage.getItem("access_token");

  
  if (!token || !user) return <Navigate to="/select-role" />;


  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="unauthorized" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "black",
      }}>
        Unauthorized - Access Denied
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;