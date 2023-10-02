<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;
    protected $fillable =['data_time', 'taxes', 'total','status','client_id', 'user_id','voucher_id'];
    protected $table = 'sales';


    public function voucher(){
        return $this->belongsTo(Voucher::class, 'id');
    }

    public function client(){
        return $this->belongsTo(Clients::class, 'id');
    }

    public function sale_details(){
        return $this->hasMany(Sales_details::class, 'id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'id');
    }
}
