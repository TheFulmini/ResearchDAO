import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

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

const App = () => {
	return (
		<>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<div className="navbar">
						<ConnectButton />
					</div>
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
};


export default App;
