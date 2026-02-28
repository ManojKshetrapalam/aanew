<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelRequest extends Model
{
    protected $fillable = [
        'origin',
        'destination',
        'budget',
        'start_date',
        'end_date',
        'travel_type',
        'status',
    ];

    public function itineraries()
    {
        return $this->hasMany(Itinerary::class);
    }

    public function crmLead()
    {
        return $this->hasOne(CRMLead::class);
    }
}
