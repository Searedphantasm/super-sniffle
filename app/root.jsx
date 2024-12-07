import {
    Links, LiveReload,
    Meta,
    Outlet,
    Scripts, ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/main.css";

export default function App() {
    return (
        <html lang="en">
        <head>
            <link
                rel="icon"
                href="data:image/x-icon;base64,AA"
            />
            <Meta />
            <Links />
            <title>Remix Home</title>
        </head>
        <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </body>
        </html>
    );
}

export function links(){
    return [{
        rel:"stylesheet",
        href:styles,
    }]
}
