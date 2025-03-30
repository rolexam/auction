import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Lot } from '@/types';
import Countdown from '@/components/auction/countdown';
import BidComponent from '@/components/auction/bid';
import echo from '@/echo';


export default function LotComponent({ lot }: {lot: Lot}) {
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
      <Card
          key={lotData.id}
          className={`p-4 transition-all duration-500 ${
              flash ? 'ring-4 ring-green-500 dark:ring-green-400' : ''
          }`}
      >
          <img
              src={`/images/lots/${lotData.photo}`}
              alt={lotData.title}
              className="w-full object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{lotData.title}</h3>
          <p>Current Bid: ${lotData.current_price}</p>
          <p>Increment: ${lotData.increment}</p>
          <div className="flex items-center">
              <p className="mr-2">Lot closes: </p>
              <Countdown now={now} endDate={lotData.end_date} />
          </div>
          <BidComponent lot={lotData} now={now} />
      </Card>
    );
};
