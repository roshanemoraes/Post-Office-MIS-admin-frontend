import { Box, Typography, useTheme, Breadcrumbs } from "@mui/material";
import React from "react";
import HorizontalLinearStepper from "./MailRegistration/NormalParcelStepper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
const NormalParcelPost = () => {
  // const theme = useTheme();

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

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Mail Registration"
          // icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Normal Parcel Post" />
        {/* <StyledBreadcrumb
      label="Accessories"
      // deleteIcon={<ExpandMoreIcon />}
      // onDelete={handleClick}
    /> */}
      </Breadcrumbs>
      <Box
        display="flex"
        paddingTop={2}
        flexDirection="row"
        justifyContent="space-around"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            minWidth: "550px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "30px 2px 30px 2px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
              marginBottom: "35px",
              fontFamily: "Helvetica Neue",
            }}
          >
            Normal Parcel Post
          </Typography>
          <div style={{ width: "90%" }}>
            <HorizontalLinearStepper />
          </div>
        </Box>
      </Box>
    </>
  );
};

export default NormalParcelPost;
