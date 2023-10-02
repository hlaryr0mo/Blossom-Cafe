<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    
    public function index()
    {
       $categories= Category::all();
       return $categories;
    }

    
    public function store(Request $request)
    {
      $category = new Category();
      $category->nameCategory =$request->nameCategory;
      $category->description= $request->description;
      
      $category->save();
    }

    
    public function show($id)
    {
       $category= Category::find($id);
       return $category;
    }

    public function update(Request $request)
    {
        $category = Category::findOrFail($request->id);
        $category->nameCategory = $request->nameCategory;
        $category->description = $request->description;
      
        $category->save();
        return $category;
    }

   
    public function destroy($id)
    {
     $category =Category::destroy($id);
     return $category;  
    }
}

