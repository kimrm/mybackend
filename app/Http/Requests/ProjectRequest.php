<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Mews\Purifier\Facades\Purifier;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
        ];
    }

    public function sanitized(): array
    {
        $validated = parent::validated();

        $validated['body'] = (string) Purifier::clean($validated['body']);

        return $validated;
    }
}
