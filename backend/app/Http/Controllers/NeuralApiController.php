<?php

namespace App\Http\Controllers;

use App\Models\GuestProfile;
use App\Models\RecruitmentLead;
use App\Models\GlobalDeploymentStat;
use App\Services\OpenAIService;
use Illuminate\Http\Request;

class NeuralApiController extends Controller
{
    protected $openai;

    public function __construct(OpenAIService $openai)
    {
        $this->openai = $openai;
    }

    /**
     * Generate or retrieve a guest's neural profile.
     */
    public function getGuestProfile(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
        ]);

        $profile = GuestProfile::firstOrCreate(
            ['email' => $request->email],
            ['name' => $request->name, 'travel_preferences' => $request->preferences ?? []]
        );

        if (!$profile->personality_type) {
            $analysis = $this->openai->generatePersonalityProfile($profile);
            $profile->update([
                'personality_type' => $analysis['personality_type'],
                'neural_score' => $analysis['neural_score'],
                'ai_analysis' => $analysis['ai_analysis'],
            ]);
        }

        return response()->json($profile);
    }

    /**
     * Assess a recruitment lead.
     */
    public function assessCandidate(Request $request)
    {
        $request->validate([
            'applicant_name' => 'required|string',
            'email' => 'required|email',
            'skills' => 'required|array',
        ]);

        $lead = RecruitmentLead::create($request->all());
        $assessment = $this->openai->assessCandidate($lead);

        $lead->update([
            'ai_assessment' => $assessment,
            'status' => $assessment['recommendation'] === 'Proceed' ? 'Screened' : 'Review',
        ]);

        return response()->json($lead);
    }

    /**
     * Get global deployment statistics for the heatmap.
     */
    public function getGlobalStats()
    {
        // Seed some mock data if empty
        if (GlobalDeploymentStat::count() === 0) {
            GlobalDeploymentStat::create(['region' => 'Asia', 'country_code' => 'IN', 'manpower_count' => 1200, 'active_properties' => 45, 'guest_traffic' => 8500]);
            GlobalDeploymentStat::create(['region' => 'Europe', 'country_code' => 'FR', 'manpower_count' => 800, 'active_properties' => 30, 'guest_traffic' => 6200]);
            GlobalDeploymentStat::create(['region' => 'Americas', 'country_code' => 'US', 'manpower_count' => 1500, 'active_properties' => 55, 'guest_traffic' => 12000]);
        }

        return response()->json(GlobalDeploymentStat::all());
    }
}
