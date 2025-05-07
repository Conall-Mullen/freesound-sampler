import "../styles/globals.css";
import { Provider } from "../components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </Provider>
  );
}
