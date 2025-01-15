<?php

namespace App\Services;

use GuzzleHttp\Client;

class ChatService
{

    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }


    public function Chat($message, $instruction = '')
    {
        $messages = [
            [
                'role' => 'system',
                'content' => $instruction ? $instruction : 'You are a helpful assistant.',
            ],
            [
                'role' => 'user',
                'content' => $message,
            ],
        ];

        $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => ['Authorization' => 'Bearer ' . config('openai.api_key')],
            'json' => [
                'model' => 'gpt-4o-mini',
                'messages' => $messages
            ],
        ]);

        return json_decode($response->getBody(), true)['choices'][0]['message'];
    }
}
