/**
 * Shows a single product information
 */

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { numberWithCommas } from "../../utils/numbers"

export const ProductCard = ({ className, title, price, image, ...rest }) => {
	/**
	 * @param {number} price - The price of the product
	 * @param {string} className - The class name of the component
	 * @param {string} image - The image of the product
	 */
	return (
		<div className={`
				bg-white rounded-md overflow-hidden
				border border-gray-200
				cursor-pointer
				group
				max-w-sm w-full mx-auto
				${className || ''}
			`}
			>

			{/** Image */}
			<div className="relative bg-gray-50 h-64 overflow-hidden">
				{image && (
					<img src={image} alt={title} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-200" />
				)}

				{/** Add to cart button */}
				<span className="absolute left-3 top-3 rounded-full w-10 h-6 flex items-center justify-center z-10 bg-indigo-500 text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100">
					<FontAwesomeIcon className="w-3 h-3" icon={faPlus} />
				</span>
			</div>
			<div className="p-4 text-center">

				{/** Title */}
				<h5 className="mb-3">
					{title}
				</h5>

				{/** Price */}
				<div className="text-sm text-gray-500 font-bold">
					{price && `${numberWithCommas(price)} تومان`}
				</div>
			</div>
		</div>
	)
}