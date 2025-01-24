<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'imageable_id' => 'required|integer',
            'imageable_type' => 'required|string',
        ]);

        if (!class_exists($request->imageable_type)) {
            return back()->withErrors(['imageable_type' => 'Invalid model type']);
        }

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(storage_path('app/public/images'), $imageName);

        Image::create([
            'imageable_type' => $request->imageable_type,
            'imageable_id' => $request->imageable_id,
            'url' => $imageName,
        ]);

        return back()
            ->with('success', 'You have successfully uploaded an image.')
            ->with('image', $imageName);
    }
}
