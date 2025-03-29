import { Lot, type SharedData } from '@/types';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

export default function BidComponent({ lot }: {lot: Lot}) {
    const { auth } = usePage<SharedData>().props;

    const minBid = lot.starting_price + lot.increment;
    const [bidAmount, setBidAmount] = useState(minBid);
    const [now, setNow] = useState(new Date());

    // Это такой хак, чтобы компонент обновлялся
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setBidAmount(value < minBid ? minBid : value);
    };

    const handlePlaceBid = () => {
        // Здесь можно реализовать логику размещения ставки (например, вызов API или Inertia.post)
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
            <Button disabled={auth.user === null || lot.end_date <= now} variant="default" onClick={handlePlaceBid}>
                Place Bid
            </Button>
        </div>
    );
}
