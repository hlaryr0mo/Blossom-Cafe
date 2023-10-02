<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Genders;

class GenderSeeder extends Seeder
{
    
    public function run()
    {
        $genderF= new Genders;
        $genderF->name='F';
        $genderF->save();

        $genderM= new Genders;
        $genderM->name='M';
        $genderM->save();
    }
}
