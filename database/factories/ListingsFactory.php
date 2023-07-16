<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Provider\en_AU\Address;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listings>
 */
class ListingsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $au_faker = \Faker\Factory::create('en_AU');
        return [
            'name' => 'The ' . $this->faker->lastName(),
            'address' => $au_faker->address(),
            'price' => $this->faker->numberBetween(100000, 1000000),
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'storeys' => $this->faker->numberBetween(1, 2),
            'garages' => $this->faker->numberBetween(1, 2),
            'image' => $this->faker->imageUrl(640, 480, 'house', true),
        ];
    }
}
