<?php

namespace App\Http\Controllers;

use App\Models\Listings;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class ListingsController extends Controller
{

	public function getListings(Request $request)
	{
		$listings = Listings::query();
		if ($request->has('name')) {
			$listings->where('name', 'like', '%' . $request->input('name') . '%');
		}
		if ($request->has('price')) {
			// e.g price=200000 = at most 200000, price=200000,300000 = between 200000 and 300000
			$price = explode(',', $request->input('price'));
			if (count($price) == 1) {
				$listings->where('price', '<=', $price[0]);
			} else {
				$listings->whereBetween('price', [$price[0], $price[1]]);
			}
		}
		if ($request->has('bedrooms')) {
			// e.g bedrooms=3 = exactly 3, bedrooms=3,4 = 3 or 4
			$bedrooms = explode(',', $request->input('bedrooms'));
			$listings->whereIn('bedrooms', $bedrooms);
		}
		if ($request->has('bathrooms')) {
			// e.g bathrooms=3 = exactly 3, bathrooms=3,4 = 3 or 4
			$bathrooms = explode(',', $request->input('bathrooms'));
			$listings->whereIn('bathrooms', $bathrooms);
		}
		if ($request->has('storeys')) {
			// e.g storeys=3 = exactly 3, storeys=3,4 = 3 or 4
			$storeys = explode(',', $request->input('storeys'));
			$listings->whereIn('storeys', $storeys);
		}
		if ($request->has('garages')) {
			// e.g garages=3 = exactly 3, garages=3,4 = 3 or 4
			$garages = explode(',', $request->input('garages'));
			$listings->whereIn('garages', $garages);
		}

		//TODO: will come back and play with this later. looks interesting but is beyond scope.
		//$allListings = $listings->get();

		//$totalListings = $listings->count();
		//$listingsPerPage = 10;
		//$page = Paginator::resolveCurrentPage('page');

		//$allListings = new LengthAwarePaginator($allListings->forPage($page, $listingsPerPage), $totalListings, $listingsPerPage, $page, [
		//'path' => Paginator::resolveCurrentPath(),
		//'pageName' => 'page',
		//]);

		//return $allListings;

		return $listings->get();
	}

	public function getListing($id)
	{
		return Listings::find($id);
	}

	public function viewListing(Request $request, $id)
	{
		return Inertia::render('Listings/View', [
			'listing' => Listings::find($id)
		]);
	}

	public function getMinMaxAndDistinctValues()
	{
		return response()->json(['min_price' => Listings::min('price'),
		    'max_price' => Listings::max('price'),
		    'min_bedrooms' => Listings::min('bedrooms'),
		    'max_bedrooms' => Listings::max('bedrooms'),
		    'min_bathrooms' => Listings::min('bathrooms'),
		    'max_bathrooms' => Listings::max('bathrooms'),
		    'min_storeys' => Listings::min('storeys'),
		    'max_storeys' => Listings::max('storeys'),
		    'min_garages' => Listings::min('garages'),
		    'max_garages' => Listings::max('garages'),
			//remember kids, order of operations matters. (yes, there is a story here).
			'distinct_bedrooms' => Listings::distinct()->orderBy('bedrooms', 'asc')->pluck('bedrooms'),
			'distinct_bathrooms' => Listings::distinct()->orderBy('bathrooms', 'asc')->pluck('bathrooms'),
			'distinct_storeys' => Listings::distinct()->orderBy('storeys', 'asc')->pluck('storeys'),
			'distinct_garages' => Listings::distinct()->orderBy('garages', 'asc')->pluck('garages')
		]);
	}
}
