<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Category;
use App\Http\Controllers\Api\CategoryController;

class CategoryControllerTest extends TestCase
{
    public function testStore()
    {
        // Crea una instancia del controlador
        $controller = new CategoryController();

        // Crea una instancia de la clase Request con los datos requeridos para crear una categoría
        $request = new Request([
            'nameCategory' => 'New Category',
            'description' => 'New Category Description'
        ]);

        // Ejecuta el método `store`
        $response = $controller->store($request);

        // Verifica que se haya creado una nueva categoría en la base de datos
        $this->assertDatabaseHas('categories', [
            'nameCategory' => 'New Category',
            'description' => 'New Category Description'
        ]);
    }

    public function testShow()
    {
        // Crea una instancia del controlador
        $controller = new CategoryController();

        // Crea una instancia simulada del modelo Category con un ID específico
        $category = factory(Category::class)->create();

        // Ejecuta el método `show` con el ID de la categoría
        $response = $controller->show($category->id);

        // Verifica que la respuesta sea la instancia correcta del modelo Category
        $this->assertInstanceOf(Category::class, $response);
        $this->assertEquals($category->id, $response->id);
    }

    public function testUpdate()
    {
        // Crea una instancia del controlador
        $controller = new CategoryController();

        // Crea una instancia simulada del modelo Category con datos de prueba
        $category = factory(Category::class)->create();

        // Crea una instancia de la clase Request con los datos requeridos para la actualización
        $request = new Request([
            'id' => $category->id,
            'nameCategory' => 'Updated Category',
            'description' => 'Updated Category Description'
        ]);

        // Ejecuta el método `update` y obtén la respuesta
        $response = $controller->update($request);

        // Verifica que la respuesta sea la instancia actualizada del modelo Category
        $this->assertInstanceOf(Category::class, $response);
        $this->assertEquals('Updated Category', $response->nameCategory);
        // ... verifica las otras propiedades actualizadas si es necesario
    }

    public function testDestroy()
    {
        // Crea una instancia del controlador
        $controller = new CategoryController();

        // Crea una instancia simulada del modelo Category con un ID específico
        $category = factory(Category::class)->create();

        // Ejecuta el método `destroy` con el ID de la categoría
        $response = $controller->destroy($category->id);

        // Verifica que la respuesta sea la instancia eliminada del modelo Category
        $this->assertInstanceOf(Category::class, $response);
        $this->assertEquals(0, Category::count()); // Verifica que la categoría se haya eliminado en la base de datos
    }
}
