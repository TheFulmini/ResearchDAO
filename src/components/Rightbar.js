import "./Rightbar.css";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";

const Rightbar = () => {
	const { isAuthenticated } = useMoralis();
	const trends = [
		{
			text: "Compactified Jacobians of Extended ADE Curves and Lagrangian Fibrations",
		},
		{
			text: "Kuga Varieties of Polarised Abelian Surfaces",
		},
		{
			text: "Symplectic rigidity of O'Grady's tenfolds",
		},
		{
			text: "Graph potentials and symplectic geometry of moduli spaces of vector bundles",
		},
	];


	return (
		<>
			<div className="rightbarContent">
				{isAuthenticated ? (
					<div>
						<ConnectButton />
						<div className="trends">
							<p className="title-section">Latest Requests for Funding</p>
							{trends.map((e, i) => {
								return (
									<div key={i} className="trend">
										<div className="trendText">{e.text}</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div>
						<div className="connectButton">
							<ConnectButton />
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Rightbar;
