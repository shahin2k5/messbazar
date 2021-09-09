<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderAddress extends Model
{
    protected $fillable = [
		'id', 'customer_id', 
		'cart_id', 
		'order_id', 
		'house_mess_name', 
		'user_full_name', 
		'full_address', 
		'user_mobile', 
		'user_type', 
		'branch_name', 
		'delivery_time', 
		'notes', 
		'created_at', 
		'updated_at'
	];
}
