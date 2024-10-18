/* global google */

import axios from "axios";
import { DistanceMatrixService } from "@react-google-maps/api";

// destinations: [
//     { lat: 7.210686, lng: 79.835901 }, //postofc
//     { lat: 7.213954, lng: 79.847701 }, //msc main
//     { lat: 7.213504, lng: 79.841589 }, //amc
//   ],

const getDistanceMatrix = (destinations) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        destinations,
        destinations,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status !== "OK") {
          reject(status);
          return;
        }

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
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      }
    );
  });
};

window.onload = function () {
  const destinations = [
    { lat: 7.210686, lng: 79.835901 }, //postofc
    { lat: 7.213954, lng: 79.847701 }, //msc main
    { lat: 7.213504, lng: 79.841589 }, //amc
  ];

  getDistanceMatrix(destinations)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

export default getDistanceMatrix;
