<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestProfile extends Model
{
    protected $fillable = [
        'name',
        'email',
        'travel_preferences',
        'neural_score',
        'personality_type',
        'ai_analysis',
    ];

    protected $casts = [
        'travel_preferences' => 'array',
        'neural_score' => 'decimal:2',
    ];
}
