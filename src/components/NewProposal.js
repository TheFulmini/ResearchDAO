import { useState } from "react";
import "./NewProposal.css";
import {
	useMoralisFile,
	useMoralis,
	useWeb3ExecuteFunction,
} from "react-moralis";

const NewProposal = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const { saveFile } = useMoralisFile();
	const { Moralis, account } = useMoralis();
	const contractProcessor = useWeb3ExecuteFunction();

	const mint = async (account, uri) => {
		let options = {
			contractAddress: "0x075aBA3E0F4AB4a457c47afd92b3dB74ecEeE428",
			functionName: "safeMint",
			abi: [
				{
					inputs: [
						{ internalType: "address", name: "to", type: "address" },
						{ internalType: "string", name: "uri", type: "string" },
					],
					name: "safeMint",
					outputs: [],
					stateMutability: "payable",
					type: "function",
				},
			],
			params: {
				to: account,
				uri: uri,
			},
			msgValue: Moralis.Units.ETH(1),
		};

		await contractProcessor.fetch({
			params: options,
			onSuccess: () => {
				alert("Succesful Mint");
				setText("");
				setTitle("");
			},
			onError: (error) => {
				alert(error);
			},
		});
	};

	const uploadFile = async (event) => {
		event.preventDefault();
		const textArray = text.split();
		const metadata = {
			title,
			text: textArray,
		};

		try {
			const file = { base64: btoa(JSON.stringify(metadata)) };
			const result = await saveFile("myproposal.json", file, {
				saveIPFS: true,
				throwOnError: true,
				useMasterKey: true,
			});
			const nftResult = await uploadNftMetada(result.ipfs());

			alert(nftResult.ipfs());
			await mint(account, nftResult.ipfs());
		} catch (error) {
			alert(error);
		}
	};

	const uploadNftMetada = async (url) => {
		const metadataNft = {
			image:
				"https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg",
			description: title,
			externalUrl: url,
		};
		const file = { base64: btoa(JSON.stringify(metadataNft)) };
		const resultNft = await saveFile("metadata.json", file, {
			saveIPFS: true,
			throwOnError: true,
		});
		return resultNft;
	};

	return (
		<>
			<div>
				<form onSubmit={uploadFile} className="writeForm">
					<div className="writeFormGroup">
						<input
							className="writeInput"
							placeholder="Title"
							type="text"
							autoFocus={true}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="writeFormGroup">
						<textarea
							className="writeInput writeText"
							placeholder="Present your new proposal..."
							autoFocus={true}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
					<button className="writeSubmit" type="submit">
						Publish
					</button>
				</form>
			</div>
		</>
	);
};

export default NewProposal;
