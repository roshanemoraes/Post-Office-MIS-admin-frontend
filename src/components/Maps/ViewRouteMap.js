import React, { useEffect, useState } from "react";
import markerIcon from "./user.png";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";

const ViewRouteMap = ({ destinations }) => {
  const center = {
    lat: destinations[0].lat,
    lng: destinations[0].lng,
  };
  const [locations, setLocations] = useState(destinations || []);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log("Locations: ", destinations);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      {isLoaded && (
        <GoogleMap
          center={mapCenter}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          //   mapTypeId="ec1432108f3d8893"
          onClick={() => setActiveMarker(null)}
          onDragEnd={() => {
            setMapCenter(map.getCenter().toJSON());
          }}
          onLoad={(map) => {
            // Save the map reference
            setMap(map);
          }}
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
              icon={{
                url: markerIcon,
                scaledSize: new window.google.maps.Size(20, 20),
              }}
            >
              {activeMarker === index ? (
                <InfoWindowF
                  onCloseClick={() => setActiveMarker(null)}
                  options={{ pixelOffset: new window.google.maps.Size(0, 1) }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "serif",
                      fontSize: "13px",
                      margin: "1px",
                      //   height: "75px",
                      fontWeight: "bolder",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {/* <div>Name: </div> */}
                    {/* <div>Delivered: {location.deliveredCount}</div>
                    <div>Pending: {location.pendingCount}</div> */}
                    <div>
                      {/* {location.pendingCount} / {location.deliveredCount} */}
                    </div>
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

export default ViewRouteMap;
