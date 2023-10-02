<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    
    use HasFactory;

    protected $fillable =['name','description', 'image', 'category_id',];
    protected $table = 'subcategories';

    public function categories(){
        return $this-> belongsTo(Category::class, 'category_id','id');
    }

    public function product(){
        return $this->hasMany(Product::class, 'id');
    }

}

