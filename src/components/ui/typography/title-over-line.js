/**
 * Just a title over a line
 */

export const TitleOverLine = ({className, children, component="h1", ...rest}) => {

	const Tag = component;
	
	return (
		<Tag 
			className={`
				relative
				overflow-hidden
				text-center
				md:text-xl font-semibold
				mb-8
				text-slate-800
			`}
			>
				<span className={`
						relative

						before:absolute before:content-[""]
						before:top-1/2 before:translate-x-4 before:-translate-y-1/2
						before:left-full before:w-20 before:h-[1px]
						before:bg-gray-300

						after:absolute after:content-[""]
						after:top-1/2 after:-translate-x-4 after:-translate-y-1/2
						after:right-full after:w-20 after:h-[1px]
						after:bg-gray-300
					`}
					>
					{children}
				</span>
		</Tag>
	)
}