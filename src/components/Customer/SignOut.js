import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform sign-out logic here, e.g., clearing tokens, etc.
    // Redirect to home page after sign-out
    navigate("/");
  }, [navigate]);

  return null; // No UI needed for sign-out
}

export default SignOut;
