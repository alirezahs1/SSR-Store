/**
 * Loading icon+caption for the InfiniteScroll component
 */

import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const InfiniteScrollLoader = () => {
	return (
		<div className="py-6 text-sm text-gray-600 flex items-center justify-center">
			<FontAwesomeIcon className="w-4 h-4" icon={faSpinner} pulse />
			<span className="inline-block mr-2">
				درحال بارگزاری
			</span>
		</div>
	)
}