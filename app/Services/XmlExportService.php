<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Http\Request;

class XmlExportService
{
    /**
     * Get Collection for Xml file export
     *
     * @param \Illuminate\Http\Request $type
     *
     * @return \Illuminate\Http\Response Array Collection
     */
    public static function exportCollection($type)
    {
        $collections =  Book::all();
        $collectionType = $type;
        $array = [];
        foreach($collections as $collection)
        {
            if($collectionType == 'titleandauthor')
                $row = ['title' => $collection->title, 'author' => $collection->author];
            elseif($collectionType == 'title')
                $row = ['title' => $collection->title];
            elseif($collectionType == 'author')
                $row = ['author' => $collection->author];

            $array['Row-ID:'.$collection->id] = $row;
        }

        return $array;
    }


}
