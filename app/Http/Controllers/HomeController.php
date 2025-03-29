<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\Lot;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('home', [
            'auctions' => Auction::query()->with(['lots'])->get(),
        ]);
    }

}
