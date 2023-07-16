import React from 'react'
import { Head } from '@inertiajs/react'

import api from '@/Data/Api'

import { TEInput, TECollapse } from 'tw-elements-react'
import { Sidebar } from '@/Screens/Listings/Partials/Sidebar'
import { Listing } from '@/Screens/Listings/Partials/Listing'
import { Spinner } from '@/Components/Spinner'
import { Banner } from '@/Components/Banner'
import { Slider } from '@/Components/Slider'

const Index = () => {
	const [ show, setShow ] = React.useState(true)
	const [ loading, setLoading ] = React.useState(true)
	const [ listings, setListings ] = React.useState([])
	const [ searchResults, setSearchResults ] = React.useState(listings)
	const [ filterValues, setFilterValues ] = React.useState({
		min: 0,
		max: 0,
		bedrooms: [],
		bathrooms: [],
		storeys: [],
		garages: []
	})
	const [ conditions, setConditions ] = React.useState({})

	//fetch listings on load
	React.useEffect(() => {
		let endpoint = '/listings'
		let params = window.location.search || ''
		const loadListings = async () => {
			try {
				const response = await new Promise((resolve, reject) => {
					let response = api.get(endpoint + params)
					setTimeout(() => {
						//artificial delay
						resolve(response)
					}, 1000)
				})
				// using both listings and searchResults to avoid having to fetch data again when the user
				// clears the search field. listings is a global state, searchResults is a local state
				setListings(response.data)
				setSearchResults(response.data)
				setLoading(false) // hide spinner ("local" state)
				
				//get the unique values for the select options. these are for the select controls on the sidebar
				setFilterValues(prev => ({...prev, 'bedrooms': [...new Set(response.data.map(listing => listing.bedrooms).sort((a, b) => a - b))]}))
				setFilterValues(prev => ({...prev, 'bathrooms': [...new Set(response.data.map(listing => listing.bathrooms).sort((a, b) => a - b))]}))
				setFilterValues(prev => ({...prev, 'storeys': [...new Set(response.data.map(listing => listing.storeys).sort((a, b) => a - b))]}))
				setFilterValues(prev => ({...prev, 'garages': [...new Set(response.data.map(listing => listing.garages).sort((a, b) => a - b))]}))
				setFilterValues(prev => ({...prev, 'min': Math.min(...response.data.map(listing => listing.price))}))
				setFilterValues(prev => ({...prev, 'max': Math.max(...response.data.map(listing => listing.price))}))

				//return the collection data
				return response.data
			} catch (error) {
				console.log(error)
			}
		}
		loadListings()
	}, [])

	//handle text search on input change
	const handleTextSearch = (e) => {
		let { value } = e.target
		//if the search field is empty, reset the name property of the conditions object
		if (value.length === 0) {
			let oldConditions = conditions
			delete oldConditions.name
			setConditions(oldConditions)
			return
		}
		//we're not changing the dataset here, as we're just adjusting the search filters
		//the useEffect hook below listens for changes to the 'conditions' state and
		//all the magic happens there
		setConditions(prev => ({...prev, 'name': value}))
	}

	//handle select control change
	const handleSelectChange = (e) => {
		let { name, value } = e.target
		//if the value is empty, reset the relevant property of the conditions object
		if (value == "any" || value.length === 0) {
			let oldConditions = conditions
			delete oldConditions[name]
			setConditions(prev => ({...oldConditions}))
			return
		}
		//again, not chaining the dataset here, just adjusting the search filters
		//this took longer to figure out than I'd like to admit
		setConditions(prev => ({...prev, [name]: value}))
	}

	const handleSliderChange = (value) => {
		setConditions(prev => ({...prev, price_min: value[0], price_max: value[1]}))
	}

	const toggleSidebar = () => {
		setShow(!show)
	}

	//render the listing output
	const ListingsOutput = () => {
		if (searchResults.length > 0) {
			return (
				<div className="inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
					{ /* the actual results grid */}
					{searchResults.map((listing, index) => <Listing key={index} {...listing} />)}
				</div>
			)
		} else {
			return <Banner>Sorry, no listings found.</Banner>
		}
	}

	//the thing that actually updates the data thats displayed
	React.useEffect(() => {
		let newResults = listings.filter(listing => {
			return Object.keys(conditions).every((key) => {
				if(key === 'name') return listing.name.toLowerCase().includes(conditions[key].toLowerCase())
				if(key === 'bedrooms' && conditions[key] > 0) return listing.bedrooms == conditions[key]
				if(key === 'batchrooms' && conditions[key] > 0) return listing.batchrooms == conditions[key]
				if(key === 'storeys' && conditions[key] > 0) return listing.storeys == conditions[key]
				if(key === 'garages' && conditions[key] > 0) return listing.garages == conditions[key]
				if(key === 'price_min') return listing.price >= conditions[key]
				if(key === 'price_max') return listing.price <= conditions[key]
			})
		})
		setSearchResults(newResults)
	}, [conditions])

	//the actually output
	return (
		<>
			<Head title="Listings" />
			<div className="inner flex flex-col sm:flex-row w-full">
				<Sidebar className="w-full fixed z-20 sm:static sm:w-1/3 md:w-1/4 p-4 bg-slate-200" onToggleShow={toggleSidebar}>
					<TECollapse show={show} className="shadow-none">
						<div className="sidebar flex flex-col gap-4">
							<TEInput label="Search" placeholder="Search..." onChange={handleTextSearch} />
							<div className="flex flex-1 flex-col gap-4">
								<h5 className="text-lg font-medium leading-tight text-neutral-800">Bedrooms</h5>
								<select name="bedrooms" onChange={handleSelectChange}>
									<option value="any">Any</option>
									{filterValues.bedrooms.map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>
							</div>
							<div className="flex flex-1 flex-col gap-4">
								<h5 className="text-lg font-medium leading-tight text-neutral-800">Bathrooms</h5>
								<select name="bathrooms" onChange={handleSelectChange}>
									<option value="any">Any</option>
									{filterValues.bathrooms.map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>
							</div>
							<div className="flex flex-1 flex-col gap-4">
								<h5 className="text-lg font-medium leading-tight text-neutral-800">Storeys</h5>
								<select name="storeys" onChange={handleSelectChange}>
									<option value="any">Any</option>
									{filterValues.storeys.map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>
							</div>
							<div className="flex flex-1 flex-col gap-4">
								<h5 className="text-lg font-medium leading-tight text-neutral-800">Garages</h5>
								<select name="garages" onChange={handleSelectChange}>
									<option value="any">Any</option>
									{filterValues.garages.map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>
							</div>
							<Slider params={{min: filterValues.min, max: filterValues.max}} onSliderChange={handleSliderChange} />
						</div>
					</TECollapse>
				</Sidebar>
				<main role="main" className="w-full z-10 sm:w-2/3 md:w-3/4 bg-white min-h-screen">
					{loading ? <Spinner /> : <ListingsOutput />}
				</main>
			</div>
		</>
	)
}

export default Index