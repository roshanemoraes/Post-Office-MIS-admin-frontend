import React, { Component } from "react";
import { DistanceMatrixService } from "@react-google-maps/api";
import axios from "axios";

class Test extends Component {
  render = () => {
    return (
      <DistanceMatrixService
        options={this.createOptions()}
        callback={this.handleResponse}
      />
    );
  };

  createOptions = () => {
    return {
      destinations: [
        { lat: 7.210686, lng: 79.835901 }, //postofc
        { lat: 7.213954, lng: 79.847701 }, //msc main
        { lat: 7.213504, lng: 79.841589 }, //amc
      ],
      origins: [
        { lat: 7.210686, lng: 79.835901 }, //postofc
        { lat: 7.213954, lng: 79.847701 }, //msc main
        { lat: 7.213504, lng: 79.841589 }, //amc
      ],
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
export default Test;
