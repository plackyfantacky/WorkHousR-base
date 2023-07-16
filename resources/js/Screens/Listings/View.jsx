import React from 'react'
import { Head, usePage } from '@inertiajs/react'

import { SidebarSingle } from '@/Screens/Listings/Partials/SidebarSingle'
import ProgressiveImage from 'react-progressive-graceful-image'
import { Icon } from '@iconify/react'


const View = () => {
	const { listing } = usePage().props
	console.log(listing)

	const spinner = (
		<div className="flex justify-center items-center rounded-t-xl animate-rainbow_bg h-96"><span>Reticulating splines...</span></div>
	)

	let price = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(listing.price)

	return (
		<>
			<Head title="Listings" />
			<div className="inner flex flex-row w-full">
				<SidebarSingle className="w-full sm:w-1/3 md:w-1/4 p-4" />
				<main role="main" className="w-fullsm:w-2/3 md:w-3/4 bg-white min-h-screen">
					<ProgressiveImage src={listing.image} placeholder="">
						{(src, loading) => {
							return loading ? spinner : <img src={src} alt="" className="w-full max-w-full h-96 object-cover" />
						}}
					</ProgressiveImage>
					<div className="content flex flex-col md:flex-row gap-8 justify-between p-8">
						<header className="flex flex-col gap-4">
							<h1 className="text-4xl font-bold text-neutral-800">{listing.name}</h1>
							<span className="text-lg text-neutral-600 dark:text-neutral-200">{listing.address}</span>
						</header>
						<div className="details flex flex-col gap-4">
							<h1 className="text-4xl text-left md:text-right font-bold text-neutral-800">{price}</h1>
							<div className="stats flex gap-4">
								<div className="stat flex flex-col gap-4 items-center">
									<Icon icon="mdi:bed-empty" className="text-neutral-700 w-8 h-8" />
									<span className="text-lg text-neutral-600 dark:text-neutral-200">{listing.bedrooms}</span>
								</div>
								<div className="stat flex flex-col gap-4 items-center">
									<Icon icon="mdi:shower" className="text-neutral-700 w-8 h-8" />
									<span className="text-lg text-neutral-600 dark:text-neutral-200">{listing.bathrooms}</span>
								</div>
								<div className="stat flex flex-col gap-4 items-center">
									<Icon icon="mdi:home-city" className="text-neutral-700 w-8 h-8" />
									<span className="text-lg text-neutral-600 dark:text-neutral-200">{listing.storeys}</span>
								</div>
								<div className="stat flex flex-col gap-4 items-center">
									<Icon icon="mdi:car" className="text-neutral-700 w-8 h-8" />
									<span className="text-lg text-neutral-600 dark:text-neutral-200">{listing.garages}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="description pt-0 p-8 flex flex-col gap-8">
						<h2 className="text-2xl font-bold text-neutral-800">Description</h2>
						<p className="text-lg text-neutral-600 dark:text-neutral-200">Proin finibus nulla nec ornare venenatis. Cras eget ipsum in 
							elit tristique eleifend. Nunc congue mauris sed laoreet cursus. Ut id gravida nisi, et dapibus enim. Etiam nec hendrerit
							turpis. Quisque maximus fermentum lacus nec rutrum. Curabitur euismod nisi dui.</p>
						<p className="text-lg text-neutral-600 dark:text-neutral-200">
							Nunc eleifend, diam non elementum rutrum, purus lectus laoreet lorem, ut iaculis diam urna ac massa. Mauris in aliquam 
							neque, at mollis magna. Nunc massa nisi, semper eu venenatis sit amet, posuere id justo. Cras dignissim ut metus vitae 
							luctus. Fusce nec mattis sapien. Proin nec tellus eget odio accumsan accumsan.</p>
					</div>
				</main>
			</div>
		</>
	)
}

export default View