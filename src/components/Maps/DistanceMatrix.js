import React, { Component } from "react";
import { DistanceMatrixService } from "@react-google-maps/api";
import axios from "axios";

class DistanceMatrix extends Component {
  render = () => {
    return (
      <DistanceMatrixService
        options={this.createOptions()}
        callback={this.handleResponse}
      />
    );
  };

  createOptions = () => {
    const { destinations } = this.props;

    return {
      destinations,
      origins: destinations,
      travelMode: "DRIVING",
    };
  };

  handleResponse = (response) => {
    const matrix = this.createDistanceMatrix(response);
    const addresses = response.destinationAddresses;

    this.postMatrix(matrix, addresses);
  };

  createDistanceMatrix = (response) => {
    const numberOfLocations = response.rows.length;
    let matrix = [];

    for (let i = 0; i < numberOfLocations; i++) {
      let data = [];
      for (let j = 0; j < numberOfLocations; j++) {
        data.push(response.rows[i].elements[j].distance.value);
      }
      matrix.push(data);
    }

    return matrix;
  };

  postMatrix = (matrix, addresses) => {
    axios
      .post(
        "http://localhost:8081/matrix/post-matrix",
        {
          matrix,
          addresses,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Response data for optimum route, success!");
        this.props.onResponse(response.data); //NOTE: callback to parent
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
export default DistanceMatrix;
