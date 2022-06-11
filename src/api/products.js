const data = require("./data.json")

export function fetchProductsAPI({page=1, limit=20, ordering="most-sold", category=""}) {

	console.log(`fetching products page ${page} limit ${limit} ordering ${ordering} category ${category}`);

	return new Promise( (res, rej) => {
		try {
			setTimeout(() => {

				let products = data.result.products;

				/**
				 * Sort products by `ordering` field
				 */
				switch (ordering) {
					case 'newest':
						products.sort(
							(a, b) => new Date(b.created_at) - new Date(a.created_at)
						)
						break;
					case 'oldest':
						products.sort(
							(a, b) => new Date(a.created_at) - new Date(b.created_at)
						)
						break;
					// case 'most-sold':
					// 	products.sort(
					// 		(a, b) => b.sold_count - a.sold_count
					// 	)
					// 	break;
					default:
						break;
				}

				/** Filter products by `category` field */
				if (category) {
					products = products.filter(
						(product) => 
							product.product_categories
									.map(cat => cat.id)
									.includes(parseInt(category))
					)
				}

				console.log("products length", products.length, page*limit < products.length);

				res({
					...data,
					result: {
						...data.result,
						products: products.slice((page-1)*limit, page*limit),
						categories: extractProductsCategories(data.result.products),
						page_number: parseInt(page),
						has_next: page*limit < products.length
					}
				});
			}, 1000);
		} catch {
			rej()
		}
	})
}


function extractProductsCategories(products) {
	let categories = [];
	products.forEach(product => {
		product.product_categories.forEach(category => {
			if (!categories.find(cat => JSON.stringify(cat) === JSON.stringify(category))) {
				categories.push(category)
			}
		})
	});

	return categories;

}