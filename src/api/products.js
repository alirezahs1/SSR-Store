const data = require("./data.json")

export function fetchProducts({page=1, limit=20}={}) {
	return new Promise( (res, rej) => {
		try {
			res({
				...data,
				result: {
					...data.result,
					products: data.result.products.slice((page-1)*limit, page*limit),
					page_number: page,
					has_next: page*limit < data.result.products.length
				}
			});
		} catch {
			rej()
		}
	})
}