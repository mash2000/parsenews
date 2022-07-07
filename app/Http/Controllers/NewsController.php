<?php

namespace App\Http\Controllers;

use App\Models\News;

class NewsController extends Controller
{
    public function index($offset, $limit)
    {
        return News::offset($offset)->take($limit)->get();
    }

    public function single($id)
    {
        return News::findOrFail($id);
    }


    public function setRating($id, $rating)
    {
        $article = News::findOrFail($id);
        $article->rating = $rating;
        $article->save();

        return $rating;
    }

    public function deleteArticle($id)
    {
        $article = News::findOrFail($id);
        $article->delete();

        return $id;
    }
}
