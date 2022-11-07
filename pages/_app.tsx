import { AppProps } from "next/app";
import { ContextProvider } from "../lib/context";

import "@themes/global.scss";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    );
}
