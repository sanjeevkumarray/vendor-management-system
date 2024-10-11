import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

export default function GoogleAuth() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("current user", user);
  const navigate = useNavigate();
  console.log("current authhenticted", isAuthenticated);

  return (
    <>
      {isAuthenticated && navigate("/dashboard")}
      {isAuthenticated ? (
        <button onClick={(e) => logout()}>Logout</button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login with Google</button>
      )}
    </>
  );
}
