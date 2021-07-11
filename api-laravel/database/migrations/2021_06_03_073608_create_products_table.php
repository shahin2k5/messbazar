<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
			$table->integer('category_id')->nullable();
			$table->integer('subcategory_id')->nullable();
			$table->string('product_title')->nullable();
			$table->integer('purchase_price')->nullable();
			$table->integer('sale_price')->nullable();
			$table->integer('discount')->nullable();
			$table->integer('final_sale_price')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
