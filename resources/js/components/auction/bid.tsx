import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lot, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

type BidComponentProps = {
    lot: Lot;
    now: Date;
};

export default function BidComponent({ lot, now }: BidComponentProps) {
    const { auth } = usePage<SharedData>().props;

    const minBid = lot.starting_price + lot.increment;
    const [bidAmount, setBidAmount] = useState(minBid);

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value);
        setBidAmount(value < minBid ? minBid : value);
    };

    const handlePlaceBid = () => {
        console.log(`Placing bid of ${bidAmount} on lot ${lot.id}`);
    };

    return (
        <div className="mt-2 flex items-center space-x-2">
            <input
                type="number"
                value={bidAmount}
                min={minBid}
                onChange={handleBidChange}
                className="border rounded px-2 py-1 w-24"
            />
            <Button
                disabled={auth.user === null || new Date(lot.end_date) <= now}
                variant="default"
                onClick={handlePlaceBid}
                className="cursor-pointer" // если необходимо явно указать курсор
            >
                Place Bid
            </Button>
        </div>
    );
}
