<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Clients;

class ClientSeeder extends Seeder
{
   
    public function run()
    {
        $client1= new Clients;
        $client1->name='Maria';
        $client1->last_nameF='Apellido';
        $client1->last_nameM='Apellido2';
        $client1->phone=1234567;
        $client1->save();

    }
}
