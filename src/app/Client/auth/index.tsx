import React, { useState } from "react";
import SignUp from "./signup";
import Login from "./login";
import { useParams } from "react-router-dom";

function ClientAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const { providerId } = useParams<{ providerId: string }>() as {
    providerId: string;
  };

  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} providerId={providerId} />
      ) : (
        <SignUp setIsLogin={setIsLogin} providerId={providerId} />
      )}
    </>
  );
}

export default ClientAuth;
