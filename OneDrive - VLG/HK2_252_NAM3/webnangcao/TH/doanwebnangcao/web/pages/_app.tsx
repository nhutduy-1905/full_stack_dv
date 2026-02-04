import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import store from '../store/index';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return  (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Don't retry on 401 (Unauthorized)
            if (error?.status === 401) return;
            // Max 2 retries for other errors
            if (retryCount >= 2) return;
            // Retry after 2 seconds
            setTimeout(() => revalidate({ retryCount }), 2000);
          }
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp