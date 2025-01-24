<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SortModelController;
use App\Http\Controllers\ImageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('projects', ProjectController::class);

    Route::post('/sort', [SortModelController::class, 'store'])->name('sort.store');

    route::post('/image', [ImageController::class, 'store'])->name('image.store');

    Route::get('/API', [APIController::class, 'edit'])->name('api.edit');
    Route::post('/API', [APIController::class, 'store'])->name('api.store');
});

require __DIR__ . '/auth.php';
