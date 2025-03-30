<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lot extends Model
{

    protected $guarded = [];
    protected $appends = ['current_price'];

    public function auction(): BelongsTo
    {
        return $this->belongsTo(Auction::class);
    }

    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }

    protected function casts()
    {
        return [
            'end_date' => 'datetime',
        ];
    }

    protected function currentPrice(): Attribute
    {
        return new Attribute(
            get: fn () => $this->calculateCurrentPrice(),
        );
    }

    protected function calculateCurrentPrice(): float
    {
        $currentBid = $this->bids()->latest()->first();
        return $currentBid ? $currentBid->price : $this->starting_price;
    }
}
