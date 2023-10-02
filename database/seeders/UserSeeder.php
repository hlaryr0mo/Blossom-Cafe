<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    
    public function run()
    {
        $user1=new User;
        $user1->name='Paco';
       //$user1->last_nameF ='Apellido';
        //$user1->last_nameM ='Apellido2';
        $user1->email='paco123@gmail.com';
        $user1->password ='Paco123';
        //$user1->role_id=1;
        //$user1->gender_id=2;
        $user1->save();



    }
}
