<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::orderBy('name')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Add validation

        $this->validate($request,[
            "name" => "required|string|max:191",
            "email" => "required|string|max:191|email|unique:users",
            "password" =>  [
                            'required',
                            'confirmed',
                            'string',
                            'min:8',             // must be at least 10 characters in length
                            'regex:/[a-z]/',      // must contain at least one lowercase letter
                            'regex:/[A-Z]/',      // must contain at least one uppercase letter
                            'regex:/[0-9]/',      // must contain at least one digit
                            'regex:/[@$!%*#?&]/', // must contain a special character
                        ],
            'password_confirmation' => 'required|min:8'

        ]);


        $request['password'] = Hash::make($request['password']);

       $request['photo'] = is_null($request['photo']) ? 'profile.png' : $request['photo'];

       $userObject = new User($request->all());

       $userObject->save();

       return response(

           ["data"=>$userObject],Response::HTTP_CREATED
       );
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $this->validate($request,[
            "name" => "required|string|max:191",
            "email" => "required|string|max:191|email|unique:users,email, " . $user->id,
        ]);

        $user->update($request->all());

        $user = User::findOrFail($id);

        return response(
            new UserResource($user),Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response(null,Response::HTTP_OK);
    }
}
