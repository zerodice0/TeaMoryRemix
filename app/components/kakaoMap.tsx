import { useEffect, useRef } from "react";
declare global {
  interface Window {
    kakao: any
  }
}

interface MapData {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: number;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

interface Pagenation {
  current: number;
  first: number;
  hasMaxPage: boolean;
  hasNextPage: boolean;
  last: number;
  perPage: number;
  totalCount: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const KakaoMap = () =>  {
  const mapContainer = useRef(null);
  let mapObject: any;
  let placeSearchObject: any;
  let infoWindowObject: any;
  
  const initMap = (latitude: number, longitude: number) => {
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3
    }
    mapObject = new window.kakao.maps.Map(mapContainer.current, options);
    placeSearchObject = new window.kakao.maps.services.Places();
    infoWindowObject = new window.kakao.maps.InfoWindow({$index: 1});

    placeSearchObject.keywordSearch('-', (data:MapData[], status:string, pagination:Pagenation) => {
      
    });
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