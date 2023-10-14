<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sales_details;

class Sale_DetailsController extends Controller
{
    
    public function index()
    {
        $sales_details=Sales_details::join('products','products.id','=', 'sale_details.product_id')
        ->get(['sale_details.id', 'sale_details.quantity','sale_details.price','sale_details.sale_id', 
        'products.name as Product']);

        return $sales_details;      
    }

    
    public function store(Request $request)
    {
        $sale_d = new Sales_details();
        $sale_d->quantity=$request->quantity;
        $sale_d->price=$request->price;
        $sale_d->sale_id=$request->sale_id;
        $sale_d->product_id=$request->product_id;
        $sale_d->save();
        
    }

   
    public function show($id)
    {
        $sale_d= Sales_details::find($id);
        return $sale_d;
    }

    public function update(Request $request)
    {
        $sale_d =Sales_details::findOrFail($request->id);
        $sale_d->quantity=$request->quantity;
        $sale_d->price=$request->price;
        $sale_d->sale_id=$request->sale_id;
        $sale_d->product_id=$request->product_id;
        $sale_d->save();

        return $sale_d;

    }

    public function destroy($id)
    {
        $sale_d=Sales_details::destroy($id);
        return $sale_d;
    }

    function afterSale($productoId)
{
    // Encuentra el producto en la base de datos
    $producto = Product::find($productoId);
  
    // Verifica si el producto existe
    if (!$producto) {
        return false;
        // Opcionalmente, lanzar una excepción o manejar el error de otra manera
    }
  
    // Reducir la cantidad disponible en 1
    $producto->stock -= 1;
  
    // Guardar los cambios en la base de datos
    $producto->save();
  
    return true;
}

}