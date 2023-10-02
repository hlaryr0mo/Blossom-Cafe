<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products=Product::join('subcategories','subcategories.id','=', 'products.subcategory_id')
        ->get(['products.id', 'products.name','products.price','products.stock','products.description',
        'products.photo','products.status', 
        'subcategories.nameSub as Subcategory']);

        return $products;
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3',
            'price'=>'required|numeric',
            'stock'=>'required|numeric|min:10',
            'description'=>'required|min:20',
            'photo'=>'image|mimes:jpeg,png',
            'status'=>'required|boolean',
            'subcategory_id'=>'required'

       ]);
        
        try{
            $product= new Product();
            $product ->name = $request->input('name');
            $product ->price = $request->input('price');
            $product ->stock = $request->input('stock');
            $product ->description = $request->input('description');
            $product ->photo = $request->file('photo')->store('product');
            $product ->status = $request->input('status');
            $product ->subcategory_id = $request->input('subcategory_id');
            $product->save();
           

            return response()->json([
                'message'=>'Product created successfully!'
            ]);
        }catch(\Exception $e){
            
            return response()->json([
                'message'=>'Something goes wrong while creating a Product!'
            ], 500);
        }
    }
    

    
    public function show($id)
    {
        $product=Product::find($id);
        return $product;
    }

   
    public function update(Request $request, $id)
    {
        try{
        $product = Product::findOrFail($request->id);
        $product->name=$request->name;
        $product->price=$request->price;
        $product->stock=$request->stock;
        $product->description=$request->description;
        $product->status=$request->status;
        $product->subcategory_id=$request->subcategory_id;
        $product->save();

        return $product;

        return response()->json([
            'message'=>'Product updated successfully!'
        ]);
    }catch(\Exception $e){
        
        return response()->json([
            'message'=>'Something goes wrong while updating a Product!'
        ], 500);
    }
}

    

    
    public function destroy($id)
    {
        $product=Product::destroy($id);
        return $product;
    }

}

