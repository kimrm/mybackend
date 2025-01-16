<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class LeadCreated extends Mailable
{
    use Queueable, SerializesModels;

    protected $lead;
    /**
     * Create a new message instance.
     */
    public function __construct(Lead $lead)
    {
        $this->lead = $lead;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->lead->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $localDate = null;
        if ($this->lead->appointment) {
            $localDate = Carbon::parse($this->lead->appointment)->setTimezone('Europe/Oslo');
        }
        return new Content(
            markdown: 'mail.lead.created',
            with: ['lead' => $this->lead, 'localDate' => $localDate],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
