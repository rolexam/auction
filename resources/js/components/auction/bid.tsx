import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lot, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/components/ui/toast-provider';

import axios from 'axios';

type BidComponentProps = {
    lot: Lot;
    now: Date;
};

export default function BidComponent({ lot, now }: BidComponentProps) {
    const { auth } = usePage<SharedData>().props;
    const { addToast } = useToast();

    const minBid = lot.current_price + lot.increment;
    const [bidAmount, setBidAmount] = useState(minBid);

    useEffect(() => {
        setBidAmount(minBid);
    }, [minBid]);

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value);
        setBidAmount(value);
        // setBidAmount(value < minBid ? minBid : value);
    };

    const handlePlaceBid = () => {
        axios.post(`/lots/${lot.id}/bid`, { bid: bidAmount })
            .then(response => {
                console.log('Bid placed successfully', response.data);
                // Здесь можно обновить состояние, если требуется
            })
            .catch(err => {
                console.error('Error placing bid', err);
                const errorMsg =
                    err.response && err.response.data && err.response.data.error
                        ? err.response.data.error
                        : 'Произошла ошибка при размещении ставки.';
                addToast(errorMsg);
            });
        // Inertia.post(`/lots/${lot.id}/bid`, { bid: bidAmount });
        console.log(`Placing bid of ${bidAmount} on lot ${lot.id}`);
    };

    return (
        <>
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
        </>
    );
}
