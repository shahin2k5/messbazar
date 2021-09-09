<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = ['category_id', 'subcategory_id', 'product_title', 'short_description', 'unit_type', 'purchase_price', 'sale_price', 'discount', 'final_sale_price', 'image', 'hot_product', 'new_arrival', 'discount_product', 'show_pcs_box', 'product_qnty', 'product_pcs'];
    
    public function cartItem(){
        return $this->hasOne(CartItem::class,'product_id');
    }
    
    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
    
    public function sub_category(){
        return $this->belongsTo(SubCategory::class,'subcategory_id');
    }
    
}
