import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import '../styles/components/main.css'
import '../styles/globals.css'

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);


const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp
