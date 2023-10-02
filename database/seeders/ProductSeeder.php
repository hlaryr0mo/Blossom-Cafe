<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    
    public function run()
    {
        $product1= new Product();
        $product1->name='Product1';
        $product1->price=259;
        $product1->stock=50;
        $product1->description='Long description and I dont know what else I want to go to sleep.';
        $product1->photo='Insert photo';
        $product1->status=true;
        $product1->subcategory_id=1;
        $product1->save();
    }
}
