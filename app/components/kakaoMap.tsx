import { useEffect, useRef } from "react";

export const KakaoMap = () =>  {
  const mapContainer = useRef(null);
  
  const initMap = (latitude: number, longitude: number) => {
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3
    }
    new window.kakao.maps.Map(mapContainer.current, options)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const {latitude, longitude} = position.coords;
      initMap(latitude, longitude);
    },
    (positionError: GeolocationPositionError) => {
      console.error(positionError);
      initMap(33.450701, 126.570667);
    });
  })

  return (
    <div ref={mapContainer} style={{width: "100%", height: "100%"}}></div>
  )
}