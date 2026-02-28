<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecruitmentLead extends Model
{
    protected $fillable = [
        'applicant_name',
        'email',
        'skills',
        'ai_assessment',
        'status',
    ];

    protected $casts = [
        'skills' => 'array',
        'ai_assessment' => 'array',
    ];
}
