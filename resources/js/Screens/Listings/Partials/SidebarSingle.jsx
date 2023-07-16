import React from 'react'
import { Link } from '@inertiajs/react'
import { Logo } from '@/Components/Logo'

const SidebarSingle = (props) => {
	let { className } = props
	return (
		<aside className={[className, "flex flex-col gap-4"].join(' ')}>
			<div className="text-red-500 ml-[-1rem]">
				<Logo width="200" height="80" />
			</div>
			<Link href={route('listings.index')}>&larr; Back to Listings</Link>
		</aside>
	)
}

export { SidebarSingle }