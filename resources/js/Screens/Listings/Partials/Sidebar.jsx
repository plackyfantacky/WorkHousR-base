import React from 'react'

import { Logo } from '@/Components/Logo'
import { Icon } from '@iconify/react'

const Sidebar = ({className, onToggleShow, children }) => {
	
	const handleClick = () => {
		onToggleShow()
	}

	return (
		<aside className={[className, "flex flex-col gap-4"].join(' ')}>
			<div className="text-green-800 ml-[-1rem] flex justify-between items-center">
				<Logo width="200" height="80" />
				<button className="inline-block md:hidden rounded bg-green-800 mr-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white" onClick={handleClick}>
					<Icon icon="mdi:filter" className="w-6 h-6" />
				</button>
			</div>
			{children}
		</aside>
	)
}

export { Sidebar }