import React from "react";
import { addEmployeeField } from "../../data/formFields";
import { Box } from "@mui/material";
import PostForm from "../../components/Forms/PostForm";

const AddEmployee = () => {
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

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <PostForm
          formTitle={"Add Employee"}
          fieldsGroups={[{ label: "Employee:", fields: employeeFields }]}
          selectionGroups={[{ fields: employeeRoleField }]}
          onFormSubmit={handleSubmit}
        />
      </Box>
    </div>
  );
};

export default AddEmployee;
