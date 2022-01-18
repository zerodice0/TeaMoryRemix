import { Box, Button, ChakraProvider, Grid, GridItem, Input, Stack } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapData, Pagenation, UpdateSearchKeyword } from "./model/model";
declare global {
  interface Window {
    kakao: any
  }
}

export const KakaoMap = ({children}:{
  children: ReactNode,
}) =>  {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [kakaoMapSdk, setKakaoMapSdk] = useState<any>(null);

  useEffect(() => {
    setKakaoMapSdk(window.kakao.maps);
  }, [])

  const {mapObject, placeSearchObject} = useMemo(() => {
    if (typeof window !== 'undefined' && kakaoMapSdk !== null) {
      const options = {
        center: new kakaoMapSdk.LatLng(33.450701, 126.570667),
        level: 3
      }
  
      const mapObject = new kakaoMapSdk.Map(mapContainer.current, options);
      const placeSearchObject = new kakaoMapSdk.services.Places();
      
      return {mapObject, placeSearchObject};
    } else {
      return {mapObject: null, placeSearchObject: null};
    }
  }, [kakaoMapSdk]);

  const searchByKeyword = (keyword: string) => {
    placeSearchObject.keywordSearch(keyword, 
      (data:MapData[], status:string, pagination:Pagenation) => {
        console.log(data);
      }
    );
  }

  return (
    <Grid w='100vw' h='100vh' gap={1}
        templateColumns='repeat(4, 1fr)'>
      <GridItem colSpan={3}>
        <div ref={mapContainer} style={{width: '100%', height: '100%'}}>
        </div>
      </GridItem>
      <GridItem colSpan={1}>
        <Box m='2' p='2' maxW='sm'
            borderWidth='1px'
            borderRadius='lg'>
          <Input placeholder="Please input keyword"
            onChange={(event) => setKeyword(event.target.value)}/>
          <Button w="100%" onClick={() => searchByKeyword(keyword)}>Search</Button>
        </Box>
        
      </GridItem>
    </Grid>
  )
}