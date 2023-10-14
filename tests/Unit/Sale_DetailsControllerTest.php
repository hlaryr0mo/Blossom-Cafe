<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Sales_details;
use App\Http\Controllers\Api\Sale_DetailsController;

class Sale_DetailsControllerTest extends TestCase
{
    public function testStore()
    {
        $request = new Request();
        $request->quantity = 1;
        $request->price = 10;
        $request->sale_id = 1;
        $request->product_id = 1;

        $salesDetailsController = new SalesDetailsController();
        $response = $salesDetailsController->store($request);

        $this->assertInstanceOf(Sales_details::class, $response);
        // Verificar que se haya creado el objeto Sale_details en la base de datos y devuelto correctamente
    }

    public function testShow()
    {
        $id = 1;

        $salesDetailsController = new SalesDetailsController();
        $salesDetailsController->show($id);

        $this->assertInstanceOf(Sales_details::class, $response);
        // Verificar que el objeto Sale_details con el ID especificado se devuelva correctamente
    }

    public function testUpdate()
    {
        $request = new Request();
        $request->id = 1;
        $request->quantity = 2;
        $request->price = 20;
        $request->sale_id = 1;
        $request->product_id = 1;

        $salesDetailsController = new SalesDetailsController();
        $response = $salesDetailsController->update($request);

        $this->assertInstanceOf(Sales_details::class, $response);
        // Verificar que el objeto Sale_details con el ID especificado se actualice correctamente
    }

    // Prueba para el método destroy
    public function testDestroy()
    {
        $id = 1;

        $salesDetailsController = new SalesDetailsController();
        $response = $salesDetailsController->destroy($id);

        $this->assertTrue($response);
        // Verificar que el objeto Sale_details con el ID especificado se elimine correctamente
    }

    // Prueba para el método afterSale
    public function testAfterSale()
    {
        $productoId = 1;

        $salesDetailsController = new SalesDetailsController();
        $response = $salesDetailsController->afterSale($productoId);

        $this->assertTrue($response);
        // Verificar que se actualice correctamente el stock del producto después de una venta
    }


}
