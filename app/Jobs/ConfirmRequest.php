<?php

namespace App\Jobs;

use App\Models\Lead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\LeadCreated;

class ConfirmRequest implements ShouldQueue
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
    public function handle(): void
    {
        Mail::to($this->lead->email)->send(new LeadCreated($this->lead));
    }
}
