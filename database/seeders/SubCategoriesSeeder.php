<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubCategory;

class SubCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subCategory1= new SubCategory;
        $subCategory1->nameSub = 'Bingsu';
        $subCategory1->description='Se trata de hielo granizado con una especie de mermelada de judías rojas, pasta de arroz y polvo de frutos secos.';
        $subCategory1->image='Inserte image';
        $subCategory1->category_id =2;

        $subCategory1->save();

        $subCategory2= new SubCategory;
        $subCategory2->nameSub = 'Cafe';
        $subCategory2->description='El café es la bebida que se obtiene a partir de los granos tostados y molidos de los frutos de la planta del café; es altamente estimulante por su contenido de cafeína, una sustancia psicoactiva.';
        $subCategory1->image='Inserte image';
        $subCategory2->category_id =1;

        $subCategory2->save();

        $subCategory3= new SubCategory;
        $subCategory3->nameSub = 'Boba Tea';
        $subCategory3->description='También conocido por su anglicismo bubble tea o también como boba, es una bebida de té dulce aromatizada inventada en Taiwán.';
        $subCategory3->image='Inserte image';
        $subCategory3->category_id =1;

        $subCategory3->save();

        $subCategory4= new SubCategory;
        $subCategory4->nameSub = 'Cake';
        $subCategory4->description='';
        $subCategory1->image='Inserte image';
        $subCategory4->category_id =2;

        $subCategory4->save();

    }
}
