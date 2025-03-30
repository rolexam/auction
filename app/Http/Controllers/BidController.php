<?php

namespace App\Http\Controllers;

use App\Events\BidPlaced;
use App\Http\Requests\PlaceBidRequest;
use App\Models\Bid;
use App\Models\Lot;
use Illuminate\Http\Request;

class BidController extends Controller
{

    public function placeBid(PlaceBidRequest $request, Lot $lot)
    {
        $currentBid = $lot->current_price;

        $minBid = $currentBid + $lot->increment;
        $newBid = $request->get('bid');

        if ($newBid < $minBid) {
            return response()->json(['error' => "Bid must be at least {$minBid}"], 422);
//            return redirect()->back()->withErrors(['msg' => "Bid must be at least {$minBid}"]);
        }

        $lot->bids()->create([
            'user_id' => auth()->id(),
            'price' => $newBid,
        ]);

        broadcast(new BidPlaced($lot))->toOthers();

        return response()->json(['success' => true, 'lot' => $lot], 201);
//        return redirect()->back()->with(['success' => true, 'lot' => $lot]);
    }

}
