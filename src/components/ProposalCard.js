import "./ProposalCard.css";
import { useNavigate } from "react-router-dom";

const ProposalCard = ({ text, title, ownerOf, externalUrl }) => {
	const length = 100;
	const trimmedString = text.length > 100 ? text.substring(0, length) : text;

	const account = `${ownerOf.slice(0, 4)}...${ownerOf.slice(38)}`;

	const navigate = useNavigate();

	const clickHandler = () => {
		const lastSegment = externalUrl.split("/").pop();
		navigate(`/proposal/${lastSegment}`);
	};

	return (
		<div className="proposal" onClick={clickHandler}>
			<div className="proposal_leftSide">
				<div className="author">
					<span className="author_name">{account}</span>
					<span className="proposal_date">Mar 21</span>
				</div>
				<div className="proposal_title">
					<h3>{title}</h3>
				</div>
				<div className="proposal_content">
					<p>{trimmedString}...</p>
				</div>
			</div>
			<div className="proposal_rightSide">
				<div>
					<img
						className="proposal_image"
						src="https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?w=2000&ssl=1"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default ProposalCard;
