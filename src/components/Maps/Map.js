import React, { useEffect, useState } from "react";
import markerIcon from "./user.png";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import { get, ref } from "firebase/database";
import { db } from "../../firebase.js";

const Map = () => {
  const center = {
    lat: 7.2008,
    lng: 79.8737,
  };
  const [locations, setLocations] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [map, setMap] = useState(null);

  const fetchData = async () => {
    try {
      const dbRef = ref(db, "PostmanTracker");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert object to an array of entries and filter out any undefined/empty entries
        const filteredData = Object.entries(data)
          .filter(([ value]) => value) // Remove any empty entries
          .map(([key, value]) => value); // Map to extract the values (locations)

        setLocations(filteredData); // Now `locations` will contain only valid entries
        console.log(filteredData); // Check the filtered data in the console
      } else {
        console.log("No data available");
      }
    } catch (err) {
      console.error("Error fetching postman locations!", err);
    }
  };

  useEffect(() => {
    
    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
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
        height: "90vh",
      }}
    >
      {isLoaded && (
        <GoogleMap
          center={mapCenter}
          zoom={14}
          mapContainerStyle={{ width: "90%", height: "90vh" }}
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
              position={{
                lat: location.userLocation.latitude,
                lng: location.userLocation.longitude,
              }}
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
                    <div>Name: {location.userName}</div>
                    <div>Delivered: {location.deliveredCount}</div>
                    <div>Pending: {location.pendingCount}</div>
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

export default Map;
