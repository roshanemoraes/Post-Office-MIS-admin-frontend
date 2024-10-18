import image from "../../assets/Customer/hero-logo.jpg";
import addressupdatimg from "../../assets/Customer/address update.svg";
import mailhistoryimg from "../../assets/Customer/mail history.svg";
import moneyorderimg from "../../assets/Customer/Money Orders.svg";
import notificationimg from "../../assets/Customer/notification.svg";
import { Box, Button } from "@mui/material";
import Footer from "./../../components/Layout/Customer/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGoToNotification = () => {
    navigate("../notification");
  };

  const handleGoToPendingPost = () => {
    navigate("../pendingpost");
  };

  const handleGoToDeliveredPost = () => {
    navigate("../sentpost");
  };
  const handleGoToMoneyOrder = () => {
    navigate("../money-order");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="mt-2 mx-[10px]">
          <header className="relative text-center text-white">
            <img
              src={image}
              alt="ProfilePicture"
              className="w-full h-[380px] object-cover"
              // style={{ filter: "blur(1px)" }}
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-3 bg-black bg-opacity-70">
              <h1 className="text-3xl font-bold">OUR THEME</h1>
              <h2 className="text-xl mt-2">
                “Provide A Better And Fast Delivery With The Aid Of Digital
                Revolutionalization”
              </h2>
            </div>
          </header>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="col-span-1 min-h-[500px]">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "10px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "500px",
                  minWidth: "550px",
                  backgroundColor: "#000",
                  padding: "30px 2px 30px 2px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{ height: "15%", color: "white", fontSize: "25px" }}
                >
                  <div>Address Update</div>
                  <div
                    className="flex mt-0 flex-center justify-center align-center  "
                    style={{
                      alignContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        my: "10px",
                        mb: "5px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        px: 5,
                        fontSize: "14px",
                        borderRadius: "20px",
                      }}
                      onClick={handleGoToNotification}
                    >
                      Go
                    </Button>
                  </div>
                </div>
                <div style={{ height: "85%" }}>
                  <img
                    src={addressupdatimg}
                    style={{ height: "350px", width: "350px" }}
                    alt="address update"
                  ></img>
                </div>
              </Box>
            </Box>
          </div>
          <div className="col-span-1 min-h-[500px]">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "10px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "500px",
                  minWidth: "550px",
                  backgroundColor: "#fff",
                  padding: "30px 2px 30px 2px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{ height: "15%", color: "black", fontSize: "25px" }}
                >
                  <div>View History</div>
                  <div
                    className="flex mt-0 flex-center justify-center align-center  "
                    style={{
                      alignContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        my: "10px",
                        mb: "5px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        px: 5,
                        fontSize: "14px",
                        borderRadius: "20px",
                      }}
                      onClick={handleGoToPendingPost}
                    >
                      Go
                    </Button>
                  </div>
                </div>
                <div style={{ height: "85%" }}>
                  <img
                    src={mailhistoryimg}
                    style={{ height: "350px", width: "350px" }}
                    alt="view history"
                  ></img>
                </div>
              </Box>
            </Box>
          </div>
          <div className="col-span-1 min-h-[500px]">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "10px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "500px",
                  minWidth: "550px",
                  backgroundColor: "#fff",
                  padding: "30px 2px 30px 2px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{ height: "15%", color: "black", fontSize: "25px" }}
                >
                  <div>Money Order</div>
                  <div
                    className="flex mt-0 flex-center justify-center align-center  "
                    style={{
                      alignContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        my: "10px",
                        mb: "5px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        px: 5,
                        fontSize: "14px",
                        borderRadius: "20px",
                      }}
                      onClick={handleGoToMoneyOrder}
                    >
                      Go
                    </Button>
                  </div>
                </div>
                <div style={{ height: "85%" }}>
                  <img
                    src={moneyorderimg}
                    style={{ height: "350px", width: "350px" }}
                    alt="view history"
                  ></img>
                </div>
              </Box>
            </Box>
          </div>
          <div className="col-span-1 min-h-[500px]">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "10px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "500px",
                  minWidth: "550px",
                  backgroundColor: "#000",
                  padding: "30px 2px 30px 2px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{ height: "15%", color: "white", fontSize: "25px" }}
                >
                  <div>Real Time Notification</div>
                  <div
                    className="flex mt-0 flex-center justify-center align-center  "
                    style={{
                      alignContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        my: "10px",
                        mb: "5px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        px: 5,
                        fontSize: "14px",
                        borderRadius: "20px",
                      }}
                      onClick={handleGoToDeliveredPost}
                    >
                      Go
                    </Button>
                  </div>
                </div>
                <div style={{ height: "85%" }}>
                  <img
                    src={notificationimg}
                    style={{ height: "350px", width: "350px" }}
                    alt="address update"
                  ></img>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      {/* <div className="min-h-[90px]"></div> */}
      <Footer />
    </>
  );
}

export default Home;
