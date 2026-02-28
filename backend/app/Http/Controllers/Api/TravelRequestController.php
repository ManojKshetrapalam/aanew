<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TravelRequest;
use App\Models\Itinerary;
use App\Models\CRMLead;
use App\Jobs\GenerateItineraryJob;
use Illuminate\Http\Request;

class TravelRequestController extends Controller
{
    public function index()
    {
        return response()->json(TravelRequest::with('itineraries')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'travel_type' => 'required|string',
        ]);

        $travelRequest = TravelRequest::create($validated);

        GenerateItineraryJob::dispatch($travelRequest);

        return response()->json([
            'message' => 'AI is generating your itineraries!',
            'data' => $travelRequest
        ], 201);
    }

    public function select(Request $request, Itinerary $itinerary)
    {
        $itinerary->update(['is_selected' => true]);

        $travelRequest = $itinerary->travelRequest;
        $travelRequest->update(['status' => 'selected']);

        CRMLead::create([
            'travel_request_id' => $travelRequest->id,
            'followup_status' => 'new',
        ]);

        return response()->json([
            'message' => 'Itinerary selected and pushed to CRM!'
        ]);
    }
}
