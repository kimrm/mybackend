<?php

namespace App\Jobs;

use App\Mail\LeadCreated;
use App\Models\Lead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\GoogleCalendarService;

class CreateAppointment implements ShouldQueue
{
    use Queueable;

    protected $lead;

    /**
     * Create a new job instance.
     */
    public function __construct(Lead $lead)
    {
        $this->lead = $lead;
    }

    /**
     * Execute the job.
     */
    public function handle(GoogleCalendarService $googleCalendarService): void
    {
        $startTime = strtotime($this->lead->appointment);
        $endTime = strtotime($this->lead->appointment) + 60 * 60;
        $eventData = [
            'summary' => $this->lead->subject ?? 'Lead',
            'description' => 'Lead: ' . $this->lead->name . ' (' . $this->lead->email . ')',
            'start' => ['dateTime' => date('c', $startTime)],
            'end' => ['dateTime' => date('c', $endTime)],
        ];

        $googleCalendarService->createEvent('kimrmoller@gmail.com', $eventData);
    }
}
