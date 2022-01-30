import {
  Meta,
  Scripts,
  useCatch,
  LiveReload,
  LoaderFunction,
  useLoaderData,
} from "remix";

import type { LinksFunction } from "remix";

import { ChakraProvider, Box, Heading } from "@chakra-ui/react";

// import { KakaoMap } from './components/kakaoMap/kakaoMap';
import { useEffect, useState } from "react";
import useFirebase from "./modules/firebase/useFirebase";
import SignUp from "./components/signUp/signUp";

export let loader: LoaderFunction = (): {
  kakaoApiKey: string | undefined,
  firebaseConfig: FirebaseConfig
} => {
  return {
    kakaoApiKey: process.env.KAKAO_API_KEY,
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  };
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {

  return (
    <Document title="TeaMory">
      <ChakraProvider>
        <SignUp />
        {/* <Box w="100vw" h="90vh">
          <KakaoMap>
            <Box></Box>
          </KakaoMap>
        </Box> */}
      </ChakraProvider>
    </Document>
  );
}

const Document = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string,
}) => {
  const data = useLoaderData();

  const {getCollection} = useFirebase();

  const firebaseTest = async () => {
    // const docRef = await addDoc(collection(database, 'menu'), {
    //   name: '아메리카노',
    //   price: '2500',
    //   description: '아메아메아메 아메리카노오오 조와 참 조와아'
    // }) 
    
    const querySnapshot = await getCollection('menu');
    querySnapshot?.forEach(doc => {
      console.log(doc.data().name)
    });
  }
  
  useEffect(() => {
    firebaseTest();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {data?.kakaoApiKey && <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoApiKey}&libraries=services`}></script>}
        <title>{title}</title>
      </head>
      <body style={{background: "#5a5353"}}>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <Meta/>
        <Scripts/>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title='Error!'>
      <ChakraProvider>
        <Box>
          <Heading as='h1'>There was an error</Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Box>
          <Heading as='h1'>
            {caught.status} {caught.statusText}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}