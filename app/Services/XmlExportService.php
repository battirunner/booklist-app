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
                $row = ['id'=>$collection->id, 'title' => $collection->title, 'author' => $collection->author];
            elseif($collectionType == 'title')
                $row = ['id'=>$collection->id, 'title' => $collection->title];
            elseif($collectionType == 'author')
                $row = ['id'=>$collection->id,'author' => $collection->author];

            $array[] = $row;
        }
        $result = [];
        $result['Books'] =  $array;

        return $result;
    }


}
