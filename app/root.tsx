import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { LinksFunction } from "remix";
import { useEffect, useState } from "react";

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";

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

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Map />
    </Document>
  );
}

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    let map = new window.kakao.maps.Map(container, options);
  }, [])

  const addA = () => {
    setA(a + 1);
  }

  return (
    <div id="map" style={{width: "100vw", height: "100vh"}}></div>
  )
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9c00a28773c06d77e17b4fd10f8fa42c"></script>
        <title>TeaMory</title>
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
