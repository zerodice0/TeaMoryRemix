import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
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