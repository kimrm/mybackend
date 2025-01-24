<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    protected $fillable = ['url', 'imageable_id', 'imageable_type'];

    public function getFileNameAttribute()
    {
        return pathinfo($this->attributes['url'], PATHINFO_FILENAME);
    }

    public function getUrlAttribute()
    {
        return env('APP_URL') . Storage::url('images/' . $this->attributes['url']);
    }
}
