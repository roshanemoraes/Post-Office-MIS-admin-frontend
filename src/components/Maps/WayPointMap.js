import React, { useCallback, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const WayPointMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
    libraries: ["places"],
  });
  const [direction, setDirection] = React.useState(null);
  const directionsCallback = useCallback((result, status) => {
    if (status === "OK") {
      setDirection(result);
    } else {
      console.error(`error fetching directions ${result}`);
    }
  }, []);

  const mapRef = useRef(null);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const origin = { lat: 6.0535, lng: 80.221 }; // Galle
  const destination = { lat: 9.6615, lng: 80.0225 }; // Colombo

  return <div></div>;
};

export default WayPointMap;
