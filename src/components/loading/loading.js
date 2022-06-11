import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Loading = ({active, children}) => {
	return (
		<div className={`
			relative
		`}>
			<div className={`absolute z-30 inset-0 flex items-center justify-center bg-neutral-400 text-gray-600 ${active ? "opacity-50" : "pointer-events-none opacity-0"}`}>
				<FontAwesomeIcon className="w-4 h-4" icon={faSpinner} pulse />
			</div>
			{children}
		</div>
	)
}