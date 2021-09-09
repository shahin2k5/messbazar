<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use App\User;
use Hash;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['status' => 'error','error' => 'Unauthorized'], 401);
        }
		$user = auth()->guard('api')->user();
		$user->token = $token;
		return response()->json(['status' => 'success','user'=>$user]); 
        return $this->respondWithToken($user);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */


     /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */

      /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
	
	public function authRegistration(Request $request){
		$validate = Validator::make($request->all(),[
			'house_mess_name'=>'required',
			'user_full_name'=>'required',
			'user_mobile'=>'required',
			'full_address'=>'required',
			'email'=>'required',
			'password'=>'required',
			'confirm_password'=>'required',
			'checked'=>'required',
		]);
		
		if($validate->fails()){
			  return response()->json([
                'status' => "fail",
                'errors' => $validate->errors()
            ], 403);
		}
		try{
		$user = User::create([
			 'house_mess_name'=>request('house_mess_name'), 
			 'user_full_name'=>request('user_full_name'), 
			 'full_address'=>request('full_address'), 
			 'user_mobile'=>request('user_mobile'), 
			 'mess_member'=>request('mess_member'), 
			 'user_type'=>request('user_type'), 
			 'branch_name'=>request('branch_name'), 
			 'current_meal_manager'=>request('current_meal_manager'), 
			 'current_meal_manager_mobile'=>request('current_meal_manager_mobile'), 
			 'current_rice_manager'=>request('current_rice_manager'), 
			 'current_rice_manager_mobile'=>request('current_rice_manager_mobile'), 
			 'email'=>request('email'), 
			 'password'=>Hash::make(request('password')), 
			 'remember_token'=>Hash::make("messbazar")
		]);
		$credentials = $request->only(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['status' => 'fail','error' => 'Unauthorized'], 401);
        }
		$user = auth()->guard('api')->user();
		$user->token = $token;
		return response()->json(['status' => 'success','user'=>$user]); 
    
	
		}catch(Exception $ex){
			 return response()->json([
                'status' => 'fail',
                'errors' => $ex->getMessage()
            ], 403);
		}
		
		
	}
}
