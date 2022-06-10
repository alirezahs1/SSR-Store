import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./routes";

import './assets/styles/globals.css';
import { SSRContext } from "./contexts/ssr-context";

function App({ location, context }) {
	
	return (
		<SSRContext.Provider value={context}>
			{location ? ( 
				<StaticRouter location={location}>
					<AppRoutes />
				</StaticRouter>
			) : (
				<BrowserRouter location={location}>
					<AppRoutes />
				</BrowserRouter>
			)}
		</SSRContext.Provider>
	);
}

export default App;
