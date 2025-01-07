<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class APIController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = $request->user()->createToken($request->name)->plainTextToken;

        return redirect()->route('api.edit')->with('success', 'Token created: ' . $token);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('API/Edit', [
            'tokens' => $request->user()->tokens,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
