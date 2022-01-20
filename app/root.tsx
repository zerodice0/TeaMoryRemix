import {
  Meta,
  Scripts,
  useCatch,
  LiveReload,
  LoaderFunction,
  useLoaderData,
} from "remix";
import type { LinksFunction } from "remix";

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";

import { KakaoMap } from './components/kakaoMap/kakaoMap';
import useCurrentLocation from "./modules/location/useCurrentLocation";
// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    }
  ];
};

export let loader: LoaderFunction = () => {
  return {kakaoApiKey: process.env.KAKAO_API_KEY}
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document title="TeaMory">
      <ChakraProvider>
        <Box w="100vw" h="100vh">
          <KakaoMap>
            <Box></Box>
          </KakaoMap>
        </Box>
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
  const kakaoMapUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoApiKey}&libraries=services`
    .replace(/&amp/g, "&");
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script type="text/javascript" src={kakaoMapUrl}></script>
        <title>{title}</title>
      </head>
      <body>
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