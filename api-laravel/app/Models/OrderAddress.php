<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderAddress extends Model
{
    protected $fillable = [
		'id', 'customer_id', 'cart_id', 'order_id', 'full_name', 'address1', 'address2', 'city', 'mobile', 'notes', 'created_at', 'updated_at'
	];
}
