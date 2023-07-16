<?php

use App\Http\Controllers\ListingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Listings/Index');
})->name('listings.index');

//this is my preferred method pulling in the listing data
Route::get('/{id}', [ListingsController::class, 'viewListing'])->name('listings.view');
