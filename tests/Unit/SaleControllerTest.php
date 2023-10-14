<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Sales;
use App\Http\Controllers\Api\SaleController;

class SaleControllerTest extends TestCase
{
    // Prueba para el método store
    public function testStore()
    {
        $request = new Request();
        $request->date_time = "2022-01-01 12:00:00";
        $request->taxes = 10;
        $request->total = 100;
        $request->status = true;
        $request->client_id = 1;
        $request->user_id = 1;
        $request->voucher_id = 1;

        $salesController = new SalesController();
        $response = $salesController->store($request);

        $this->assertEquals('Sale created successfully!', $response->original['message']);
        // Verificar que se haya creado correctamente la venta y se haya devuelto el mensaje esperado
    }

    // Prueba para el método show
    public function testShow()
    {
        $id = 1;

        $salesController = new SalesController();
        $response = $salesController->show($id);

        $this->assertInstanceOf(Sales::class, $response);
        // Verificar que la venta con el ID especificado se devuelva correctamente
    }

    // Prueba para el método update
    public function testUpdate()
    {
        $request = new Request();
        $request->id = 1;
        $request->date_time = "2022-01-01 12:00:00";
        $request->taxes = 12;
        $request->total = 120;
        $request->status = true;
        $request->client_id = 1;
        $request->user_id = 1;
        $request->voucher_id = 1;

        $salesController = new SalesController();
        $response = $salesController->update($request);

        $this->assertInstanceOf(Sales::class, $response);
        $this->assertEquals('Sale updated successfully!', $response->original['message']);
        // Verificar que la venta con el ID especificado se actualice correctamente y se devuelva el mensaje esperado
    }

    // Prueba para el método destroy
    public function testDestroy()
    {
        $id = 1;

        $salesController = new SalesController();
        $response = $salesController->destroy($id);

        $this->assertTrue($response);
        // Verificar que la venta con el ID especificado se elimine correctamente
    }

    // Prueba para la función discount
    public function testDiscount()
    {
        $salesController = new SalesController();
        $totalVenta = 600;

        $descuento = $salesController->discount($totalVenta);

        $this->assertEquals(300, $descuento);
        // Verificar que el descuento calculado para la venta sea el esperado
    }
}
