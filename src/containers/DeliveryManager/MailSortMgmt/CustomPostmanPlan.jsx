import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const CustomPostmanPlan = () => {
  const [selections, setSelections] = useState([
    {
      id: 1,
      zone: "Pallansena South",
      person: "",
      usualAssignment: "K.M. Silva",
    },
    {
      id: 2,
      zone: "Pallansena North",
      person: "",
      usualAssignment: "R.P. Fernando",
    },
    {
      id: 3,
      zone: "Daluwakotuwa",
      person: "",
      usualAssignment: "S.H. Jayawardena",
    },
    {
      id: 4,
      zone: "Welihena North",
      person: "",
      usualAssignment: "T.N. Wijesinghe",
    },
    { id: 5, zone: "Athgalla", person: "", usualAssignment: "D.W. Gamage" },
  ]);

  const handleSelectChange = (id, event) => {
    const updatedSelections = selections.map((selection) =>
      selection.id === id
        ? { ...selection, person: event.target.value }
        : selection
    );
    setSelections(updatedSelections);
  };

  const handleSubmit = () => {
    const allSelected = selections.every(
      (selection) => selection.person !== ""
    );
    if (allSelected) {
      alert("All selections are valid. Submitting the form.");
    } else {
      alert("Please select a postman for all zones before submitting.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Custom widths for each column */}
            <TableCell
              style={{ width: "25%", padding: "8px", paddingLeft: "20px" }}
            >
              Zone
            </TableCell>
            <TableCell style={{ width: "25%", padding: "8px" }}>
              Usual Assignment
            </TableCell>
            <TableCell style={{ width: "50%", padding: "8px" }}>
              Select Postman
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selections.map((selection) => (
            <TableRow key={selection.id} style={{ height: "40px" }}>
              <TableCell
                style={{ width: "25%", padding: "8px", paddingLeft: "20px" }}
              >
                {selection.zone}
              </TableCell>
              <TableCell style={{ width: "25%", padding: "8px" }}>
                {selection.usualAssignment}
              </TableCell>
              <TableCell style={{ width: "50%", padding: "8px" }}>
                <Select
                  value={selection.person}
                  onChange={(event) => handleSelectChange(selection.id, event)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="K.M. Silva">K.M. Silva</MenuItem>
                  <MenuItem value="R.P. Fernando">R.P. Fernando</MenuItem>
                  <MenuItem value="S.H. Jayawardena">S.H. Jayawardena</MenuItem>
                  <MenuItem value="T.N. Wijesinghe">T.N. Wijesinghe</MenuItem>
                  <MenuItem value="D.W. Gamage">D.W. Gamage</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
          <TableRow style={{ height: "40px" }}>
            <TableCell colSpan={3} align="right" style={{ padding: "8px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomPostmanPlan;
