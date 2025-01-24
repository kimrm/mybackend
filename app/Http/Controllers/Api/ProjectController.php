<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

class ProjectController extends Controller
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
            ->with('images')
            ->get();

        return ProjectResource::collection($sortedProjects);
    }


    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
}
