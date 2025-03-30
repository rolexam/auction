type CountdownProps = {
    endDate: Date;
    now: Date;
};

export default function Countdown({ endDate, now }: CountdownProps) {
    const difference = new Date(endDate).getTime() - now.getTime();
    let hours = 0, minutes = 0, seconds = 0;
    if (difference > 0) {
        hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((difference / (1000 * 60)) % 60);
        seconds = Math.floor((difference / 1000) % 60);
    }
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="mt-2">
            <div className="text-xl font-bold">{formattedTime}</div>
            <div className="text-xs text-gray-500">{new Date(endDate).toLocaleString()}</div>
        </div>
    );
}
