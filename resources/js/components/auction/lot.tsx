import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Lot, SharedData } from '@/types';
import Countdown from '@/components/auction/countdown';
import BidComponent from '@/components/auction/bid';
import echo from '@/echo';
import { usePage } from '@inertiajs/react';


export default function LotComponent({ lot }: {lot: Lot}) {
    const { auth } = usePage<SharedData>().props;

    // Состояние для текущего времени, обновляемое каждую секунду
    const [now, setNow] = useState(new Date());
    const [lotData, setLotData] = useState<Lot>(lot);
    const [flash, setFlash] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const channel = echo.channel(`lot.${lotData.id}`);
        channel.listen('BidPlaced', (event: { lot: Lot }) => {
            console.log(event)
            if (event.lot.id === lotData.id) {
                setLotData(event.lot);
                setFlash(true);
                setTimeout(() => setFlash(false), 1000); // эффект длится 1 секунду
            }
        });

        return () => {
            echo.leaveChannel(`lot.${lotData.id}`);
        };
    }, [lotData.id]);


    return (
        <Card key={lotData.id} className={`p-4 transition-all duration-500 ${flash ? 'ring-4 ring-green-500 dark:ring-green-400' : ''}`}>
            <img src={`/images/lots/${lotData.photo}`} alt={lotData.title} className="mb-2 w-full rounded-md object-cover" />
            <h3 className="text-lg font-semibold">{lotData.title}</h3>
            <p className="text-base">
                Current Bid: ${lotData.current_price}
                { auth.user && lotData.last_bid && auth.user.id === lotData.last_bid.user_id
                    && (<span className="ml-2 inline-block rounded bg-green-500 px-2 py-1 text-xs font-bold text-white dark:bg-green-400">You</span>)
                }
            </p>
            <p>Increment: ${lotData.increment}</p>
            <div className="flex items-center">
                <p className="mr-2">Lot closes: </p>
                <Countdown now={now} endDate={lotData.end_date} />
            </div>
            <BidComponent lot={lotData} now={now} />
        </Card>
    );
};
