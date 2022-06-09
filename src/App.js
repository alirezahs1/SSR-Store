import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./routes";

import './assets/styles/globals.css';

function App({ location }) {
	return (
		<>
			{location ? (
				<StaticRouter location={location}>
					<AppRoutes />
				</StaticRouter>
			) : (
				<BrowserRouter location={location}>
					<AppRoutes />
				</BrowserRouter>
			)}
		</>
	);
}

export default App;
