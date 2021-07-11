<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderableListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderable_lists', function (Blueprint $table) {
            $table->id();
			$table->string('device_id')->nullable();
			$table->integer('customer_id')->nullable();
			$table->integer('cartable_type')->nullable();
			$table->integer('product_id')->nullable();
			$table->integer('product_qnty')->nullable();
	        $table->string('status')->nullable();
	        $table->string('cart_by')->nullable();
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
        Schema::dropIfExists('orderable_lists');
    }
}
