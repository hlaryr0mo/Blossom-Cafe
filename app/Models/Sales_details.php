<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales_details extends Model
{
    use HasFactory;
    protected $fillable =['quantity', 'price', 'sale_id', 'product_id'];
    protected $table = 'sale_details';


    public function sale(){
        return $this->belongsTo(Sales::class, 'id');
    }
    public function product(){
        return $this->belongsTo(Product::class, 'id');
    }
}

