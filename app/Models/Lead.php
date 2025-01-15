<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
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
}
