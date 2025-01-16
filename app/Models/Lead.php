<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class Lead extends Model
{
    use Notifiable;

    protected $fillable = [
        'subject',
        'name',
        'email',
        'phone',
        'message',
        'questions',
        'appointment',
        'summary',
    ];

    /**
     * Route notifications for the mail channel.
     *
     * @return  array<string, string>|string
     */
    public function routeNotificationForMail(Notification $notification): array|string
    {
        // Return email address only...
        return 'kim@kimrune.dev';
    }
}
