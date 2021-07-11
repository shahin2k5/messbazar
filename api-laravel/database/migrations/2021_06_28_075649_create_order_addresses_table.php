<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_addresses', function (Blueprint $table) {
            $table->id();
			$table->integer('customer_id')->nullable();
			$table->integer('cart_id')->nullable();
			$table->integer('order_id')->nullable();
			$table->string('full_name')->nullable();
			$table->string('address1')->nullable();
			$table->string('address2')->nullable();
			$table->string('city')->nullable();
			$table->string('mobile')->nullable();
			$table->string('notes')->nullable();
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
        Schema::dropIfExists('order_addresses');
    }
}
