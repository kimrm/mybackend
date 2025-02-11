<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

class FeaturedProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortedProjects = Project::join('sorts', 'projects.id', '=', 'sorts.model_id')
            ->where('sorts.model', Project::class)
            ->orderBy('sorts.sort', 'asc')
            ->with('author')
            ->get()
            ->take(3);

        return ProjectResource::collection($sortedProjects);
    }
}
