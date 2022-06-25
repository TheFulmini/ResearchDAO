import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useConnect, useDisconnect, useAccount, useNetwork } from "wagmi";

import NewProposal from "./components/NewProposal";
import MyProposals from "./components/MyProposals";
import Proposal from "./components/Proposal";
import Sidebar from "./components/Sidebar";
import HomeAuth from "./components/HomeAuth";
import Rightbar from "./components/Rightbar";

// const { chains, provider } = configureChains(
// 	[chain.rinkeby],
// 	[alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
// 	appName: "Research DAO",
// 	chains,
// });

// const wagmiClient = createClient({
// 	autoConnect: true,
// 	connectors,
// 	provider,
// });

// const App = () => {
// 	return (
// 		<>
// 			<WagmiConfig client={wagmiClient}>
// 				<RainbowKitProvider chains={chains}>
// 					<div className="navbar">
// 						<ConnectButton />
// 					</div>
// 				</RainbowKitProvider>
// 			</WagmiConfig>
// 		</>
// 	);
// };

const App = () => {
	const { connect, connectors, isConnected } = useConnect();
	return (
		<>
			{isConnected ? (
				<div className="App">
					<div className="sideBar">
						<Sidebar />
					</div>
					<div className="mainWindow"></div>
					<Routes>
						<Route path="/" element={<HomeAuth />} />
              <Route path="/new-proposal" element={<NewProposal />} />
              <Route path="/my-proposals" element={<MyProposals />} />
              <Route path="/proposal/:url" element={<Proposal />} />

					</Routes>
					<div>
						<Rightbar />
					</div>
				</div>
			) : (
				<div className="App">
					<div>
						<Rightbar />
					</div>
				</div>
			)}
		</>
	);
};

export default App;
