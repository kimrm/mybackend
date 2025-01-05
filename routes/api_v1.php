<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/healthcheck', function () {
        return response()->json(['status' => 'ok']);
    });
    Route::middleware('auth:sanctum')->post('/contact', 'App\Http\Controllers\Api\ContactRequestController@store');
});
