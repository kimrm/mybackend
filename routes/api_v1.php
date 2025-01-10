<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Healthcheck route
    Route::get('/healthcheck', function () {
        return response()->json(['status' => 'ok']);
    });

    // Authenticated routes group
    Route::middleware('auth:sanctum')->group(function () {

        // Contact request route
        Route::post('/contact', 'App\Http\Controllers\Api\ContactRequestController@store');

        // Projects routes
        Route::resource('projects', 'App\Http\Controllers\Api\ProjectController')->only(['index', 'show']);
    });
});
