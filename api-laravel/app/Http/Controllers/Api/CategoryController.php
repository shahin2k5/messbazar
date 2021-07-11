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


    public function getcategoryall($deviceid="")
    {
        $category = Category::all();
        $products = Product::all();
        $carts = Cart::where('device_id', $deviceid)->where('cart_status','pending')->
		with('cartItem')->with('cartItem.product')->first();


        return response()->json([
			'category_list'=>$category,
			'product_list'=>$products,
			'cart_list'=>$carts,
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
						get();

        return response()->json($products);
    }
	
	public function getproductDetails($productid)
    {
        $products = Product::where('id', $productid)->first();

        return response()->json($products);
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
		$purchase_price = $request->get('purchase_price');
		$sale_price = $request->get('sale_price');
		$discount = $request->get('discount');
		$final_sale_price = $request->get('final_sale_price');
		$product_qnty = $request->get('product_qnty');
		$product_pcs = $request->get('product_pcs');
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
		$cartItemSubTotal = 0;


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
			$cartItemQnty = $cartItem->product_qnty+1;
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
		
		// $cart->total_purchase_price	= $cart->total_purchase_price +  $cartItemTotalPurchase;	
		// $cart->total_sale_price = $cart->total_sale_price+$cartItemTotalSale;
		// $cart->total_discount = $cart->total_discount+$cartItemTotalDiscount;
		// $cart->total_final_price = $cart->total_final_price+$cartItemSubTotal;
		// $cart->total_profit = $cart->total_profit+$cartItemTotalProfit;
		// $cart->product_qnty = $cart->product_qnty+1;
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
	
	public function cartUpdate(Request $request)
    {
		$device_id = $request->get('device_id');
		$cart_item_id = $request->get('id');
		$cartItem = CartItem::where('id',$cart_item_id)->first();
		$cart = Cart::where('id',$cartItem->cart_id)->first();
		
		$product_id = $request->get('product_id');
		$purchase_price = $request->get('purchase_price');
		$sale_price = $request->get('sale_price');
		$discount = $request->get('discount');
		$final_sale_price = $request->get('final_sale_price');
		$product_qnty = $request->get('product_qnty');
		$product_pcs = $request->get('product_pcs');
		$subtotal_price = $product_qnty * $final_sale_price;
		
        if(empty($cart)){
			// $cart = Cart::update([
								// 'device_id'=>$request->get('device_id'), 
								// 'total_purchase_price'=>500, 
								// 'total_sale_price'=>650, 
								// 'total_discount'=>50, 
								// 'total_final_price'=>600, 
								// 'total_profit'=>100, 
								// 'cart_status'=>'pending', 
								// 'cart_by'=>'user name', 
								// 'notes'=>''
							// ]);
			// $cart->product_qnty = $cart->product_qnty+1;
			// $cart->save();
			
			
			//cart_items **************************
			 // `customer_id`, 
			 // `cart_id`, 
			 // `product_id`, 
			 // `purchase_price`, 
			 // `sale_price`, 
			 // `discount`, 
			 // `final_sale_price`, 
			 // `unit_type`, 
			 // `pcs`, 
			 // `product_qnty`, 
			 // `product_pcs`, 
			 // `subtotal_price`, 
			 // `status`
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
			$cart = Cart::where('device_id',$device_id)->
					where('cart_status','pending')->first();
			//$user = User::where('id',$cart->customer_id)->first();
			
			
			if(!empty($cart)){
				$cartItem = CartItem::where('cart_id', $cart->id)->get();
			}
			$order = Order::create([
					'customer_id'=>$cart->customer_id, 
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
					'customer_id'=>$cart->customer_id,
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
							'customer_id'=>$request->get('customer_id'), 
							'cart_id'=>$cart->id, 
							'order_id'=>$order->id, 
							'house_mess_name'=>$request->get('house_mess_name'), 
							'user_full_name'=>$request->get('user_full_name'), 
							'full_address'=>$request->get('full_address'), 
							'user_mobile'=>$request->get('user_mobile'), 
							'user_type'=>$request->get('user_type'), 
							'branch_name'=>$request->get('branch_name'), 
							'notes'=>'unverified'
			]);
			$updateCart = Cart::where('id',$cart->id)->update(['cart_status'=>'confirmed']);
			$updateCartItem = CartItem::where('cart_id', $cart->id)->update(['status'=>'confirmed']);
			return response()->json([
				'status'=>'success',
				'data_type'=>'cart_confirmed',
				'data'=>$order_items,
			]);
		}catch(Exception $ex){
			return response()->json([
			'status'=>'error',
			'data'=>$ex->getMessage()
		],403);
		}
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
}
