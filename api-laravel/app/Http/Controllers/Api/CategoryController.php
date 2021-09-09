<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderAddress;
use App\Models\Bigopti;
use App\Models\Offer;
use App\Models\Coupon;
use App\Models\Setting;
use App\User;
use Auth;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function getcategories()
    {
        $category = Category::all();
        $products = Product::all();
        $carts = Cart::where('cart_status','pending')->
		with('cartItem')->with('cartItem.product')->first();
		
		$bigopti = Bigopti::get();
		$offer = Offer::get();
		$coupon = Coupon::get();
		$settings = Setting::get();

        return response()->json([
			'category_list'=>$category,
			'product_list'=>$products,
			'cart_list'=>$carts,
			'bigopti'=>$bigopti,
			'offer'=>$offer,
			'coupon'=>$coupon,
			'settings'=>$settings
		]);
    }    
	
    public function getcategoryall($deviceid="")
    {
        $category = Category::all();
        $products = Product::with('cartItem')->get();
        $carts = Cart::where('device_id', $deviceid)->where('cart_status','pending')->
		with('cartItem')->with('cartItem.product')->first();


        $bigopti = Bigopti::get();
		$offer = Offer::get();
		$coupon = Coupon::get();
		$settings = Setting::get();

        return response()->json([
			'category_list'=>$category,
			'product_list'=>$products,
			'cart_list'=>$carts,
			'bigopti'=>$bigopti,
			'offer'=>$offer,
			'coupon'=>$coupon,
			'settings'=>$settings
		]);
    }    
	
	
	public function subcategory($catid)
    {
        $subcategory = SubCategory::where('category_id', $catid)->get();

        return response()->json($subcategory);
    }	
	
	public function getproductlist($subcatid)
    {
		if($subcatid=="all"){
			$products = Product::get();
		}else{
			$products = Product::where('subcategory_id', $subcatid)->get();
		}

        return response()->json($products);
    }
	
	public function get_homepage_product_list()
    {
        $products = Product::
						orWhere('hot_product', 1)->
						orWhere('new_arrival', 1)->
						orWhere('discount_product', 1)->
						with('cartItem')->
						get();

        return response()->json($products);
    }
	
	public function getproductDetails($productid,$device_id)
    {
        $products = Product::where('id', $productid)->first();
		 $carts = Cart::where('device_id', $device_id)->where('cart_status','pending')->
		with('cartItem')->with('cartItem.product')->first();
		
		$bigopti = Bigopti::get();
		$offer = Offer::get();
		$coupon = Coupon::get();
		$settings = Setting::get();

        return response()->json([
			'products'=>$products,
			'carts'=>$carts,
			'bigopti'=>$bigopti,
			'offer'=>$offer,
			'coupon'=>$coupon,
			'settings'=>$settings
		]);
    }
	
	
	public function getCurrentCartList($device_id)
    {
        $carts = Cart::where('device_id', $device_id)->where('cart_status','pending')->
		with('cartItem')->with('cartItem.product')->first();

        return response()->json($carts);
    }	
	
	
	public function getcartlistbycartid($cart_id)
    {
        $carts = Cart::where('id', $cart_id)->
		with('cartItem')->with('cartItem.product')->first();

        return response()->json($carts);
    }
	
	public function getPreviousCartList($device_id)
    {
        $carts = Cart::where('device_id', $device_id)->get();

        return response()->json($carts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function cartAdd(Request $request)
    {
		$device_id = $request->get('device_id');
		$cart = Cart::where('device_id', $device_id)->where('cart_status','pending')->first();
		
		$product_id = $request->get('id');
		
 
		$product_qnty = $request->get('product_qnty');
		$product_pcs = $request->get('product_pcs');
	 
		
		$product_info = Product::where('id',$product_id)->first(); 
		$final_sale_price = $product_info->final_sale_price;
		$purchase_price = $product_info->purchase_price;
		$sale_price = $product_info->sale_price;
		$discount = $product_info->discount;
		$subtotal_price = $product_qnty * $final_sale_price; 
		
        if(empty($cart)){
			$cart = Cart::create([
								'device_id'=>$request->get('device_id'), 
								'total_purchase_price'=>0, 
								'total_sale_price'=>0, 
								'total_discount'=>0, 
								'total_final_price'=>0, 
								'total_profit'=>0, 
								'cart_status'=>'pending', 
								'cart_by'=>'user name', 
								'notes'=>''
							]);
		}
		
							
		$cartItem = CartItem::where('product_id',$product_id)->
							where('cart_id',$cart->id)->
							where('status','pending')->first(); 
		$cartItemQnty = 0;
		if(empty($cartItem)){
				$cartItem = CartItem::create([ 
					'customer_id'=>$cart->customer_id, 
					'cart_id'=>$cart->id, 
					'product_id'=>$product_id, 
					'purchase_price'=>$purchase_price, 
					'sale_price'=>$sale_price, 
					'discount'=>$discount, 
					'final_sale_price'=>$final_sale_price, 
					'product_qnty'=>$product_qnty, 
					'product_pcs'=>$product_pcs, 
					'subtotal_price'=>$subtotal_price, 
					'status'=>'pending'
			]);
		
			$cartItemQnty = $cartItem->product_qnty;
			$cartItemTotalPurchase = $cartItem->purchase_price*$cartItemQnty;
			$cartItemTotalSale = $cartItem->sale_price*$cartItemQnty;
			$cartItemTotalDiscount = $cartItem->discount*$cartItemQnty;
			$cartItemTotalFinalSale = $cartItem->final_sale_price*$cartItemQnty;
			$cartItemSubTotal = $cartItemTotalFinalSale;
			$cartItemTotalProfit = $cartItemTotalFinalSale-$cartItemTotalPurchase;
			
		}else{
			$cartItemQnty = $product_qnty;
			$cartItemTotalPurchase = $cartItem->purchase_price*$cartItemQnty;
			$cartItemTotalSale = $cartItem->sale_price*$cartItemQnty;
			$cartItemTotalDiscount = $cartItem->discount*$cartItemQnty;
			$cartItemTotalFinalSale = $cartItem->final_sale_price*$cartItemQnty;
			$cartItemSubTotal = $cartItemTotalFinalSale;
			$cartItemTotalProfit = $cartItemTotalFinalSale-$cartItemTotalPurchase;
			 
			$cartItem->product_qnty = $cartItemQnty;
			$cartItem->subtotal_price = $cartItemSubTotal;
			$cartItem->save();  
		}	 
		
	
		$cart->save();

		$cartItems = CartItem::where('cart_id',$cart->id)->get();
		
		$gr_qnty = $cartItems->sum('product_qnty'); 
		$gr_subtotal = $cartItems->sum('subtotal_price'); 
		
		$cart->product_qnty = $gr_qnty;
		$cart->total_final_price = $gr_subtotal;
		$cart->save();
		
		$carts = Cart::where('id',$cart->id)->with('cartItem')->with('cartItem.product')->first();
		return response()->json([
			'status'=>'success',
			'data_type'=>'cart_add',
			'data'=>$carts,
		]);
    }
	
	
	public function cartAddPrepare(Request $request)
    {
		$cart_id = $request->get('cart_id');
		$device_id = $request->get('device_id');
		
		$cartOld = Cart::where('device_id', $device_id)->where('cart_status','pending')->first();
		if($cartOld){
    		$cartItemsOld = CartItem::where('cart_id',$cartOld->id)->delete(); 
    		$cartOld->delete();
		}
		$cartPrev = Cart::where('id', $cart_id)->first();
		
		$cart = Cart::create([
							'device_id'=>$device_id,
							'total_purchase_price'=>$cartPrev->total_purchase_price, 
							'total_sale_price'=>$cartPrev->total_sale_price, 
							'total_discount'=>$cartPrev->total_discount, 
							'total_final_price'=>$cartPrev->total_final_price, 
							'total_profit'=>$cartPrev->total_profit, 
							'cart_status'=>'pending', 
							'cart_by'=>'user name', 
							'notes'=>''
						]);

		
							
		$cartItems = CartItem::where('cart_id',$cartPrev->id)->get(); 
 
		foreach($cartItems as $item){
			CartItem::create([ 
					'customer_id'=>$item->customer_id, 
					'cart_id'=>$cart->id, 
					'product_id'=>$item->product_id, 
					'purchase_price'=>$item->purchase_price, 
					'sale_price'=>$item->sale_price, 
					'discount'=>$item->discount, 
					'final_sale_price'=>$item->final_sale_price, 
					'product_qnty'=>$item->product_qnty, 
					'product_pcs'=>$item->product_pcs, 
					'subtotal_price'=>$item->subtotal_price, 
					'status'=>'pending'
			]);
		}

		$cartItems = CartItem::where('cart_id',$cart->id)->get();
		
		$gr_qnty = $cartItems->sum('product_qnty'); 
		$gr_subtotal = $cartItems->sum('subtotal_price'); 
		
		$cart->product_qnty = $gr_qnty;
		$cart->total_final_price = $gr_subtotal;
		$cart->save();
		
		$carts = Cart::where('id',$cart->id)->with('cartItem')->with('cartItem.product')->first();
		return response()->json([
			'status'=>'success',
			'data_type'=>'cart_add',
			'data'=>$carts,
		]);
    }
	
	
	
	public function cartUpdate(Request $request)
    {
		$device_id = $request->get('device_id');
		$cart_item_id = $request->get('id');
		$product_qnty = $request->get('product_qnty');
		$product_pcs = $request->get('product_pcs');
		
		$cartItem = CartItem::where('id',$cart_item_id)->first();
		if(empty($cartItem)){
			 return response()->json([
			        'status'=>'error',
			        'data_type'=>'cart_update'
		        ],500);
		}
		$cart = Cart::where('id',$cartItem->cart_id)->first();
		
		$product_id = $request->get('product_id');
		$purchase_price = $request->get('purchase_price');
		$sale_price = $request->get('sale_price');
		$discount = $request->get('discount');
		$final_sale_price = $request->get('final_sale_price');
		
		$subtotal_price = $product_qnty * $final_sale_price;
		
        if(empty($cart)){
			 
		}
							
		$cartItem = $cartItem->update([ 
					'product_qnty'=>$product_qnty, 
					'product_pcs'=>$product_pcs, 
					'subtotal_price'=>$subtotal_price
		]);
		
		$cartItems = CartItem::where('cart_id',$cart->id)->get();
		
		$gr_qnty = $cartItems->sum('product_qnty'); 
		$gr_subtotal = $cartItems->sum('subtotal_price'); 
		
		$cart->product_qnty = $gr_qnty;
		$cart->total_final_price = $gr_subtotal;
		$cart->save();
		
		$carts = Cart::where('id',$cart->id)->with('cartItem')->with('cartItem.product')->first();
		return response()->json([
			'status'=>'success',
			'data_type'=>'cart_add',
			'data'=>$carts,
		]);
    }
	
	
	
	public function cartRemove($cartitemid=null){
		$cartItem = CartItem::where('id','=',$cartitemid)->first();
		$cart_id = $cartItem->cart_id;
		$cart = Cart::where('id',$cart_id)->first();
		$deleteCartItem = $cartItem->delete();
		if($deleteCartItem){
			$cartItems = CartItem::where('cart_id',$cart->id)->get();
			$gr_qnty = $cartItems->sum('product_qnty'); 
			$gr_subtotal = $cartItems->sum('subtotal_price'); 
			
			$cart->product_qnty = $gr_qnty;
			$cart->total_final_price = $gr_subtotal;
			$cart->save();
			
			$carts = Cart::where('id',$cart->id)->with('cartItem')->with('cartItem.product')->first();
			
			return response()->json([
				'status'=>'success',
				'data_type'=>'cart_remove',
				'data'=>$carts,
			]);
			 
		}else{
			return response()->json([
				'status'=>'error',
				'message'=>'Sorry, product was not deleted!'
			],403);
		}
	}
	
	
	public function cartConfirm(Request $request)
    {
		try{
			$device_id = $request->get('device_id');
			$cart_id = $request->get('cart_id');
			$customer_id = $request->get('user_id');
			if($cart_id){
				$cart = Cart::where('id',$cart_id)->first();
			}
		 
			
			
			if(!empty($cart)){
				$cartItem = CartItem::where('cart_id', $cart->id)->get();
			}
			if(!empty($cart->customer_id)){
				$customer_id = $cart->customer_id;
			} 
			
			if(empty($cart)){
				return response()->json([
					'status'=>'error',
					'data'=>"Cart is empty!"
				],403);
			}
			$order = Order::create([
					'customer_id'=>$customer_id, 
					'cart_id'=>$cart->id, 
					'product_qnty'=>$cart->product_qnty, 
					'total_purchase_price'=>$cart->total_purchase_price, 
					'total_sale_price'=>$cart->total_sale_price, 
					'total_discount'=>$cart->total_discount, 
					'total_final_price'=>$cart->total_final_price, 
					'total_profit'=>$cart->total_final_price-$cart->total_purchase_price, 
					'cart_status'=>'processing', 
					'cart_by'=>'User', 
					'notes'=>''
			]);
			foreach($cartItem as $key=>$item){
				OrderItem::create([
					'customer_id'=>$customer_id,
					'order_id'=>$order->id,
					'cart_id'=>$item->cart_id,
					'product_id'=>$item->product_id,
					'purchase_price'=>$item->purchase_price,
					'sale_price'=>$item->sale_price,
					'discount'=>$item->discount,
					'final_sale_price'=>$item->final_sale_price,
					'product_qnty'=>$item->product_qnty,
					'subtotal_price'=>$item->subtotal_price,
					'status'=>'processing',
				]);
			}
			
			$order_items = OrderItem::where(['cart_id'=>$cart->id])->get();
			
			$order_address = OrderAddress::create([
							'customer_id'=>$request->input('customer_id'), 
							'cart_id'=>$cart->id, 
							'order_id'=>$order->id, 
							'house_mess_name'=>$request->input('house_mess_name'), 
							'user_full_name'=>$request->input('user_full_name'), 
							'full_address'=>$request->input('full_address'), 
							'user_mobile'=>$request->input('user_mobile'), 
							'user_type'=>$request->input('user_type'), 
							'branch_name'=>$request->input('branch_name'), 
							'delivery_time'=>$request->input('delivery_time'), 
							'notes'=>'unverified'
			]);
			$updateCart = Cart::where('id',$cart->id)->update(['cart_status'=>'confirmed']);
			$updateCartItem = CartItem::where('cart_id', $cart->id)->update(['status'=>'confirmed']);
			return response()->json([
				'status'=>'success',
				'data_type'=>'cart_confirmed',
				'data'=>$request->all(),
			]);
		}catch(Exception $ex){
			return response()->json([
			'status'=>'error',
			'data'=>$ex->getMessage()
		],403);
		}
    }
	
	public function profile_update(Request $request){
	    $user_id = $request->get('user_id');	    
	    $user_type = $request->get('user_type');
	    $user_info = User::where('id',$user_id)->first();
	    if(empty($user_info)){
	        return response()->json([
    			'status'=>'error',
    			'message'=>'User not found'
    		],403);
	    }else{
	            $user_info->house_mess_name = $request->get('house_mess_name');
        	    $user_info->user_full_name = $request->get('user_full_name');   
        	    $user_info->full_address = $request->get('full_address');	    
        	    $user_info->branch_name = $request->get('branch_name');	    
        	    $user_info->user_mobile = $request->get('user_mobile');	    
        	    if($user_type=="house"){
        	        
        	   }else{
        	       $user_info->current_meal_manager = $request->get('current_meal_manager');	    
        	       $user_info->current_meal_manager_mobile = $request->get('current_meal_manager_mobile');	    
        	       $user_info->current_rice_manager = $request->get('current_rice_manager');	    
        	       $user_info->current_rice_manager_mobile = $request->get('current_rice_manager_mobile');	    
        	   }
        	   if($user_info->save()){
        	       return response()->json([
            			'status'=>'success',
            			'message'=>'User info updated successfully'
            		],200);
        	   }
	    }
	    
	}
	public function getBigopti()
    {
        $bigopti = Bigopti::get();
        return response()->json([
			'status'=>'success',
			'bigopti'=>$bigopti,
		]);
    }
	
	public function getOffer()
    {
        $offer = Offer::get();
        return response()->json([
			'status'=>'success',
			'offer'=>$offer,
		]);
    }
	
	public function getCoupon()
    {
       $coupon = Coupon::get();
        return response()->json([
			'status'=>'success',
			'coupon'=>$coupon,
		]);
    }
	
	public function getSettings()
    {
        $setting = Setting::get();
        return response()->json([
			'status'=>'success',
			'setting'=>$setting,
		]);
    }
	
	
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function productsProducts()
    {
		$products = Product::orderBy('category_id')->get();
        return view('admin.products')->with(['products'=>$products]);
    }
    
	public function salesOrders()
    {
		$orders = Order::orderBy('id','desc')->paginate(15);
        return view('admin.sales',compact('orders'));
    }
    
    public function userSalesOrders($customer_id=null)
    {
		$orders = Order::where('customer_id',$customer_id)->orderBy('id','desc')->get();
        return view('admin.user-sales',compact('orders'));
    }
        
	public function editSalesOrders($order_id=null)
    {
		$order = Order::where('id',$order_id)->with('orderItems')->first();
        return view('admin.edit-sales',compact('order'));
    }
    
    public function postEditSalesOrders($order_id=null)
    {
        $status = request()->get('cart_status');
        $notes = request()->get('notes');
		$order = Order::where('id',$order_id)->with('orderItems')->first();
        $order->cart_status = $status;
        $order->notes = $notes;
        $order->save();
        return redirect()->to('/sales/edit-orders/'.$order_id)->with(['order'=>$order]);
    }
    
    
    public function productsCategories()
    {
		$categories = Category::all();
        return view('admin.categories',compact('categories'));
    }
    
    public function productsSubCategories()
    {
		$sub_categories = SubCategory::orderBy('category_id')->get();
        return view('admin.sub-categories',compact('sub_categories'));
    }    
    
    public function editProductsCategories($id=null)
    {
        $categories = "";  
        if(!empty($id)){
            $category = Category::where('id',$id)->first();
            if(empty($category)){
                $categories = Category::all();   
                return redirect()->route('productsCategories')->compact('categories')->withErrors(['msg'=>'Sorry not updated category ']);
            }
            
            return view('admin.edit-categories')->with(['category'=>$category]);
                
            // $category_title = request()->get('category_title');
            // $category_image = request()->file('category_image');
            // if(!empty($category_image)){
            //     $destinationPath = 'uploads/categories';
            //     $img_file = $category_image->move($destinationPath,$category_image->getClientOriginalName());
                
            // }else{
                
            // }
            
            // $categories->update(['category_title' =>$category_title , 'image'=>$img_file]);    
           
     
		    $categories = Category::all();    
            return redirect()->route('productsCategories')->with(['categories'=>$categories]);
        }
		
        return redirect()->route('productsCategories')->compact('categories');
    }    


    public function editPostProductsCategories()
    {
        $categories = "";  
        $category_id = request()->get('id');
        $category_title = request()->get('category_title');
        $category_image = request()->file('category_image');
        
        if(!empty($category_id)){
            $category = Category::where('id',$category_id)->first();
            if(empty($category)){
                return view('admin.edit-categories')->withInput(['id','category_title','category_image'])->withErrors(['msg'=>'Sorry, category not updated ']);
            }
            if(!empty($category_image)){
                $destinationPath = 'uploads/categories';
                $img_file = $category_image->move($destinationPath,$category_image->getClientOriginalName());
                
            }else{
                $img_file = $category->image;   
            }
            
            $category->update(['category_title' =>$category_title , 'image'=>$img_file]);
        }
		
         $categories = Category::all();    
         return redirect()->route('productsCategories')->with(['categories'=>$categories]);
    }    
    
        
    public function deleteProductsCategories($id=null)
    {
        $categories = "";  
        if(!empty($id)){
            $products = Product::where('category_id',$id)->get();
            $sub_category = SubCategory::where('category_id',$id)->get();
            if(count($products) || count($sub_category)){
                $categories = Category::all();   
                return redirect()->route('productsCategories')->with(['categories'=>$categories])->
                    withErrors(['msg'=>'Sorry category not deleted, sub-category and products exists with this category ']);
            }
            $del_categories = Category::where('id',$id)->delete();    
            $categories = Category::all();    
        }
		
        return redirect()->route('productsCategories')->with(['categories'=>$categories]);
    } 
    
    
    public function addProductsCategories(){
         return view('admin.add-categories');   
    }
    
    public function postAddProductsCategories()
    {
        $category_title = request()->get('category_title');
        $category_image = request()->file('category_image');
        $destinationPath = 'uploads/categories';
        $img_file = $category_image->move($destinationPath,$category_image->getClientOriginalName());
        
        Category::create(['category_title' =>$category_title , 'image'=>$img_file]);    
           
     
		$categories = Category::all();    
        return redirect()->route('productsCategories')->with(['categories'=>$categories]);
    }
    
    //products add edit delete
    public function editProductsProducts($id=null)
    {
        $product = "";  
        if(!empty($id)){
            $product = Product::where('id',$id)->first();
        }
        
        $categories = Category::all();
        $sub_categories = SubCategory::all();
		
        return view('admin.edit-product')->with(['product'=>$product,'categories'=>$categories,'sub_categories'=>$sub_categories]);
    }    
    
    public function deleteProductsProducts($id=null)
    {
        $products = "";  
        if(!empty($id)){
            $del_products = Product::where('id',$id)->delete();    
            $products = Product::all();    
        }
		
        return redirect()->route('productsProducts')->with(['products'=>$products]);
    } 
    
    
    public function addProductsProducts(){
        $categories = Category::all();
        $sub_categories = SubCategory::all();
        return view('admin.add-products')->with(['categories'=>$categories,'sub_categories'=>$sub_categories]);   
    }
    
    public function postAddProductsProducts()
    {
        // 'category_id', 'subcategory_id', 'product_title', 'short_description', 'unit_type', 'purchase_price', 'sale_price', 'discount', 'final_sale_price', 'image', 'hot_product', 'new_arrival', 'discount_product', 'show_pcs_box', 'product_qnty', 'product_pcs'
        
         
        $product_title = request()->get('product_title');
        $category_id = request()->get('category_id');
        $subcategory_id = request()->get('subcategory_id');
        $short_description = request()->get('short_description');
        $unit_type = request()->get('unit_type');
        $purchase_price = request()->get('purchase_price');
        $sale_price = request()->get('sale_price');
        $discount = request()->get('discount_price');
        $final_sale_price = request()->get('final_sale_price');
        $hot_product = request()->get('hot_product');
        $new_arrival = request()->get('new_arrival');
        $discount_product = request()->get('discount_product');
        $show_pcs_box = request()->get('show_pcs_box');
        $product_image = request()->file('product_image');
        $destinationPath = 'uploads/products';
        $img_file = $product_image->move($destinationPath,$product_image->getClientOriginalName());
        
        Product::create([ "product_title" => $product_title,
                          "category_id" => $category_id,
                          "subcategory_id" => $subcategory_id,
                          "short_description" => $short_description,
                          "unit_type" => $unit_type,
                          "purchase_price" => $purchase_price,
                          "sale_price" => $sale_price,
                          "discount" => $discount,
                          "final_sale_price" => $final_sale_price,
                          "hot_product" => $hot_product,
                          "new_arrival" => $new_arrival,
                          "discount_product" => $discount_product,
                          "show_pcs_box" => $show_pcs_box,
                           'image'=>$img_file]);    
           
     
		$products = Product::all();    
        return redirect()->route('productsProducts')->with(['products'=>$products]);
    }
    
    public function postEditProductsProducts()
    {
        // 'category_id', 'subcategory_id', 'product_title', 'short_description', 'unit_type', 'purchase_price', 'sale_price', 'discount', 'final_sale_price', 'image', 'hot_product', 'new_arrival', 'discount_product', 'show_pcs_box', 'product_qnty', 'product_pcs'
        
         
        $product_id = request()->get('product_id');
        $product_title = request()->get('product_title');
        $category_id = request()->get('category_id');
        $subcategory_id = request()->get('subcategory_id');
        $short_description = request()->get('short_description');
        $unit_type = request()->get('unit_type');
        $purchase_price = request()->get('purchase_price');
        $sale_price = request()->get('sale_price');
        $discount = request()->get('discount_price');
        $final_sale_price = request()->get('final_sale_price');
        $hot_product = request()->get('hot_product');
        $new_arrival = request()->get('new_arrival');
        $discount_product = request()->get('discount_product');
        $show_pcs_box = request()->get('show_pcs_box');
        $product_image = request()->file('product_image');
        $destinationPath = 'uploads/products';
        if($product_image){
               $img_file =  $product_image->move($destinationPath,$product_image->getClientOriginalName());
            }else{
               $img_file = ''; 
            }
        $product = Product::where('id',$product_id)->first();
        $product->update([ "product_title" => $product_title,
                          "category_id" => $category_id,
                          "subcategory_id" => $subcategory_id,
                          "short_description" => $short_description,
                          "unit_type" => $unit_type,
                          "purchase_price" => $purchase_price,
                          "sale_price" => $sale_price,
                          "discount" => $discount,
                          "final_sale_price" => $final_sale_price,
                          "hot_product" => $hot_product,
                          "new_arrival" => $new_arrival,
                          "discount_product" => $discount_product,
                          "show_pcs_box" => $show_pcs_box,
                           'image'=>$img_file?$img_file:$product->image]);    
           
     
		$products = Product::all();    
        return redirect()->route('productsProducts')->with(['products'=>$products]);
    }
    
    //sub categories routes
    public function editProductsSubCategories($id=null)
    {
        $sub_category = "";  
        if(!empty($id)){
            $sub_category = SubCategory::where('id',$id)->first();    
        }
		$categories = Category::all();
        return view('admin.edit-sub-categories')->with(['categories'=>$categories,
                    'sub_category'=>$sub_category]);
    }    
    
    public function deleteProductsSubCategories($id=null)
    {
        $sub_categories = "";  
        if(!empty($id)){
            $products = Product::where('subcategory_id',$id)->get();
            
            if(count($products)){
              
                $sub_categories = SubCategory::all();   
                return redirect()->route('productsSubCategories')->with(['sub_categories'=>$sub_categories])->
                    withErrors(['msg'=>'Sorry sub category not deleted, products exists with this sub category ']);
            }
            
            $del_categories = SubCategory::where('id',$id)->delete();    
            $sub_categories = SubCategory::all();    
        }
		
        return redirect()->route('productsSubCategories')->with(['sub_categories'=>$sub_categories]);
    } 
    
    
    public function addProductsSubCategories(){
        $categories = Category::all();    
         return view('admin.add-sub-categories')->with(['categories'=>$categories]);   
    }
    
    public function postAddProductsSubCategories()
    {
        $category_title = request()->get('sub_category_title');
        $category_id = request()->get('category_id');
        $category_image = request()->file('category_image');
        $destinationPath = 'uploads/categories';
        $img_file = $category_image->move($destinationPath,$category_image->getClientOriginalName());
        
        SubCategory::create(['category_title' =>$category_title, 'category_id' =>$category_id, 'image'=>$img_file]);    
           
     
		$sub_categories = SubCategory::all();    
        return redirect()->route('productsSubCategories')->with(['sub_categories'=>$sub_categories]);
    }
    
    
    public function postEditProductsSubCategories()
    {
        $categories         = "";  
        $category_id        = request()->get('category_id');
        $subcategory_id     = request()->get('sub_category_id');
        $subcategory_title  = request()->get('sub_category_title');
        $subcategory_image  = request()->file('category_image');
        
        if(!empty($subcategory_id)){
            $sub_category = SubCategory::where('id',$subcategory_id)->first();
            if(empty($sub_category)){
                return view('admin.edit-sub-categories')->withInput(['category_id','sub_category_id','sub_category_title','category_image'])->withErrors(['msg'=>'Sorry, sub category not updated ']);
            }
            if(!empty($subcategory_image)){
                $destinationPath = 'uploads/categories';
                $img_file = $subcategory_image->move($destinationPath,time().$subcategory_image->getClientOriginalName());
                
            }else{
                $img_file = $sub_category->image;   
            }
            
            $sub_category->update(['category_id' =>$category_id ,
                                   'category_title' =>$subcategory_title , 
                                   'image'=>$img_file]);
        }
		
         $categories = Category::all();    
         $sub_categories = SubCategory::all();    
         return redirect()->route('productsSubCategories')->with(['categories'=>$categories,'sub_categories'=>$sub_categories]);
    }    
    
}
