import React, { useState } from "react";
import App from "./App";

// const Researchers = () => {
// 	const [fname, setFname] = useState("");

// 	const handleChange = (e) => {
// 		setFname(e.target.value);
// 	};

// 	return (
// 		<div>
// 			<App />
// 			{/* <form onSubmit={this.doSomething()}> */}
// 			<form
// 				onSubmit={(e) => {
// 					alert(e.target.value);
// 					e.preventDefault();
// 				}}
// 			>
// 				<label>
// 					Proposal: <input type="text" value={fname} onChange={handleChange} />
// 					<button>Click me</button>
// 				</label>
// 			</form>
// 		</div>
// 	);
// };

const Researchers = () => {
	return (
		<div>
			<App />
	</div>
	);
};

export default Researchers;
