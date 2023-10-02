<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sales', function (Blueprint $table){
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')
                  ->references('id')->on('clients')
                  ->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                    ->references('id')->on('users')
                    ->onDelete('cascade');
            $table->unsignedBigInteger('voucher_id');
            $table->foreign('voucher_id')
                    ->references('id')->on('vouchers')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sales', function (Blueprint $table){
            $table->dropForeign('sales_client_id_foreign');
            $table->dropColumn('client_id');
            $table->dropForeign('sales_user_id_foreign');
            $table->dropColumn('user_id');
            $table->dropForeign('sales_voucher_id_foreign');
            $table->dropColumn('voucher_id');
        });
    }
};
