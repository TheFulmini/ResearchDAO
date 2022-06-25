import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Researchers from "./Researchers";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MoralisProvider } from "react-moralis";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const { chains, provider } = configureChains(
	[chain.rinkeby],
	[alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "Research DAO",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

root.render(
	<React.StrictMode>
		{/* <router> */}
		{/* 	<Routes> */}
		{/* 		<Route path="/researchers" element={<Researchers />} /> */}
		{/* 	</Routes> */}
		{/* </Router> */}
		<Router>
			<MoralisProvider
				initializeOnMount
				masterKey={process.env.MASTER_KEY}
				appId={process.env.APPID}
				serverUrl={process.env.SERVER_URL}
			>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains}>
						<App />
					</RainbowKitProvider>
				</WagmiConfig>
			</MoralisProvider>
		</Router>
	</React.StrictMode>
);
