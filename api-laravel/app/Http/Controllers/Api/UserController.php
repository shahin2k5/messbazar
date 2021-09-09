<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderAddress;
use Illuminate\Http\Request;
use Validator;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }
    
    
    public function login(Request $request){
		$email = request()->get('email');
		$password = request()->get('password');
		$validate = Validator::make($request->all(),[
			'email'=>'required|email',
			'password'=>'required'
		]);
		if($validate->fails()){
			return response()->json([
				'status'=>'fail',
				'errors'=>$validate->errors()
			],403);
		}
		
		if(Auth::attempt(['email'=>$email,'password'=>$password,'user_type'=>'admin'])){
			return redirect()->to('/dashboard');
		}else{
			return redirect()->back()->withInput(request(['email']))->withErrors(['email'=>'The email/password is invalid!']);
		}
	}


	public function dashboard(){
		return view('admin.dashboard');
	}	
	
	public function usersList(){
	    $users = User::paginate(20);
		return view('admin.users-list')->with(['users'=>$users]);
	}	
	
	public function deleteUser($id=null){
	    if($id){
	        $user = User::where('id',$id)->first();
	        if($user->user_type=="admin"){
	            $users = User::paginate(20);
		        return redirect()->to('/users/list')->with(['users'=>$users]);
	        }
	        Cart::where('customer_id',$id)->delete();
	        CartItem::where('customer_id',$id)->delete();
	        Order::where('customer_id',$id)->delete();
	        OrderItem::where('customer_id',$id)->delete();
	        OrderAddress::where('customer_id',$id)->delete();
	        User::where('id',$id)->delete();
	    }
	    $users = User::paginate(20);
		return redirect()->to('/users/list')->with(['users'=>$users]);
	}
	
	public function logout(){
		Auth::logout();
		return redirect('/');
	}
	

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
