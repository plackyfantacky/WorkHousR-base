<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listings extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'bedrooms', 'bathrooms', 'storeys', 'garages', 'image'];
}
