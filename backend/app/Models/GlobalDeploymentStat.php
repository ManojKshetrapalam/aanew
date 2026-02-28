<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GlobalDeploymentStat extends Model
{
    protected $fillable = [
        'region',
        'country_code',
        'manpower_count',
        'active_properties',
        'guest_traffic',
    ];
}
