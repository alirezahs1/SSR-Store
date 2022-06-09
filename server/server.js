const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

import { StaticRouter } from "react-router-dom/server";
import App from '../src/App'

const PORT = 8080
const app = express()
const router = express.Router()

const serverRenderer = (req, res, next) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			return res.status(500).send('An error occurred')
		}
		console.log("serverRenderer", req.url)
		let html = ReactDOMServer.renderToString(<App location={req.url} />);
		return res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${html}</div>`
			)
		)
	})
}

router.use(
	express.static(path.resolve(__dirname, '..', 'build'))
)

app.use(router)

router.get('*', serverRenderer)

app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
})