import { AppProps } from 'next/app';
import { ContextProvider } from '../lib/context';

import '@theme/global.scss';
import 'highlight.js/styles/stackoverflow-dark.css';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    );
}
