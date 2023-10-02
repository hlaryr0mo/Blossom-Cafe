<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    
    public function run()
    {
       $category1 = new Category; 
       $category1->nameCategory = 'Drink';
       $category1->description = 'A beverage obtained from the roasted and ground beans of the fruits of the coffee plant; it is highly stimulating due to its caffeine content, a psychoactive substance.';
       $category1->save();

       $category2 = new Category; 
       $category2->nameCategory = 'Dessert';
       $category2->description = 'It is a sweet or salty dish eaten at the end of a meal or as a snack.';
       $category2->save();
    }
}
