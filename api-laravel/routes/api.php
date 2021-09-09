<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Api\\AuthController@login');
Route::post('auth/registration', 'Api\\AuthController@authRegistration');
Route::get('category/lists', 'Api\\CategoryController@getcategories');
Route::get('category/list/{deviceid}', 'Api\\CategoryController@getcategoryall');
Route::get('subcategory/list/{catid}', 'Api\\CategoryController@subcategory');
Route::get('product/list/{subcatid}', 'Api\\CategoryController@getproductlist');
Route::get('productdetails/{productid}/{device_id}', 'Api\\CategoryController@getproductDetails');
Route::get('getcurrentcartlist/{cartid}', 'Api\\CategoryController@getCurrentCartList');
Route::get('getcartlistbycartid/{cartid}', 'Api\\CategoryController@getcartlistbycartid');
Route::get('getpreviouscartlist/{cartid}', 'Api\\CategoryController@getPreviousCartList');
Route::post('cartaddprepare', 'Api\\CategoryController@cartAddPrepare');
Route::post('cartadd', 'Api\\CategoryController@cartAdd');
Route::post('cartupdate', 'Api\\CategoryController@cartUpdate');
Route::post('cartconfirm', 'Api\\CategoryController@cartConfirm');
Route::get('cartremove/{cartitemid}', 'Api\\CategoryController@cartRemove');

Route::get('get_homepage_product_list', 'Api\\CategoryController@get_homepage_product_list');


Route::post('profile_update', 'Api\\CategoryController@profile_update');


Route::get('bigopti', 'Api\\CategoryController@getBigopti');
Route::get('offer', 'Api\\CategoryController@getOffer');
Route::get('coupon', 'Api\\CategoryController@getCoupon');
Route::get('settings', 'Api\\CategoryController@getSettings');

 
Route::group(['middleware' => 'apiJwt'], function () {
  Route::post('auth/logout', 'Api\\AuthController@logout');
  Route::get('users', 'Api\\UserController@index');
});