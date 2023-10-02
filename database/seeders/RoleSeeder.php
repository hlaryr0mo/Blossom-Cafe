<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Roles;

class RoleSeeder extends Seeder
{
    
    public function run()
    {
        $role1= new Roles;
        $role1->name='Admin';
        $role1->save();
    }
}
