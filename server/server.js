const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

import { fetchProductsAPI } from '../src/api/products';
import App from '../src/App'

const PORT = 8080
const app = express()
const router = express.Router()

const serverRenderer = (req, res, context) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, rawHTML) => {
		
		if (err) {
			console.error(err)
			return res.status(500).send('Please wait while react project is being built. Try again in a few seconds.')
		}

		const html = ReactDOMServer.renderToString(
			<App location={req.url} context={context} />
		)

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


const HomeView = async (req, res) => {

	const data = await fetchProductsAPI(req.query);
	
	serverRenderer(req, res, data);
}
app.get('/', HomeView)

app.use(express.static('./build'))


const OtherView = async (req, res) => {
	serverRenderer(req, res);
}
app.get('*', OtherView)

app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
})