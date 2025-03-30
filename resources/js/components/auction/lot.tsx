import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Lot } from '@/types';
import Countdown from '@/components/auction/countdown';
import BidComponent from '@/components/auction/bid';

export default function LotComponent({ lot }: {lot: Lot}) {
    // Состояние для текущего времени, обновляемое каждую секунду
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
      <Card key={lot.id} className="p-4">
          <img
              src={`/images/lots/${lot.photo}`}
              alt={lot.title}
              className="w-full object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{lot.title}</h3>
          <p>Current Bid: ${lot.starting_price}</p>
          <p>Increment: ${lot.increment}</p>
          <div className="flex items-center">
              <p className="mr-2">Lot closes: </p>
              <Countdown now={now} endDate={lot.end_date} />
          </div>
          <BidComponent lot={lot} now={now} />
      </Card>
    );
};
