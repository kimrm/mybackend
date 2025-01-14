<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatController extends Controller
{
    public function streamResponse(Request $request)
    {
        $userQuestion = $request->input('userQuestion');

        if (!$userQuestion) {
            return response()->json(['error' => 'No question provided'], 400);
        }

        $messages = [
            ['role' => 'system', 'content' => config('openai.contact_system_message')],
            ['role' => 'user', 'content' => $userQuestion],
        ];

        $response = new StreamedResponse(function () use ($messages) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.openai.com/v1/chat/completions");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . config('openai.api_key'),
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
                'model' => 'gpt-4o-mini',
                'messages' => $messages,
                'stream' => true,
            ]));

            curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $data) {
                echo $data;
                ob_flush();
                flush();
                return strlen($data);
            });

            curl_exec($ch);

            if (curl_errno($ch)) {
                echo "Error: " . curl_error($ch);
            }

            curl_close($ch);
        });

        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');

        return $response;
    }
}
