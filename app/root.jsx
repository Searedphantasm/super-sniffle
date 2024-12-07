import {
    Link,
    Links, LiveReload,
    Meta,
    Outlet,
    Scripts, ScrollRestoration, useRouteError,
} from "@remix-run/react";

import styles from "./styles/main.css";
import MainNavigation from "./components/MainNavigation.jsx";

export const meta = () => ([{
    charset: "utf-8",
    title:"Remix note App",
    viewport: "width=device-width, initial-scale=1.0",
}])

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
        </head>
        <body>
            <header>
                <MainNavigation />
            </header>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </body>
        </html>
    );
}

// it will be rendered instead of App component anywhere in the app if we have an error
export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html lang="en">
        <head>
            <link
                rel="icon"
                href="data:image/x-icon;base64,AA"
            />
            <Meta />
            <Links />
            <title>An error occurred!</title>
        </head>
        <body>
        <header>
            <MainNavigation />
        </header>
        {error && (
            <p></p>
        )}
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
