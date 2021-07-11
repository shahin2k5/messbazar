<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
			$table->integer('order_id')->nullable();
			$table->integer('customer_id')->nullable();
			$table->integer('cart_id')->nullable();
			$table->integer('product_id')->nullable();
			$table->integer('purchase_price')->nullable();
			$table->integer('sale_price')->nullable();
			$table->integer('discount')->nullable();
			$table->integer('final_sale_price')->nullable();
			$table->integer('product_qnty')->nullable();
			$table->integer('subtotal_price')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('order_items');
    }
}
