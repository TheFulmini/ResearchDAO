import "./Sidebar.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
	return (
		<>
			<div className="siderContent">
				<div className="menu">
					<Link to="/" className="link">
						<div className="menuItems">
							<HomeIcon />
						</div>
					</Link>
					<Link to="/my-proposals" className="link">
						<div className="menuItems">
							<BookIcon />
						</div>
					</Link>
					<Link to="/new-proposal" className="link">
						<div className="menuItems">
							<RateReviewIcon />
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
