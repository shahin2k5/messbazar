<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OrderAddress;
use App\Models\OrderItem;
use App\User;

class Order extends Model
{
    protected $fillable = [
		'id', 'customer_id', 'cart_id', 'product_qnty', 'total_purchase_price', 'total_sale_price', 'total_discount', 'total_final_price', 'total_profit', 'cart_status', 'cart_by', 'notes', 'created_at', 'updated_at'
	];
	
	public function orderAddress(){
	    return $this->hasOne(OrderAddress::class,'order_id');
	}
	
	public function customer(){
	    return $this->hasOne(User::class,'id','customer_id');
	}
	
	public function orderItems(){
	    return $this->hasMany(OrderItem::class,'order_id');
	}
	
}
