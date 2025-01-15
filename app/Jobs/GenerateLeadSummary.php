<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Lead;
use App\Services\ChatService;

class GenerateLeadSummary implements ShouldQueue
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
    public function handle(ChatService $chatService): void
    {
        $prompt = 'Oppsummer følgende forespørsel og foreslå en løsning:\n\n' .
            'Melding: ' . $this->lead->message;

        $promptResponse = $chatService->Chat($prompt, 'You are a helpful assistant.');
        $summary = $promptResponse['content'];

        $this->lead->update(['summary' => $summary]);
    }
}
