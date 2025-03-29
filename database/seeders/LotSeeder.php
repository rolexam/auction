<?php

namespace Database\Seeders;

use App\Models\Auction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $auction = Auction::query()->first();

        $lots = [
            [
                'order' => 1,
                'starting_price' => 100,
                'increment' => 10,
                'title' => 'All Apologies',
                'photo' => '1.png',
                'end_date' => now()->hour(22)->minute(0)->second(0),
            ],
            [
                'order' => 2,
                'starting_price' => 1000,
                'increment' => 50,
                'title' => 'Summer Garden IX',
                'photo' => '2.png',
                'end_date' => now()->hour(22)->minute(1)->second(0),
            ],
            [
                'order' => 3,
                'starting_price' => 50000,
                'increment' => 150,
                'title' => 'SUNSET BLVD',
                'photo' => '3.png',
                'end_date' => now()->hour(22)->minute(2)->second(0),
            ],
            [
                'order' => 4,
                'starting_price' => 96000,
                'increment' => 1000,
                'title' => 'End of watch',
                'photo' => '4.png',
                'end_date' => now()->hour(22)->minute(3)->second(0),
            ],
            [
                'order' => 5,
                'starting_price' => 46000,
                'increment' => 50,
                'title' => 'Radiant Swimmer',
                'photo' => '5.png',
                'end_date' => now()->hour(22)->minute(4)->second(0),
            ],
        ];

        $auction->lots()->createMany($lots);
    }
}
