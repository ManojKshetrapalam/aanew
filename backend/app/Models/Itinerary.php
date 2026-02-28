<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    protected $fillable = [
        'travel_request_id',
        'data',
        'is_selected',
    ];

    protected $casts = [
        'data' => 'array',
        'is_selected' => 'boolean',
    ];

    public function travelRequest()
    {
        return $this->belongsTo(TravelRequest::class);
    }
}
