<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Roles;
use App\Models\Product;
use App\Models\Genders;
use App\Models\Voucher;
use App\Models\User;
use App\Models\Clients;
use App\Models\Sales;
use App\Models\Sales_details;




class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
        $this->call(CategoriesSeeder::class); //Referencia al seeader de program para que ejecute el método
        $this->call(SubCategoriesSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(GenderSeeder::class);
        $this->call(VoucherSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ClientSeeder::class);
        $this->call(SaleSeeder::class);
        $this->call(Sale_DSeeder::class);
        



    }
}
