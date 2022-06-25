import { useEffect, useState } from "react";
import "./MyProposals.css";
import axios from "axios";
import ProposalCard from "../components/ProposalCard";
import { Button } from "web3uikit";
import { useNavigate } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

const MyProposals = () => {
	const Web3Api = useMoralisWeb3Api();
	const { isInitialized, isAuthenticated, account } = useMoralis();
	const navigate = useNavigate();
	const [proposals, setProposals] = useState();
	const [proposalsContent, setProposalsContent] = useState();

	const fetchAllNfts = async () => {
		const options = {
			chain: "rinkeby",
			address: account,
			token_address: "0x075aBA3E0F4AB4a457c47afd92b3dB74ecEeE428",
		};

		const rinkebyNFTs = await Web3Api.account.getNFTsForContract(options);
		const tokenUri = rinkebyNFTs?.result?.map((data) => {
			const { metadata, owner_of } = data;

			if (metadata) {
				const metadataObj = JSON.parse(metadata);
				const { externalUrl } = metadataObj;
				return { externalUrl, owner_of };
			} else {
				return undefined;
			}
		});
		setProposals(tokenUri);
	};

	const fetchProposalsContent = async () => {
		const limit5 = proposals?.slice(0, 5);
		let contentProposal = [];

		if (limit5) {
			limit5.map(async (proposal) => {
				if (proposal) {
					const { externalUrl, owner_of } = proposal;
					const res = await axios.get(externalUrl);
					const text = res.data.text.toString();
					const title = res.data.title;
					contentProposal.push({ title, text, owner_of, externalUrl });
				}
			});
		}

		setProposalsContent(contentProposal);
	};

	useEffect(() => {
		if (proposals && !proposalsContent) {
			fetchProposalsContent();
		}
	}, [proposals, proposalsContent]);

	useEffect(() => {
		if (isInitialized && isAuthenticated) {
			fetchAllNfts();
		}
	}, [isAuthenticated, isInitialized, account]);

	const clickHandler = () => {
		navigate("/new-proposal");
	};

	return (
		<>
			<div>
				<div className="myProposalsHeader">Your Proposals</div>
				{proposalsContent && proposalsContent?.length > 0 ? (
					proposalsContent.map((proposal, i) => {
						const { title, text, owner_of, externalUrl } = proposal;
						return (
							<ProposalCard
								key={i}
								title={title}
								text={text}
								ownerOf={owner_of}
								externalUrl={externalUrl}
							/>
						);
					})
				) : (
					<div
						style={{
							fontSize: "30px",
							width: "100%",
							marginLeft: "40%",
						}}
					>
						<p>No Proposals Yet</p>
						<Button text="Create one" onClick={clickHandler} />
					</div>
				)}
			</div>
		</>
	);
};

export default MyProposals;
