<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsIndexResource;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return NewsIndexResource::collection(
            News::all()
        );
    }
}
