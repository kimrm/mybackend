<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\ContactRequest;

class ContactRequestReceived extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private ContactRequest $contactRequest)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = new MailMessage();
        $message->subject('Contact Request Received');
        $message->greeting('You have received a new contact request.');
        $message->line('Name: ' . $this->contactRequest->name);
        $message->line('Email: ' . $this->contactRequest->email);
        $message->line('Phone: ' . $this->contactRequest->phone ?? 'N/A');
        $message->line($this->contactRequest->message);
        $message->action('View message', url('/contacts'));
        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
