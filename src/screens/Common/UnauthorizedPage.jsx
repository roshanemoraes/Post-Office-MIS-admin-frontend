import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import BlurBackground from "../../components/Custom/Background/BlurBackground";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     localStorage.clear();
  //   }, []);

  const handleRefresh = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <>
      <NavBar />
      <BlurBackground />
      <div className="bg-[#3f505e] h-[120px]"></div>
      <div
        className="flex mt-[20px] justify-center font-bold font-mono text-[rgb(78,78,78)]"
        style={{ alignItems: "center", fontSize: "90px" }}
      >
        401
      </div>
      <div
        className="flex justify-center font-bold font-mono text-[rgb(78,78,78)]"
        style={{ alignItems: "center", fontSize: "50px" }}
      >
        WE'RE SORRY, YOUR REQUEST IS UNAUTHORIZED
      </div>
      <div
        className="flex mt-[50px] justify-center font-bold font-mono min-h-[40px] text-[rgb(78,78,78)]"
        style={{ alignItems: "center", fontSize: "20px" }}
      >
        PLEASE CLICK THE "REFRESH" BUTTON BELOW TO TRY AGAIN.
      </div>
      <div
        className="flex mt-[10px] justify-center font-bold font-mono min-h-[40px] text-[rgb(78,78,78)]"
        style={{ alignItems: "center", fontSize: "20px" }}
      >
        <Button
          style={{ backgroundColor: "#852318", borderColor: "#852318" }}
          onClick={handleRefresh}
        >
          REFRESH
        </Button>
      </div>
    </>
  );
};

export default UnauthorizedPage;
