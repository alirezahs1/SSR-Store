/**
 * Dropdown component
 */

import { forwardRef, useState, useEffect, useMemo, useRef } from 'react';

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DropDown = forwardRef(({className, options, defaultValue, placeholder, onChange, ...rest}, ref) => {

	
	/** 
	 * The variable `value` always keeps current selected option value
	 */
	const [value, setValue] = useState(defaultValue);

	/** 
	 * The variable `isOpen` keeps the state of showing the dropdown list 
	 */
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * refrenses to main dropdown element
	 */
	const wrapperRef = useRef();

	/**
	 * updates the `value` if `defaultValue` property changes
	 */
	useEffect(() => {
		setValue(defaultValue);
		if (ref?.current) {
			ref.current.value = defaultValue;
		}
	}
	, [defaultValue]);

	/**
	 * 
	 */
	useEffect(() => {

		const closeListListener = (e) => {
			if (!wrapperRef.current?.contains(e.target)){
				setIsOpen(false);
			}
		}

		if (wrapperRef?.current) {
			window.addEventListener('click', closeListListener);
		}

		return () => {
			window.removeEventListener('click', closeListListener);
		}

	}, []);

	const toggleIsOpen = () => {
		setIsOpen(isOpen => !isOpen);
	}

	const handleChange = (option) => {
		setValue(option.value);
		if (onChange) {
			onChange(option.value);
		}
	}

	const defaultOptionLabel = useMemo(() => {
		return options?.find(option => option.value === value)?.label || placeholder || "انتخاب کنید";
	}, [options, value, placeholder])

	/**
	 * Rendering the UI
	 * The `Breadcrumb.Item` component is used to render the items inside the breadcrumbs.
	 */

	return (
		<>
			<input type="hidden" ref={ref} />
			<div 
				className={`
					relative 
					cursor-pointer
					px-5 py-4
					pl-8
					border rounded-md border-gray-300
					text-gray-600
					transition-colors duration-200
					text-sm
					hover:border-gray-400
					${className}
				`}
				ref={wrapperRef}
				onClick={toggleIsOpen}
				>
					{/** Angles Icon */}
					<div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col justify-center">
						<FontAwesomeIcon className={`w-4 h-4 transition-all duration-300 ${isOpen ? "-scale-y-100" : ""}`} icon={faAngleDown} />
					</div>

					{/** Selected Label or Placeholder */}
					<span className="select-none overflow-hidden text-ellipsis whitespace-nowrap max-w-full inline-block align-middle">
						{defaultOptionLabel}
					</span>
					
					{/** Dropdown options */}
					<div className={`
							absolute right-0 top-full
							min-w-full
							bg-white rounded-md shadow-md
							transition-all duration-200
							max-h-60 overflow-auto
							sweetscroll
							z-50
							origin-top
							${isOpen ? 
								"opacity-100 pointer-events-auto scale-100 translate-y-3"
									: 
								"opacity-0 pointer-events-none scale-95 translate-y-3"
							}
						`}
						>
							<div className="py-1">
								{options?.map(option => (
									<div 
										key={option.value} 
										className={`
											flex items-center 
											px-3 py-3 
											whitespace-nowrap
											${option.value === value ? 
												"text-green-500" 
													: 
												"hover:text-blue-500"
											}
										`}
										onClick={() => handleChange(option)}
										>
											<span className="ml-2">{option.label}</span>
									</div>
								))}
							</div>
					</div>
			</div>
		</>
	)

})

DropDown.displayName = 'DropDown'