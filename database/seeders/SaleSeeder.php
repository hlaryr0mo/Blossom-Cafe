<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sales;

class SaleSeeder extends Seeder
{
   
    public function run()
    {
        $sale1=new Sales;
        $sale1->date_time ='2022-11-15';
        $sale1->taxes =567;
        $sale1->total=1000;
        $sale1->status=true;
        $sale1->client_id=1;
        $sale1->user_id=1;
        $sale1->voucher_id =3;
        $sale1->save();
    }
}
