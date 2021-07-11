<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Cart;
use App\Models\Product;
class CartItem extends Model
{
    protected $fillable = ['id', 'customer_id', 'cart_id', 'product_id', 'purchase_price', 'sale_price', 'discount', 'final_sale_price', 'product_qnty','product_pcs', 'subtotal_price', 'status', 'created_at', 'updated_at'];
	
	public function cart(){
		return $this->belongsTo(Cart::class,'id','cart_id');
	}
	
	public function product(){
		return $this->belongsTo(Product::class,'product_id','id');
	}
}
