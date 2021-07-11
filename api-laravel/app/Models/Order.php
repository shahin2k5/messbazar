<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
		'id', 'customer_id', 'cart_id', 'product_qnty', 'total_purchase_price', 'total_sale_price', 'total_discount', 'total_final_price', 'total_profit', 'cart_status', 'cart_by', 'notes', 'created_at', 'updated_at'
	];
}
