import { useState, useEffect } from "react";
import "./HomeAuth.css";
import axios from "axios";
import ProposalCard from "./ProposalCard";
import { useMoralisWeb3Api } from "react-moralis";

const HomeAuth = () => {
	const [proposals, setProposals] = useState();
	const [proposalsContent, setProposalsContent] = useState();
	const Web3Api = useMoralisWeb3Api();

	const fetchAllNfts = async () => {
		const options = {
			chain: "rinkeby",
			address: "0x075aBA3E0F4AB4a457c47afd92b3dB74ecEeE428",
		};

		const rinkebyNFTs = await Web3Api.token.getNFTOwners(options);
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
		if (!proposals) {
			fetchAllNfts();
		}
	}, [proposals]);

	return (
		<div className="homeAuth_container">
			<div className="homeAuth_header">Recommended Proposals</div>
			<div className="homeAuth_proposals">
				{proposalsContent &&
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
					})}
			</div>
		</div>
	);
};

export default HomeAuth;
