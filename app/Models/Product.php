<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable =['name', 'price', 'stock', 'description', 'photo', 'subcategory_id'];
    protected $table = 'products';

    public function subCategory(){
        return $this->belongsTo(SubCategory::class, 'id');
    }

    public function sale_detail(){
        return $this->hasMany(Sales_details::class, 'id');
    }
}
