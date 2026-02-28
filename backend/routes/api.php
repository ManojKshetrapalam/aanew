<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TravelRequestController;
use App\Http\Controllers\NeuralApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Travel API Routes
Route::get('/travel', [TravelRequestController::class, 'index']);
Route::post('/travel', [TravelRequestController::class, 'store']);
Route::post('/itineraries/{itinerary}/select', [TravelRequestController::class, 'select']);

// Neural AI Routes
Route::post('/neural/profile', [NeuralApiController::class, 'getGuestProfile']);
Route::post('/neural/assess', [NeuralApiController::class, 'assessCandidate']);
Route::get('/neural/stats', [NeuralApiController::class, 'getGlobalStats']);