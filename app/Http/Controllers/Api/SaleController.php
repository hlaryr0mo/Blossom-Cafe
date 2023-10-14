<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sales;

class SaleController extends Controller
{
    
    public function index()
    {
        $sales=Sales::join('clients','clients.id','=', 'sales.client_id')
        ->join('users', 'users.id','=', 'sales.user_id')
        ->join('vouchers', 'vouchers.id','=', 'sales.voucher_id')
        ->get(['sales.id', 'sales.date_time','sales.taxes','sales.total','sales.status', 
        'clients.name as clientsName', 'users.name as userName', 'vouchers.name as voucherName']);

        return $sales;
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_time'=>'required|date',
            'taxes'=>'required|numeric',
            'total'=>'required|numeric',
            'status'=>'required|boolean',
            'client_id'=>'required',
            'user_id'=>'required',
            'voucher_id'=>'required'

       ]);
       try{
        $sale = new Sales();
        $sale->date_time= $request->date_time;
        $sale->taxes= $request->taxes;
        $sale->total= $request->total;
        $sale->status= $request->status;
        $sale->client_id = $request->client_id ;
        $sale->user_id= $request->user_id;
        $sale->voucher_id= $request->voucher_id;
        $sale->save();
        return response()->json([
            'message'=>'Sale created successfully!'
        ]);
    }catch(\Exception $e){
        
        return response()->json([
            'message'=>'Something goes wrong while creating a Sale!'
        ], 500);
    }
}

    public function show($id)
    {
        $sale= Sales::find($id);
        return $sale;
    }

    public function update(Request $request)
    {
        try{
            $sale = Sales::findOrFail($request->id);
            $sale->date_time= $request->date_time;
            $sale->taxes= $request->taxes;
            $sale->total= $request->total;
            $sale->status= $request->status;
            $sale->client_id = $request->client_id ;
            $sale->user_id= $request->user_id;
            $sale->voucher_id= $request->voucher_id;
            $sale->save();
    
            return $sale;
            return response()->json([
                'message'=>'Sale updated successfully!'
            ]);
        }catch(\Exception $e){
            
            return response()->json([
                'message'=>'Something goes wrong while updating a Sale!'
            ], 500);
        }
    }
    
    public function destroy($id)
    {
        $sale=Sales::destroy($id);
        return $sale;
        
    }

    function discount($totalVenta)
{
    if ($totalVenta >= 500) {
        $descuento = $totalVenta * 0.5;
    } elseif ($totalVenta >= 200) {
        $descuento = $totalVenta * 0.2;
    } elseif ($totalVenta >= 100) {
        $descuento = $totalVenta * 0.1;
    } else {
        // Si el total de la venta no supera ninguna de las condiciones, no se aplica descuento
        $descuento = 0;
    }
    return $descuento;
}

}
