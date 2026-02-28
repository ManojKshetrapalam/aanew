<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TravelRequestController;
use App\Http\Controllers\Api\Admin\CRMController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Travel API Routes
Route::get('/travel', [TravelRequestController::class, 'index']);
Route::post('/travel', [TravelRequestController::class, 'store']);
Route::post('/itineraries/{itinerary}/select', [TravelRequestController::class, 'select']);

// Admin CRM API Routes
Route::prefix('admin')->group(function () {
    Route::get('/crm', [CRMController::class, 'index']);
    Route::patch('/crm/{lead}', [CRMController::class, 'update']);
});