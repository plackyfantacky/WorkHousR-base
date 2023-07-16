import React from 'react'

const Banner = (props) => {
	let { className, children } = props
	return (
		<div className={["m-4 rounded-lg bg-info-100 px-6 py-5 text-base text-info-800", className].join(" ")} role="alert">
			{children}
		</div>
	)
}

export { Banner }