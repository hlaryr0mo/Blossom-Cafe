<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    
    public function index()
    {
        $users=User::all();
        return $users;
    }

    
    public function store(Request $request)
    {
        $user = new User();
        $user->name=$request->name;
        $user->last_nameF=$request->last_nameF;
        $user->last_nameM=$request->last_nameM;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->confirm_password=$request->confirm_password;
        $user->phone=$request->phone;
        $user->age=$request->age;
        $user->remember_token=$request->remember_token;
        $user->role_id=$request->role_id;
        $user->gender_id=$request->gender_id;
        $user->save();

    }

    
    public function show($id)
    {
        $user= User::find($id);
        return $user;
    }

    
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->name=$request->name;
        $user->last_nameF=$request->last_nameF;
        $user->last_nameM=$request->last_nameM;
        $user->email=$request->email;
        $user->password=$request->password ;
        $user->confirm_password=$request->confirm_password;
        $user->phone=$request->phone;
        $user->age=$request->age;
        $user->remember_token=$request->remember_token;
        $user->role_id=$request->role_id;
        $user->gender_id=$request->gender_id;
        $user->save();

        return $user;

        
    }

    
    public function destroy($id)
    {
        $user= User::destroy($id);
        return $user;
    }
}
