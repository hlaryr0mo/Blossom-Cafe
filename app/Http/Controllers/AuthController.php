<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|min:4',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->error());
        }

        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);

        $responseArray = [];
        $responseArray['token'] = $user->createToken('MyApp')->accessToken;
        $responseArray['name'] = $user->name;
        return response()->json($responseArray, 200);
    }
    
    public function login(Request $request){
        if (Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
            $user = Auth::user();
            $responseArray = [];
            /** @var App\Models\User $user **/
            $responseArray['token'] = $user->createToken('MyApp')->accessToken;
            $responseArray['name'] = $user->name;
            return response()->json($responseArray, 200);
        } else {
            return response()->json(['error'=>'Unauthorised'], 203);
        }
    }

    public function getTaskList(){
        $data = User::all();
        $responseArray = [
            'status' =>'ok',
            'res'=>$data
        ];
        return response()->json(['results'=>$responseArray],200);
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful'], 200);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function show_test (Request $request){
        $user = User::where('email', $request->email)->get();
        return $user;
    }
}
