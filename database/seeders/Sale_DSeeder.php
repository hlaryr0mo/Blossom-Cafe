<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sales_details;

class Sale_DSeeder extends Seeder
{
    
    public function run()
    {
        $details1= new Sales_details;
        $details1->quantity=3;
        $details1->price=1000;
        $details1->sale_id=1;
        $details1->product_id=1;
        $details1->save();
    }
}
