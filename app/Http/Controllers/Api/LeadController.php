<?php

namespace App\Http\Controllers\Api;

use App\Models\Lead;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LeadCreatedResource;
use App\Jobs\ConfirmRequest;
use App\Jobs\CreateAppointment;
use App\Jobs\GenerateLeadSummary;

class LeadController extends Controller
{

    public function store(Request $request)
    {
        $leadAttributes = $request->validate([
            'subject' => 'nullable|string',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'questions' => 'nullable|string',
            'message' => 'nullable|string',
            'appointment' => 'nullable|date',
        ]);

        $lead = Lead::create($leadAttributes);

        dispatch(new CreateAppointment($lead));
        dispatch(new GenerateLeadSummary($lead));
        dispatch(new ConfirmRequest($lead));

        return new LeadCreatedResource($lead);
    }
}
