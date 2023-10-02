<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Middleware\Authenticate;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\Sale_DetailsController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use App\Models\SubCategory;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\VoucherController; 


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::controller(ClientController::class)->group(function () {
    Route::get('/clients','index');
});

Route::controller(VoucherController::class)->group(function () {
    Route::get('/vouchers','index');
});

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/productsxsubcategory', [SubCategoryController::class,'showProductxSubcategory']);

//To verify from middleware
Route::middleware('auth:api')->get('/details', [AuthController::class, 'getTaskList']); 


//--------------------ROUTES W/ AUTH--------------------------
Route::middleware('auth:api')->group(function () {

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories', 'index');
        Route::post('/category', 'store');
        Route::get('/category/{id}', 'show');
        Route::put('/category/{id}', 'update');
        Route::delete('/category/{id}', 'destroy');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::post('/product', 'store');
        Route::get('/product/{id}', 'show');
        Route::get('/menu', 'show_menu');
        Route::put('/product/{id}', 'update');
        Route::delete('/product/{id}', 'destroy');
    });

    Route::controller(Sale_DetailsController::class)->group(function () {
        Route::get('/sales_details', 'index');
        Route::post('/sale_detail', 'store');
        Route::get('/sale_detail/{id}', 'show');
        Route::put('/sale_detail/{id}', 'update');
        Route::delete('/sale_detail/{id}', 'destroy');
    });

    Route::controller(SaleController::class)->group(function () {
        Route::get('/sales', 'index');
        Route::post('/sale', 'store');
        Route::get('/sale/{id}', 'show');
        Route::put('/sale/{id}', 'update');
        Route::delete('/sale/{id}', 'destroy');
    });
  

    Route::controller(SubCategoryController::class)->group(function () {
        Route::get('/subcategories', 'index');
        Route::post('/subcategory', 'store');
        Route::get('/subcategory/{id}', 'show');
        Route::put('/subcategory/{id}', 'update');
        Route::delete('/subcategory/{id}', 'destroy');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index');
        Route::get('/user/{id}', 'show');
        Route::delete('/user/{id}', 'destroy');
    });
});
