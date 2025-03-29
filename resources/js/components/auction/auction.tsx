import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Auction } from '@/types';
import LotComponent from '@/components/auction/lot';

export default function AuctionComponent({auction}: {auction: Auction}) {
    return (
        <div className="mb-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {auction.title}
                    </CardTitle>
                    <CardDescription>
                        {new Date(auction.start_date).toLocaleString()} -{" "}
                        {new Date(auction.end_date).toLocaleString()}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {auction.lots.map((lot) => (
                            <LotComponent key={lot.id} lot={lot} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};
