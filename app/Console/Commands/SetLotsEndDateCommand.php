<?php

namespace App\Console\Commands;

use App\Models\Auction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SetLotsEndDateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:set-lots-end-date-command {date}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $auctions = Auction::query()->get();
        $date = new Carbon($this->argument('date'));
        $date = $date->setSecond(0);

        foreach ($auctions as $auction) {
            $min = 0;
            foreach ($auction->lots as $lot) {
                $lot->end_date = $date->setMinute($min);
                $lot->save();
                $min++;
            }
        }
    }
}
