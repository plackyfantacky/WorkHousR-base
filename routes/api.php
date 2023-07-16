<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * Listings
 * 
 * GET /api/v1/listings
 * GET /api/v1/listings/{id?}
 * GET /api/v1/listings?
 * - name
 * - price
 * - bedrooms
 * - bathrooms
 * - storeys
 * - garages
 * 
 * and with LengthAwarePaginator...
 *
 * - page 
 */

Route::get('/v1/listings', [ListingsController::class, 'getListings']);
Route::get('/v1/listings/{id}', [ListingsController::class,  'getListing'])->where('id', '[0-9]+');
Route::get('/v1/listings/values', [ListingsController::class, 'getMinMaxAndDistinctValues']);