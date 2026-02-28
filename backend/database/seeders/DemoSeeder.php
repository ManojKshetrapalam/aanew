<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\TravelRequest;
use App\Models\Itinerary;
use App\Models\CRMLead;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Demo Admin',
            'email' => 'admin@aatithya360.com',
            'password' => Hash::make('password'),
        ]);

        $request = TravelRequest::create([
            'origin' => 'Mumbai',
            'destination' => 'Paris',
            'budget' => 500000,
            'start_date' => '2026-06-01',
            'end_date' => '2026-06-10',
            'travel_type' => 'Leisure',
            'status' => 'selected',
        ]);

        Itinerary::create([
            'travel_request_id' => $request->id,
            'data' => [
                'title' => 'Romantic Paris Getaway',
                'cost' => '₹4,50,000',
                'summary' => 'A luxury stay in the heart of Paris with private tours of the Eiffel Tower and Louvre.',
                'days' => [
                    ['day' => 1, 'description' => 'Arrival and check-in at Hotel Ritz.'],
                    ['day' => 2, 'description' => 'Morning tour of the Louvre. Evening cruise on the Seine.'],
                ]
            ],
            'is_selected' => true,
        ]);

        CRMLead::create([
            'travel_request_id' => $request->id,
            'assigned_to' => $admin->id,
            'followup_status' => 'new',
            'notes' => 'User is very interested in luxury options.',
        ]);
    }
}
