<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['customer_id','device_id', 'product_qnty', 'total_purchase_price', 'total_sale_price', 'total_discount', 'total_final_price', 'total_profit', 'cart_status', 'cart_by', 'notes'];
	
	
	public function cartItem(){
		return $this->hasMany(CartItem::class, 'cart_id', 'id');
	}
}
