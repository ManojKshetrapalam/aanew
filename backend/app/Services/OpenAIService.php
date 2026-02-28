<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key');
    }

    public function generateItineraries($travelRequest)
    {
        $startDate = \Carbon\Carbon::parse($travelRequest->start_date);
        $endDate = \Carbon\Carbon::parse($travelRequest->end_date);
        $daysCount = $startDate->diffInDays($endDate) + 1;

        $prompt = $this->buildPrompt($travelRequest, $daysCount);

        try {
            $response = Http::withToken($this->apiKey)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are an expert travel planner. Return ONLY a JSON array of 3 distinct itinerary options. Ensure the days match the requested duration exactly.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->successful()) {
                $content = json_decode($response->json()['choices'][0]['message']['content'], true);
                $itineraries = $content['itineraries'] ?? $content;

                foreach ($itineraries as &$itinerary) {
                    $itinerary['image_url'] = $this->resolveImageUrl(
                        $itinerary['image_query'] ?? $travelRequest->destination,
                        $travelRequest->destination
                    );
                }
                return $itineraries;
            }

            Log::warning('OpenAI API Error (Falling back to mock): ' . $response->body());
            return $this->getMockItineraries($travelRequest, $daysCount);
        } catch (\Exception $e) {
            Log::error('OpenAI Exception (Falling back to mock): ' . $e->getMessage());
            return $this->getMockItineraries($travelRequest, $daysCount);
        }
    }

    protected function resolveImageUrl($query, $destination)
    {
        $destinationMap = [
            'bangkok' => '1583337130400-f1d56e026ae3',
            'bali' => '1537995543085-3004bb15cc71',
            'paris' => '1502602898757-3a8726588c22',
            'tokyo' => '1540959733332-e4c7009497e3',
            'london' => '1513635269975-59663e0ac1ad',
            'new york' => '1496442226666-8d4d0e62e3e9',
            'dubai' => '1512453973923-a246ec972cb7',
            'goa' => '1512343879784-0351a427083a',
            'kerala' => '1602216031291-748af6563630',
            'singapore' => '1520250497591-112f2f40a3f4',
            'switzerland' => '1493306457171-cb8b4b1ca911',
            'iceland' => '1476610182123-23ad7d807312',
            'maldives' => '1514282401449-30c279169a6a',
            'thailand' => '1528181304805-d7fb4c428173',
            'vietnam' => '1528127269242-af24190f8f55',
            'italy' => '1523906834658-6e24ef23a66e',
        ];

        $lowerDest = strtolower($destination);
        $photoId = $destinationMap[$lowerDest] ?? null;

        if (!$photoId) {
            foreach ($destinationMap as $key => $id) {
                if (str_contains($lowerDest, $key)) {
                    $photoId = $id;
                    break;
                }
            }
        }

        if ($photoId) {
            return "https://images.unsplash.com/photo-{$photoId}?q=80&w=800&auto=format&fit=crop";
        }

        // High-quality dynamic fallback for unknown destinations
        $keywords = urlencode($destination . " travel luxury");
        return "https://loremflickr.com/800/600/{$keywords}";
    }

    protected function getMockItineraries($travelRequest, $daysCount)
    {
        $dailyRate = 5000;
        $realisticBudget = $daysCount * $dailyRate;

        $activityPool = [
            'The Essential' => [
                'Arrival and settling into a boutique heritage property.',
                'Guided city tour covering major cultural landmarks and local markets.',
                'Leisure day exploring the local culinary scene and hidden cafes.',
                'Sunset beach walk or scenic park visit with photography session.',
                'Visit to a famous local museum or art gallery.',
                'Shopping at a traditional bazaar or artisanal village.',
                'Relaxing spa day or wellness session to unwind.',
                'Farewell dinner at a top-rated local restaurant.',
                'Morning yoga session followed by local breakfast exploration.',
                'Guided walking tour of the historic district.'
            ],
            'Adventure' => [
                'Sunrise trekking or hiking to a panoramic viewpoint.',
                'Off-road 4x4 safari exploration of the rugged outskirts.',
                'Water sports session including snorkeling or rapid rafting.',
                'Camping under the stars with a traditional bonfire.',
                'Zip-lining through the canopy or rock climbing adventure.',
                'Biking tour through remote trails and local villages.',
                'Survival skills workshop or wilderness navigation session.',
                'Extreme sports experience (Bungee jumping or Paragliding).',
                'Deep-sea fishing or kayaking in secluded lagoons.',
                'Night safari or nocturnal wildlife spotting expedition.'
            ],
            'Luxury Retreat' => [
                'Private chauffeur transfer to an exclusive 5-star ocean-view suite.',
                'Private yacht cruise with a gourmet multi-course lunch on board.',
                'Exclusive wine tasting session at a premium private estate.',
                'Helicopter tour for a majestic aerial view of the destination.',
                'Personalized shopping experience with a luxury fashion stylist.',
                'Private candle-lit fine dining experience on a secluded terrace.',
                'Full-day holistic spa retreat with premium signature treatments.',
                'Behind-the-scenes private tour of a historical royal palace.',
                'Luxury hot air balloon ride at dawn with champagne breakfast.',
                'Private art viewing and meeting with a local master craftsman.'
            ]
        ];

        $itineraries = [];
        $themes = [
            ['title' => 'The Essential', 'multiplier' => 0.8, 'summary' => 'A perfect balance of sightseeing and relaxation.'],
            ['title' => 'Adventure', 'multiplier' => 1.0, 'summary' => 'Off-the-beaten-path experiences for the bold traveler.'],
            ['title' => 'Luxury Retreat', 'multiplier' => 1.5, 'summary' => 'Experience the finest hospitality and private tours.']
        ];

        foreach ($themes as $theme) {
            $days = [];
            $pool = $activityPool[$theme['title']];
            shuffle($pool);

            for ($i = 1; $i <= $daysCount; $i++) {
                $activity = $pool[($i - 1) % count($pool)];
                $days[] = [
                    'day' => $i,
                    'description' => "$activity in " . $travelRequest->destination . "."
                ];
            }

            $itineraries[] = [
                'title' => $theme['title'] . ' ' . $travelRequest->destination,
                'summary' => $theme['summary'] . " Travel: Excluded.",
                'cost' => '₹' . number_format($realisticBudget * $theme['multiplier']),
                'image_url' => $this->resolveImageUrl($theme['title'], $travelRequest->destination),
                'days' => $days,
                'travel_included' => false
            ];
        }

        return $itineraries;
    }

    protected function buildPrompt($travelRequest, $daysCount)
    {
        return "Create 3 distinct travel itineraries for a trip from {$travelRequest->origin} to {$travelRequest->destination}.
            Total Duration: {$daysCount} days.
            User's Budget: ₹{$travelRequest->budget}
            Dates: {$travelRequest->start_date} to {$travelRequest->end_date}
            Type: {$travelRequest->travel_type}

            IMPORTANT:
            1. You MUST return exactly {$daysCount} days in each itinerary.
            2. Evaluate budget realism.
            3. Return a raw JSON object with a key 'itineraries' containing an array of 3 objects.
            Each object must have:
            - title: Catchy title
            - summary: 2-3 sentence description.
            - cost: Calculated total cost (INR)
            - image_query: 2-3 descriptive keywords for a premium tourism image of '{$travelRequest->destination}' (e.g. 'grand palace bangkok', 'uluwatu temple bali').
            - days: Array of {$daysCount} objects with 'day' and 'description'";
    }

    /**
     * Generate a neural personality profile for a guest.
     */
    public function generatePersonalityProfile($guestData)
    {
        $prompt = "Analyze the following guest data and generate a futuristic 'Neural Personality Profile' for a luxury travel experience:\n" .
            json_encode($guestData) . "\n\n" .
            "Return a JSON object with: personality_type (e.g., 'The Galactic Explorer'), neural_score (0-100), and a brief ai_analysis.";

        try {
            $response = Http::withToken($this->apiKey)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are the Aatithya360 Neural AI engine.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->successful()) {
                $content = json_decode($response->json()['choices'][0]['message']['content'], true);
                return $content;
            }
            throw new \Exception($response->body());
        } catch (\Exception $e) {
            Log::error("OpenAI Neural Profiling Error: " . $e->getMessage());
            return [
                'personality_type' => 'Default Traveler',
                'neural_score' => 75.0,
                'ai_analysis' => 'Standard profiling active due to neural interface bypass.'
            ];
        }
    }

    /**
     * Assess a recruitment lead using AI.
     */
    public function assessCandidate($candidateData)
    {
        $prompt = "Assess the following hospitality candidate for a high-end luxury resort role:\n" .
            json_encode($candidateData) . "\n\n" .
            "Return a JSON object with: fit_score (0-100), key_strengths (array), and recommendation (Proceed/Review).";

        try {
            $response = Http::withToken($this->apiKey)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are the Aatithya360 AI Recruiter.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->successful()) {
                $content = json_decode($response->json()['choices'][0]['message']['content'], true);
                return $content;
            }
            throw new \Exception($response->body());
        } catch (\Exception $e) {
            Log::error("OpenAI Recruitment Error: " . $e->getMessage());
            return [
                'fit_score' => 50,
                'key_strengths' => ['Reliability'],
                'recommendation' => 'Review'
            ];
        }
    }
}
