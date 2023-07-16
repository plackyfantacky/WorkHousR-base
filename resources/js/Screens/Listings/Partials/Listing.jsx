import React from 'react'
import { Link } from '@inertiajs/react'

import ProgressiveImage from 'react-progressive-graceful-image'
import { Icon } from '@iconify/react'

const Listing = (data) => {
	//console.log(data)
	const spinner = (
		<div className="flex justify-center items-center rounded-t-xl animate-rainbow_bg h-48"><span>Reticulating splines...</span></div>
	)

	let price = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(data.price)

	return (
		<Link href={route('listings.view', data.id)} className="rounded-xl shadow-2xl flex flex-col justify-stretch">
			<ProgressiveImage src={data.image} placeholder="">
				{(src, loading) => {
					return loading ? spinner : <img src={src} alt="" className="rounded-t-xl w-full max-w-full h-48 object-cover" />
				}}
			</ProgressiveImage>
			<div className="flex flex-col gap-2 p-4 flex-1">
				<h5 className="flex-none text-xl font-medium leading-tight text-neutral-800">
					{data.name}
				</h5>
				<div className="grow-1 address min-h-16 flex-1">
					<p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{data.address}</p>
				</div>
				<div className="flex flex-col 2xl:flex-row gap-4 2xl:justify-between 2xl:items-center">
					<div className="stats flex gap-4">
						<div className="stat flex flex-col gap-2 items-center">
							<Icon icon="mdi:bed-empty" className="text-neutral-500" />
							<span className="text-base text-neutral-600 dark:text-neutral-200">{data.bedrooms}</span>
						</div>
						<div className="stat flex flex-col gap-2 items-center">
							<Icon icon="mdi:shower" className="text-neutral-500" />
							<span className="text-base text-neutral-600 dark:text-neutral-200">{data.bathrooms}</span>
						</div>
						<div className="stat flex flex-col gap-2 items-center">
							<Icon icon="mdi:home-city" className="text-neutral-500" />
							<span className="text-base text-neutral-600 dark:text-neutral-200">{data.storeys}</span>
						</div>
						<div className="stat flex flex-col gap-2 items-center">
							<Icon icon="mdi:car" className="text-neutral-500" />
							<span className="text-base text-neutral-600 dark:text-neutral-200">{data.garages}</span>
						</div>
					</div>
					<div className="price">
						<span className="text-3xl font-bold text-neutral-800">{price}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export { Listing }