/**
 * Generic Label Component
 */

export const Label = ({ className, children, ...rest }) => (
	<label className={`
			inline-block
			text-sm
			text-gray-700
			${className}
		`}
		{...rest}
	>
		{children}
	</label>
)