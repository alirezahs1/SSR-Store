const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

import { fetchProductsAPI } from '../src/api/products';
import App from '../src/App'

const PORT = 8080
const app = express()

/**
 * Render the app to a string
 * also pass the data to the app
 * @param {object} req
 * @param {object} res
 * @param {object} context
 */
const serverRenderer = (req, res, context) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, rawHTML) => {
		
		/** If `/build/index.html` is not accessible - Probably still building */
		if (err) {
			console.error(err)
			return res.status(500).send('Please wait while react project is being built. Try again in a few seconds.')
		}

		/** Renders App to string - add context and current url */
		const html = ReactDOMServer.renderToString(
			<App location={req.url} context={context} />
		)

		/**
		 * Replace the `<div id="root"></div>` with the rendered app
		 * and send the response to the client.
		 * Also add the __INITIAL_DATA__ to load in the client side.
		 */
		return res.send(
			rawHTML
				.replace(
					'<div id="root"></div>',
					`<div id="root">${html}</div>`
				)
				.replace(
					'</body>',
					`<script>window.__INITIAL_DATA__ = ${JSON.stringify(context)}</script></body>`
				)
		)
	})
}


/**
 * Home Page View
 */
const HomeView = async (req, res) => {

	const data = await fetchProductsAPI(req.query);
	
	serverRenderer(req, res, data);
}
app.get('/', HomeView)

/**
 * Add static assets to the server
 */
app.use(express.static('./build'))

/**
 * Serve other routes
 */
const OtherView = async (req, res) => {
	serverRenderer(req, res);
}
app.get('*', OtherView)

/**
 * Start the server
 */
app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
})