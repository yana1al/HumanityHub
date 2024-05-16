
import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
   
    window.location.href = 'https://humanity-hub1-3599a88da879.herokuapp.com/login/auth/google';
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLoginButton;
