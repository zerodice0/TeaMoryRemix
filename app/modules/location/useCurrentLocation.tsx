import { useEffect, useState } from "react";
import { GeoLocation } from "./model/model";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<GeoLocation>(
    {
      latitude: 33.450701,
      longitude: 126.570667
    }
  );
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: GeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          setLocation(location);
        },
        (geolocationPositionError) => {
          setError(
            new Error(geolocationPositionError.message)
          );
        }
      )
    } else {
      setError(
        new Error("Geolocation is not supported by this browser."
      ));
    }
  }, []); 


  return { location, error };
}

export default useCurrentLocation;