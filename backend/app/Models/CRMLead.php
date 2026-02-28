<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CRMLead extends Model
{
    protected $fillable = [
        'travel_request_id',
        'assigned_to',
        'followup_status',
        'notes',
    ];

    public function travelRequest()
    {
        return $this->belongsTo(TravelRequest::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
