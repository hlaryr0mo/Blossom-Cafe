<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function testLoginReturnsTokenAndName()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);
        
        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);
        
        $response->assertStatus(200);
        $response->assertJson([
            'token' => $user->createToken('MyApp')->accessToken,
            'name' => $user->name,
        ]);
    }

    public function testLoginReturnsUnauthorised()
    {
        $response = $this->post('/login', [
            'email' => 'invalid@example.com',
            'password' => 'invalidpassword',
        ]);
        
        $response->assertStatus(203);
        $response->assertJson(['error' => 'Unauthorised']);
    }

    public function testRegisterReturnsTokenAndName()
    {
        $response = $this->post('/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'token',
            'name',
        ]);
    }

    public function testRegisterReturnsValidationError()
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'email' => 'invalid-email',
            'password' => 'short',
        ]);
        
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'error',
            'message',
            'errors' => [
                'name',
                'email',
                'password',
            ],
        ]);
    }

    public function testLogoutReturnsSuccessfulMessage()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post('/logout');
        
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Logout successful',
        ]);
    }
}
