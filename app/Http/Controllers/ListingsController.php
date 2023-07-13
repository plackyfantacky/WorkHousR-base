<?php

namespace App\Http\Controllers;

use App\Models\Listings;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class ListingsController extends Controller
{
    
    public function getListings(Request $request)
    {
        $listings = Listings::query();
        if ($request->has('name')) {
            $listings->where('name', 'like', '%'.$request->input('name').'%');
        }
        if ($request->has('price')) {
            $listings->where('price', $request->input('price'));
        }
        if ($request->has('bedrooms')) {
            $listings->where('bedrooms', $request->input('bedrooms'));
        }
        if ($request->has('bathrooms')) {
            $listings->where('bathrooms', $request->input('bathrooms'));
        }
        if ($request->has('storeys')) {
            $listings->where('storeys', $request->input('storeys'));
        }
        if ($request->has('garages')) {
            $listings->where('garages', $request->input('garages'));
        }

        $allListings = $listings->get();
        
        $totalListings = $listings->count();
        $listingsPerPage = 10;
        $page = Paginator::resolveCurrentPage('page');
        
        $allListings = new LengthAwarePaginator($allListings->forPage($page, $listingsPerPage), $totalListings, $listingsPerPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => 'page',
        ]);

        return $allListings;
        //return $listings->get();
    }

    public function viewListing($id)
    {
        return Listings::find($id);
    }
}
