<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\GoogleCalendarController;

Route::prefix('v1')->group(function () {

    // Healthcheck route
    Route::get('/healthcheck', function () {
        return response()->json(['status' => 'ok']);
    });

    // Authenticated routes group
    Route::middleware('auth:sanctum')->group(function () {

        // Contact request route
        Route::post('/contact', 'App\Http\Controllers\Api\ContactRequestController@store');

        Route::resource('projects/featured', 'App\Http\Controllers\Api\FeaturedProjectController')
            ->only(['index']);

        // Projects routes
        Route::resource('projects', 'App\Http\Controllers\Api\ProjectController')
            ->only(['index', 'show'])
            ->parameters(['projects' => 'project:slug']);

        Route::post('/chat', [ChatController::class, 'streamResponse']);

        Route::get('/calendar/available-events', [GoogleCalendarController::class, 'listAvailableEvents']);
        Route::get('/calendar/events', [GoogleCalendarController::class, 'listEvents']);
    });
});
