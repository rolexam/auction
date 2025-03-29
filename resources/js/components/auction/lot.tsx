import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lot } from '@/types';

export default function LotComponent({ lot }: {lot: Lot}) {
      return (
          <Card key={lot.id} className="p-4">
              <img
                  src={`/images/lots/${lot.photo}`}
                  alt={lot.title}
                  className="w-full object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{lot.title}</h3>
              <p>Starting Price: ${lot.starting_price}</p>
              <p>Increment: ${lot.increment}</p>
              <p>
                  End Date:{" "}
                  {new Date(lot.end_date).toLocaleString()}
              </p>
              <Button variant="default" className="mt-2 w-full">
                  Place Bid
              </Button>
          </Card>
      );
};
