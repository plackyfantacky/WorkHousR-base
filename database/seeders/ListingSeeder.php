<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;
use App\Models\Listings;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        LazyCollection::make(function () {  
            ini_set('auto_detect_line_endings', TRUE); //because mac is special
            $file = fopen(public_path('property-data.csv'), 'r');
            while (($line = fgets($file)) !== false) { yield $line; }
            fclose($file);
            ini_set('auto_detect_line_endings', FALSE); //because mac is special
        })
        ->skip(1)
        ->chunk(1000)
        ->each(function (LazyCollection $chunk) {
            $data = $chunk->map(function ($line) {
                $data = preg_split("/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/", $line);
                $fmt = new \NumberFormatter('en_AU', \NumberFormatter::CURRENCY);         
                $price = $fmt->parseCurrency(str_replace('"','',$data[1]), $currency);
                //i see you hiding there, line 23, you sneaky bugger
                if (intl_is_failure($fmt->getErrorCode())) {
                    //this is not ideal. I'd like it if there was an intl way of doing this.
                    //what if we were dealing with say Thai Baht?
                    //with more time, I could probably find a descent solution
                    $price_raw = preg_replace(array('/\$/', '/\"/'), "", $data[1]);
                    $digit_groups = explode(',',$price_raw);
                    array_walk($digit_groups, function(&$val, $key) {
                        if (strlen($val) !== 3) { $val = str_pad($val, 3, "0", STR_PAD_RIGHT); return $val; }
                    });
                    //lets try it again
                    $price = $fmt->parseCurrency('$'.implode(',', $digit_groups), $currency);
                }
                
                $listing = array(
                    'name' => $data[0],
                    'price' => intval($price),
                    'bedrooms' => intval($data[2]),
                    'bathrooms' => intval($data[3]),
                    'storeys' => intval($data[4]),
                    'garages' => intval($data[5]),
                    'image' => $data[6]
                );

                Listings::create($listing);

                return $listing;
            });
            $listing = $data->jsonSerialize();
        });
    }
}
