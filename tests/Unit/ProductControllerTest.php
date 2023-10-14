<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Product;
use App\Http\Controllers\Api\ProductController;

class ProductControllerTest extends TestCase
{
    public function testStore()
    {
        $controller = new ProductController();

        $request = new Request([
            'name' => 'Test Product',
            'price' => 10.99,
            'stock' => 20,
            'description' => 'Test Description',
            'status' => true,
            'subcategory_id' => 1
        ]);

        $response = $controller->store($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Product created successfully!', $response->json('message'));
    }

    public function testShow()
    {
        // Crea una instancia del controlador
        $controller = new ProductController();

        // Crea una instancia simulada del modelo Product con un ID específico
        $product = factory(Product::class)->create();

        // Ejecuta el método `show` con el ID del producto
        $response = $controller->show($product->id);

        // Verifica que la respuesta sea la instancia correcta del modelo Product
        $this->assertInstanceOf(Product::class, $response);
        $this->assertEquals($product->id, $response->id);
    }

    public function testUpdate()
    {
        // Crea una instancia del controlador
        $controller = new ProductController();

        // Crea una instancia simulada del modelo Product con datos de prueba
        $product = factory(Product::class)->create();

        // Crea una instancia de la clase Request con los datos requeridos para la actualización
        $request = new Request([
            'id' => $product->id,
            'name' => 'Updated Product',
            'price' => 19.99,
            'stock' => 30,
            'description' => 'Updated Description',
            'status' => true,
            'subcategory_id' => 2
        ]);

        // Ejecuta el método `update` y obtén la respuesta
        $response = $controller->update($request, $product->id);

        // Verifica que la respuesta sea la instancia actualizada del modelo Product
        $this->assertInstanceOf(Product::class, $response);
        $this->assertEquals('Updated Product', $response->name);
        // ... verifica las otras propiedades actualizadas si es necesario
    }

    public function testDestroy()
    {
        // Crea una instancia del controlador
        $controller = new ProductController();

        // Crea una instancia simulada del modelo Product con un ID específico
        $product = factory(Product::class)->create();

        // Ejecuta el método `destroy` con el ID del producto
        $response = $controller->destroy($product->id);

        // Verifica que la respuesta sea la instancia eliminada del modelo Product
        $this->assertInstanceOf(Product::class, $response);
        $this->assertEquals(0, Product::count()); // Verifica que el producto se haya eliminado en la base de datos
    }

    public function testDiscountCalculator()
    {
        // Crea una instancia del controlador
        $controller = new ProductController();

        // Crea instancias simuladas del modelo Product con diferentes cantidades de stock
        $product1 = factory(Product::class)->create(['stock' => 50]);
        $product2 = factory(Product::class)->create(['stock' => 100]);
        $product3 = factory(Product::class)->create(['stock' => 200]);

        // Ejecuta el método `discountCalculator`
        $response = $controller->discountCalculator();

        // Verifica que la respuesta sea una instancia de colección de productos
        $this->assertInstanceOf(Collection::class, $response);

        // Verifica que solo los productos con más de 100 unidades de stock hayan sido descontados
        $this->assertCount(1, $response);
        $this->assertEquals($product2->id, $response->first()->id); // Verifica que el producto descontado sea el correcto
    }

}
