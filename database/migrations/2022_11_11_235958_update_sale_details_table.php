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
        Schema::table('sale_details', function (Blueprint $table){
            $table->unsignedBigInteger('sale_id');
            $table->foreign('sale_id')
                  ->references('id')->on('sales')
                  ->onDelete('cascade');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                    ->references('id')->on('products')
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
        Schema::table('sale_details', function (Blueprint $table){
            $table->dropForeign('sale_details_sale_id_foreign');
            $table->dropColumn('sale_id');
            $table->dropForeign('sale_details_product_id_foreign');
            $table->dropColumn('product_id');
        });
    }
};
