import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Researchers from "./Researchers";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/researchers" element={<Researchers />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
