<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuctionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('auctions')->insert([
            'title' => 'Simon\'s First Auction',
            'start_date' => now(),
            'end_date' => now()->endOfDay(),
        ]);
    }
}
