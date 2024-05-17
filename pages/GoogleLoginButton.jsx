import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleLoginButton = () => {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    // Fetch Google client ID and redirect URI from backend
    axios.get("/api/config/google")
      .then(response => {
        setClientId(response.data.clientId);
        setRedirectUri(response.data.redirectUri);
      })
      .catch(error => {
        console.error("Error fetching Google config:", error);
      });
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth/v2/auth` +
      `?response_type=code` +
      `&client_id=${process.env.GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${process.env.GOOGLE_CALLBACK}` +
      `&scope=email%20profile`;
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLoginButton;
