<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class OrderItem extends Model
{
    protected $fillable = [
		'id', 'order_id', 'customer_id', 'cart_id', 'product_id', 'purchase_price', 'sale_price', 'discount', 'final_sale_price', 'product_qnty', 'subtotal_price', 'status', 'created_at', 'updated_at'
	];
	
	public function product(){
	    return $this->belongsTo(Product::class,'product_id');
	}
}
