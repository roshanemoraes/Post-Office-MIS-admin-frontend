import React from "react";
import DataTable from "../../components/Tables/DataTable";
import { Box } from "@mui/material";

const ListEmployee = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "19px 19px 19px 19px",
        marginLeft: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <DataTable />
    </Box>
  );
};

export default ListEmployee;
