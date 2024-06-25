import React, { useState } from "react";
import { addEmployeeField } from "../../data/formFields";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddEmployee = () => {
  const initialFormState = {
    recipientName: "",
    recipientCity: "",
    recipientAddress: "",
    recipientPostalZone: "",
    recipientHouseNumber: "",

    senderName: "",
    senderCity: "",
    senderAddress: "",
    senderPostalZone: "",
    senderHouseNumber: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [role, setRole] = React.useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const allRoles = [
    { label: "Postmaster", value: "Postmaster" },
    { label: "Supervisor", value: "Supervisor" },
    { label: "Receptionist", value: "Receptionist" },
    { label: "Postman", value: "Postman" },
    { label: "Dispatch Record Manager", value: "Dispatch Record Manager" },
  ];

  const employeeRoleField = [
    {
      ...addEmployeeField.employeeRole,
      options: allRoles,
    },
  ];

  const employeeFields = [
    addEmployeeField.employeeFullName,
    addEmployeeField.employeeNIC,
    addEmployeeField.employeeDateOfBirth,
    addEmployeeField.employeeEmail,
    addEmployeeField.employeeContactNumber,
    addEmployeeField.accountPassword,
  ];

  const handleSubmit = async (formstate) => {
    console.log(formstate);
  };

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };

  return (
    <div>
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
            width: "45%",
            minWidth: "550px",
            backgroundColor: "#f5f5f5",
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
              marginBottom: "10px",
              fontFamily: "Helvetica Neue",
            }}
          >
            Add Employee
          </Typography>
          <Box
            component="form"
            display="flex"
            alignItems="flex-start"
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column", //changed
              alignItems: "center",
              "& .MuiTextField-root": {
                fontSize: "15px",
                marginTop: "10px",
              },
            }}
          >
            <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
              <InputLabel id="roleSelector" sx={{ fontSize: "14px" }}>
                Role
              </InputLabel>
              <Select
                labelId="roleSelector"
                id="roleSelector"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={10}>Postmaster</MenuItem>
                <MenuItem value={20}>Receptionist</MenuItem>
                <MenuItem value={30}>Delivery Manager</MenuItem>
              </Select>
            </FormControl>
            <TextField
              inputProps={{ readOnly: true }}
              read
              InputLabelProps={{
                style: { fontSize: 13 },
              }}
              style={{ minWidth: 480 }}
              required
              type={addEmployeeField.employeeFullName.type}
              id={addEmployeeField.employeeFullName.id}
              label={addEmployeeField.employeeFullName.label}
              onChange={handleChange(addEmployeeField.employeeFullName.id)}
              value={formState.employeeFullName}
            ></TextField>
            <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
              <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-1 xs:ml-1 min-w-[235px] min-h-[60px]">
                <TextField
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 13 },
                  }}
                  style={{ minWidth: 237 }}
                  required
                  type={addEmployeeField.employeeNIC.type}
                  id={addEmployeeField.employeeNIC.id}
                  label={addEmployeeField.employeeNIC.label}
                  onChange={handleChange(addEmployeeField.employeeNIC.id)}
                ></TextField>
              </div>
              <div className="sm:col-span-6 xs:col-span-6 sm:ml-1 xs:ml-1 sm:min-w-[235px] xs:min-w-[235px] sm:min-h-[60px] xs:min-h-[60px]">
                <TextField
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 13, width: "500px" },
                  }}
                  style={{ minWidth: 237 }}
                  required
                  type={addEmployeeField.employeeContactNumber.type}
                  id={addEmployeeField.employeeContactNumber.id}
                  label={addEmployeeField.employeeContactNumber.label}
                  onChange={handleChange(
                    addEmployeeField.employeeContactNumber.id
                  )}
                ></TextField>
              </div>
            </div>
            <TextField
              inputProps={{ readOnly: true }}
              read
              InputLabelProps={{
                style: { fontSize: 13 },
              }}
              style={{ minWidth: 480 }}
              required
              type={addEmployeeField.employeeEmail.type}
              id={addEmployeeField.employeeEmail.id}
              label={addEmployeeField.employeeEmail.label}
              onChange={handleChange(addEmployeeField.employeeEmail.id)}
              value={formState.employeeEmail}
            ></TextField>
            <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
              <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-1 xs:ml-1 min-w-[235px] min-h-[60px]">
                <TextField
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 13 },
                  }}
                  style={{ minWidth: 237 }}
                  required
                  type={addEmployeeField.accountPassword.type}
                  id={addEmployeeField.accountPassword.id}
                  label={addEmployeeField.accountPassword.label}
                  onChange={handleChange(addEmployeeField.accountPassword.id)}
                ></TextField>
              </div>
              <div className="sm:col-span-6 xs:col-span-6 sm:ml-1 xs:ml-1 sm:min-w-[235px] xs:min-w-[235px] sm:min-h-[60px] xs:min-h-[60px]">
                <TextField
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 13, width: "500px" },
                  }}
                  style={{ minWidth: 237 }}
                  required
                  type={addEmployeeField.employeeDateOfBirth.type}
                  id={addEmployeeField.employeeDateOfBirth.id}
                  label={addEmployeeField.employeeDateOfBirth.label}
                  onChange={handleChange(
                    addEmployeeField.employeeDateOfBirth.id
                  )}
                ></TextField>
              </div>
            </div>
            <Button
              variant="contained"
              sx={{
                my: "40px",
                mb: "20px",
                mr: "60px",
                backgroundColor: "#852318",
                color: "white",
                px: 5,
                fontSize: "14px",
                borderRadius: "6px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddEmployee;
