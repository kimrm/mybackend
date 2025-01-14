<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;

class GoogleCalendarService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setAuthConfig(storage_path('app/private/calendarintegration.json')); // Path til credentials.json
        $this->client->addScope(Calendar::CALENDAR);
    }

    public function listEvents($calendarId = 'primary', $timeMin = null, $timeMax = null)
    {
        $service = new Calendar($this->client);

        $options = [
            'singleEvents' => true,
            'orderBy' => 'startTime',
        ];

        if ($timeMin) {
            $options['timeMin'] = $timeMin;
        }

        if ($timeMax) {
            $options['timeMax'] = $timeMax;
        }

        return $service->events->listEvents($calendarId, $options)->getItems();
    }

    public function createEvent($calendarId = 'primary', $eventData)
    {
        $service = new Calendar($this->client);

        $event = new Calendar\Event($eventData);

        return $service->events->insert($calendarId, $event);
    }
}
