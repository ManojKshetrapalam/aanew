<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Models\TravelRequest;
use App\Models\Itinerary;
use App\Services\OpenAIService;

class GenerateItineraryJob implements ShouldQueue
{
    use Queueable;

    protected $travelRequest;

    public function __construct(TravelRequest $travelRequest)
    {
        $this->travelRequest = $travelRequest;
    }

    public function handle(OpenAIService $openAIService): void
    {
        $itineraries = $openAIService->generateItineraries($this->travelRequest);

        if ($itineraries && is_array($itineraries)) {
            foreach ($itineraries as $data) {
                Itinerary::create([
                    'travel_request_id' => $this->travelRequest->id,
                    'data' => $data,
                ]);
            }

            $this->travelRequest->update(['status' => 'processed']);
        }
    }
}
