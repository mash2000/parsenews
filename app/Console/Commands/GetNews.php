<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use simplehtmldom\HtmlWeb;

class GetNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'GetNews';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'GetNews: get news from site rbk';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $url = 'https://www.rbc.ru/society/07/07/2022/62c6b9569a794745f905ad6b?from=newsfeed';
        $html = new HtmlWeb();
        $load = $html->load($url);
        dd($load);
    }
}
