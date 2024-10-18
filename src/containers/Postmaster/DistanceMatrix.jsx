import React, { Component } from "react";
import { DistanceMatrixService } from "@react-google-maps/api";
import axios from "axios";

class DistanceMatrix extends Component {
  render = () => {
    return (
      <DistanceMatrixService
        options={{
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
        }}
        callback={(response) => {
          const numberOfLocations = response.rows.length;
          const addresses = response.destinationAddresses;

          let matrix = [];
          for (let i = 0; i < numberOfLocations; i++) {
            let data = [];
            for (let j = 0; j < numberOfLocations; j++) {
              data.push(response.rows[i].elements[j].distance.value);
            }
            matrix.push(data);
          }
          axios
            .post(
              "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/matrix/post-matrix",
              {
                matrix,
                addresses,
              },
              { withCredentials: true }
            )
            .then((response) => console.log(response.data))
            .catch((error) => console.log("Backend was not reached!", error));
        }}
      />
    );
  };
}

export default DistanceMatrix;
