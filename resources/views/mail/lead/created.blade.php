<x-mail::message>
# Takk for din henvendelse, {{ $lead->name }}!

Din melding vil bli svart på så snart som mulig.

@if($lead->appointment)
Vi har opprettet en avtale i vår kalender den {{ date('d-m-Y', strtotime($localDate)) }} kl. {{ date('H:i', strtotime($localDate)) }} og vil ringe deg på oppgitt telefonnummer da.
@endif

Om du ikke kjenner til denne avtalen, eller om du har spørsmål, ta kontakt med oss på {{ config('mail.from.address') }}.

Med vennlig hilsen<br>
{{ config('app.name') }}
</x-mail::message>