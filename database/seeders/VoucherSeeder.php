<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voucher;

class VoucherSeeder extends Seeder
{
    
    public function run()
    {
        $voucher1= new Voucher;
        $voucher1->name='Cash';
        $voucher1->save();

        $voucher2= new Voucher;
        $voucher2->name='Debit cards';
        $voucher2->save();

        $voucher3= new Voucher;
        $voucher3->name='Prepaid cards';
        $voucher3->save();

        $voucher4= new Voucher;
        $voucher4->name='Credit cards';
        $voucher4->save();

        $voucher5= new Voucher;
        $voucher5->name='Bank transfers';
        $voucher5->save();
    }
}
