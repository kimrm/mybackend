<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\sort;

class SortModelController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        foreach ($data['projects'] as $index => $model) {

            $sortOrder = $model['sort'];

            $sort = Sort::find($model['id']);

            $sort->update(['sort' => $sortOrder]);
        }

        return response()->json($data);
    }
}
