import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";
import { Box } from "@mui/material";

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://5741da49-95d1-43fa-beb5-b3b02a53e825.mock.pstmn.io/postman/locations"
        );
        setLocations(response.data);
        console.log("request came!");
      } catch (err) {
        console.error("Error fetching postman locations!", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node.className && node.className.includes("gm-style-iw-ch")) {
            // Apply your styles here
            node.style.fontSize = "16px";
            node.style.fontWeight = "bolder";
            node.style.paddingTop = "0px";
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const center = {
    lat: 7.2008,
    lng: 79.8737,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          //   mapTypeId="ec1432108f3d8893"
          onClick={() => setActiveMarker(null)}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {locations.map((location, index) => (
            <MarkerF
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleActiveMarker(index)}
              onMouseOver={() => handleActiveMarker(index)}
              onMouseOut={() => setActiveMarker(null)}
            >
              {activeMarker === index ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "serif",
                      fontSize: "16px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      width: "250px",
                      height: "105px",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <div>Name: {location.name}</div>
                    <div>Delivered: {location.deliveredCount}</div>
                    <div>Pending: {location.pendingCount}</div>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
