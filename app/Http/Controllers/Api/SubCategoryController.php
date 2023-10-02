<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubCategory;
use Illuminate\Support\File;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;



class SubCategoryController extends Controller
{
    
    public function index()
    {
        $subcategories=SubCategory::join('categories','categories.id','=', 'subcategories.category_id')
        ->get(['subcategories.id', 'subcategories.nameSub','subcategories.description','subcategories.image', 
        'categories.nameCategory as Category']);

        return $subcategories;
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'nameSub'=>'required|max:50',
            'description'=>'required|min:20',
            'image'=>'image|mimes:jpeg,png',
            'category_id'=>'required'

       ]);
        
        try{
            $subCategory= new SubCategory();
            $subCategory ->nameSub = $request->input('nameSub');
            $subCategory ->description = $request->input('description');
            $subCategory ->image = $request->file('image')->store('subcategory');
            $subCategory ->category_id = $request->input('category_id');
            $subCategory->save();
           

            return response()->json([
                'message'=>'SubCategory created successfully!'
            ]);
        }catch(\Exception $e){
            

            return response()->json([
                'message'=>'Something goes wrong while creating a subCategory!'
            ], 500);
        }
    }

    
    public function show($id)
    {
        $subCategory= SubCategory::find($id);
        return $subCategory;
    }

    
    public function update(Request $request)
    {   
        try{    
        $subCategory = SubCategory::findOrFail($request->id);
        $subCategory->nameSub=$request->nameSub;
        $subCategory->description=$request->description;
        $subCategory->category_id=$request->category_id;
        $subCategory->save();

        return $subCategory;
        
                return response()->json([
                    'message'=>'SubCategory update successfully!'
                ]);


         } catch(\Exception $e){
            

            return response()->json([
                'message'=>'Something goes wrong while updating a subCategory!'
            ], 500);
        }
    }

    
    public function destroy($id)
    {
        $subCategory= SubCategory::destroy($id);
        return $subCategory;
    }

    public function showProductxSubcategory(Request $request){
        $subCategory = SubCategory::find($request->id);
        $products = [];

        foreach($subCategory->products as $product){
            $products[] = [
                "name" => $product->name,
                "price" => $product->price,
                "description" => $product->description,
            ];
        }
        
        //return response()->json(['students'=>$program->students], 200);
        return response()->json($products);
    }
}
