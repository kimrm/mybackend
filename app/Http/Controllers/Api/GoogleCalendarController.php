<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GoogleCalendarService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class GoogleCalendarController extends Controller
{
    protected $calendarService;

    public function __construct(GoogleCalendarService $calendarService)
    {
        $this->calendarService = $calendarService;
    }

    public function listEvents()
    {
        $events = $this->calendarService->listEvents(
            'primary',
            now()->addDays(1)->toRfc3339String(),
            now()->addMonth()->toRfc3339String()
        );
        return response()->json($events);
    }

    public function listAvailableEvents()
    {
        // Liste over gyldige tidspunkter
        $validTimes = [
            '11:00-12:00',
            '12:00-13:00',
            '13:00-14:00',
        ];

        // Liste over gyldige dager
        $validDays = [2, 3, 4];

        // Hent eksisterende events
        $start = now()->addDays(1);
        $end = now()->addMonth();
        $events = $this->calendarService->listEvents(
            'kimrmoller@gmail.com',
            $start->toRfc3339String(),
            $end->toRfc3339String(),
            [
                'singleEvents' => true,
                'orderBy' => 'startTime',
            ]
        );

        // Kartlegg eksisterende arrangementer til datoer og tidspunkter
        $busySlots = [];
        foreach ($events as $event) {
            if (!empty($event['start']['dateTime']) && !empty($event['end']['dateTime'])) {
                $start = Carbon::parse($event['start']['dateTime']);
                $end = Carbon::parse($event['end']['dateTime']);
                $busySlots[] = [
                    'date' => $start->toDateString(),
                    'time' => $start->format('H:i') . '-' . $end->format('H:i'),
                ];
            }
        }

        // Generer ledige tidsluker
        $availableEvents = [];
        $today = $start;
        $maxSuggestions = 4;

        for ($i = 0; $i < 30; $i++) { // Sjekk de neste 30 dagene
            $date = $today->copy()->addDays($i);

            // Fortsett hvis dagen ikke er gyldig
            if (!in_array($date->dayOfWeekIso, $validDays)) {
                continue;
            }

            foreach ($validTimes as $timeSlot) {

                [$startTime, $endTime] = explode('-', $timeSlot);
                $slotStart = $date->copy()->setTimeFromTimeString($startTime);
                $slotEnd = $date->copy()->setTimeFromTimeString($endTime);

                // Sjekk om tidsluken er ledig
                $isBusy = false;
                foreach ($busySlots as $busySlot) {
                    if (
                        $busySlot['date'] === $slotStart->toDateString() &&
                        $busySlot['time'] === $timeSlot
                    ) {
                        $isBusy = true;
                        break;
                    }
                }

                if (!$isBusy) {
                    $availableEvents[] = [
                        'id' => $slotStart->toIso8601String(),
                        'day' => $slotStart->isoFormat('dddd'),
                        'date' => $slotStart->toDateString(),
                        'time' => $timeSlot,
                        'startHour' => $slotStart->format('H:i'),
                    ];

                    if (count($availableEvents) >= $maxSuggestions) {
                        break 2; // Avslutt når vi har nok forslag
                    }
                }
            }
        }

        return response()->json($availableEvents);
    }

    public function createEvent(Request $request)
    {
        $eventData = [
            'summary' => $request->input('summary'),
            'start' => [
                'dateTime' => $request->input('start'),
                'timeZone' => 'Europe/Oslo',
            ],
            'end' => [
                'dateTime' => $request->input('end'),
                'timeZone' => 'Europe/Oslo',
            ],
        ];

        $event = $this->calendarService->createEvent('your-calendar-id@gmail.com', $eventData);
        return response()->json($event);
    }
}
