"use client";
//import configs wagmi
import { MagicAuthConnector } from "@magiclabs/wagmi-connector";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Mint from "@/app/components/Mint";


//get the api magic key here https://dashboard.magic.link/
const YOUR_MAGIC_LINK_API_KEY = "pk_live_69CE4C658DE84376";

//config chains
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

//create config
const config = createConfig({
  autoConnect: true,
  publicClient,

  //em connectors, vc pode passar 1 ou mais conectores
  //usando conector da Magic Link (MagicAuthConnector)
  connectors: [
    new MagicAuthConnector({
      chains: chains,
      options: {
        apiKey: YOUR_MAGIC_LINK_API_KEY, //required
        isDarkMode: true,
        magicSdkConfiguration: {
          network: {
            rpcUrl: "https://rpc.ankr.com/polygon_mumbai", // your ethereum, polygon, or optimism mainnet/testnet rpc URL
            chainId: 80001,
          },
        },

        //precisa instalar OAuth Extension
        //https://magic.link/docs/dedicated/login-methods/social-logins/integration/oauth-implementation/web
        oauthOptions: {
          providers: ["google", "facebook"],
        },
      },
    }),
  ],
});

export default function Home() {

  return (
    <WagmiConfig config={config}>
      <main className="h-screen bg-[url(../../public/planet-02.png)] bg-bottom bg-cover">
        <div className="h-[90vh]">
          <Header  />
          <Mint  />
        </div>
        <Footer />
      </main>
    </WagmiConfig>
  );
}
