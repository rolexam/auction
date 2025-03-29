import { useEffect, useState } from 'react';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown({ endDate } : { endDate: Date }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({hours: 0, minutes: 0, seconds: 0});

    useEffect(() => {
        const timer = setTimeout(() => {
            const difference = +new Date(endDate) - +new Date();
            let timeLeft: TimeLeft;
            if (difference > 0) {
                timeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                timeLeft = { hours: 0, minutes: 0, seconds: 0 };
            }

            setTimeLeft(timeLeft);
        }, 1000);

        return () => clearTimeout(timer);
    }, [endDate, timeLeft]);

    const formattedTime = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;

    return (
        <div className="mt-2">
            <div className="text-xl font-bold">{formattedTime}</div>
            <div className="text-xs text-gray-500">{new Date(endDate).toLocaleString()}</div>
        </div>
    );
}
