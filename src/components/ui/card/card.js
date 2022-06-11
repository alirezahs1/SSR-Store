/**
 * Generic Card Component
 */

export const Card = ({className, children, ...rest}) => {
	return (
		<div className={`
				bg-white rounded-md px-6 py-5
				border border-gray-200
				${className}
			`}
			>
			{children}
		</div>
	)
}