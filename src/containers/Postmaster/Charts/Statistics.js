import React, { useRef } from "react";
import BarChart from "./BarChart";
import { Box, Breadcrumbs, Button } from "@mui/material";
import StatisticCard from "./StatisticCard";
import LineChart from "./PostageYearlyChart";
import DeliveredUndeliveredMonthlyChart from "./DeliveredUndeliveredMonthlyChart";
import UndeliveredTypesChart from "./UndeliveredTypesChart";
import { useReactToPrint } from "react-to-print";
import { HomeIcon } from "@heroicons/react/20/solid";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: theme.palette.grey[300],
    cursor: "pointer",
  },
  "&:active": {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey[300],
  },
  "& .MuiChip-icon": {
    marginLeft: theme.spacing(1),
  },
}));
const StyledBreadcrumb1 = styled(Chip)(({ theme }) => ({
  backgroundColor: "transparent",
  borderRadius: "0px",
  borderColor: "transparent",
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: theme.palette.grey[300],
    cursor: "pointer",
  },
  "&:active": {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey[300],
  },
  "& .MuiChip-icon": {
    marginLeft: theme.spacing(1),
  },
}));

const Statistics = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Dashboard"
          // icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Statistics" />
        {/* <StyledBreadcrumb
          label="Accessories"
          // deleteIcon={<ExpandMoreIcon />}
          // onDelete={handleClick}
        /> */}
      </Breadcrumbs>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 sticky top-0 h-screen pt-3 px-4">
          <div className="mb-2">
            <StatisticCard
              title="Mails Received Per Month"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Yearly Postage Income"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Monthly Delivered & Undelivered"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Undelivered Mail Types"
              backgroundColor="white"
            />
          </div>
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              // my: "10px",
              mb: "10px",
              backgroundColor: "#852318",
              color: "white",
              px: 5,
              fontSize: "14px",
              borderRadius: "6px",
            }}
            type="submit"
          >
            Print
          </Button>
        </div>
        <div ref={componentRef} className="col-span-9 overflow-y-auto">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <BarChart />
            </Box>
          </Box>
          <div className="mt-2"></div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <LineChart />
            </Box>
          </Box>
          <div className="mt-2"></div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <DeliveredUndeliveredMonthlyChart />
            </Box>
          </Box>
          <div className="mt-2"></div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <UndeliveredTypesChart />
            </Box>
          </Box>
          <div className="min-h-[100px]"></div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
