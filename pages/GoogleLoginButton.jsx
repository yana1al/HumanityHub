import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleLoginButton = () => {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    axios.get("/auth/google")
      .then(response => {
        setClientId(response.data.clientId);
        setRedirectUri(response.data.redirectUri);
      })
      .catch(error => {
        console.error("Error fetching Google config:", error);
      });
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth` +
      `?response_type=token` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&scope={scope}`;
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLoginButton;
