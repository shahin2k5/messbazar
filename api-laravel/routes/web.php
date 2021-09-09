<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});
Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', 'Api\\UserController@login');


//Clear Route cache:
Route::get('/route-clear', function() {

    $exitCode = Artisan::call('route:clear');
    $exitCode = Artisan::call('view:clear');
    
    
    return '<h1>View cache cleared</h1>';
   
});

Route::group(['middleware'=>'auth'], function () {
    Route::get('/users/list', 'Api\\UserController@usersList');
    Route::get('/users/delete-user/{id}', 'Api\\UserController@deleteUser');
    Route::get('/dashboard', 'Api\\UserController@dashboard');
    Route::get('/logout', 'Api\\UserController@logout');
    
    //saels orders
    Route::get('/sales/orders', 'Api\\CategoryController@salesOrders');
    Route::get('/user/sales/orders/{customer_id}', 'Api\\CategoryController@userSalesOrders');
    Route::get('/sales/edit-orders/{order_id}', 'Api\\CategoryController@editSalesOrders');
    Route::post('/sales/edit-orders/{order_id}', 'Api\\CategoryController@postEditSalesOrders');
    
    Route::get('/products/products', 'Api\\CategoryController@productsProducts')->name('productsProducts');
    Route::get('/products/edit-products/{id}', 'Api\\CategoryController@editProductsProducts');
    Route::get('/products/add-products', 'Api\\CategoryController@addProductsProducts');
    Route::post('/products/post-products', 'Api\\CategoryController@postAddProductsProducts');
    Route::post('/products/post-edit-products', 'Api\\CategoryController@postEditProductsProducts');
    Route::get('/products/delete-products/{id}', 'Api\\CategoryController@deleteProductsProducts');
     
     
    Route::get('/products/categories', 'Api\\CategoryController@productsCategories')->name('productsCategories');
    Route::get('/products/edit-categories/{id}', 'Api\\CategoryController@editProductsCategories');
    Route::post('/products/post-edit-categories', 'Api\\CategoryController@editPostProductsCategories');
    Route::get('/products/add-categories', 'Api\\CategoryController@addProductsCategories');
    Route::post('/products/post-categories', 'Api\\CategoryController@postAddProductsCategories');
    Route::get('/products/delete-categories/{id}', 'Api\\CategoryController@deleteProductsCategories');
    
    Route::get('/products/sub-categories', 'Api\\CategoryController@productsSubCategories')->name('productsSubCategories');
    Route::get('/products/edit-sub-categories/{id}', 'Api\\CategoryController@editProductsSubCategories');
    Route::get('/products/add-sub-categories', 'Api\\CategoryController@addProductsSubCategories');
    Route::post('/products/post-sub-categories', 'Api\\CategoryController@postAddProductsSubCategories');
    Route::post('/products/post-edit-sub-categories', 'Api\\CategoryController@postEditProductsSubCategories');
    Route::get('/products/delete-sub-categories/{id}', 'Api\\CategoryController@deleteProductsSubCategories');
    
    
    
});

