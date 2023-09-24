import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../../contexts/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user === "master";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin === true ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default ProtectedRoute;
