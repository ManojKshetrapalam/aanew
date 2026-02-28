<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CRMLead;
use App\Models\User;
use Illuminate\Http\Request;

class CRMController extends Controller
{
    public function index(Request $request)
    {
        $query = CRMLead::with(['travelRequest', 'assignedTo']);

        if ($request->has('status')) {
            $query->where('followup_status', $request->status);
        }

        return response()->json([
            'leads' => $query->latest()->get(),
            'users' => User::all()
        ]);
    }

    public function update(Request $request, CRMLead $lead)
    {
        $validated = $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
            'followup_status' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return response()->json([
            'message' => 'Lead updated successfully!',
            'data' => $lead
        ]);
    }
}
