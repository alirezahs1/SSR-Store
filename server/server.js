const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

import { fetchProducts } from '../src/api/products';
import App from '../src/App'

const PORT = 8080
const app = express()
const router = express.Router()

const serverRenderer = (req, res, context) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, rawHTML) => {
		
		if (err) {
			console.error(err)
			return res.status(500).send('An error occurred')
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
		)
	})
}


const HomeView = async (req, res) => {

	const data = await fetchProducts();
	
	serverRenderer(req, res, data);
}

app.get('/', HomeView)


app.use(express.static('./build'))

app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
})