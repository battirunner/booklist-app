<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class BooksExport implements FromCollection
{
    protected $exportType;

    function __construct($exportType) {
            $this->exportType = $exportType;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        
        if($this->exportType == 'titleandauthor')
        {
            $collections =  Book::all('id','title','author');
            $collections->prepend(array('id','title','author'));
        }
        elseif($this->exportType == 'title')
        {
            $collections =  Book::all('id','title');
            $collections->prepend(array('id','title'));
        }
        elseif($this->exportType == 'author')
        {
            $collections =  Book::all('id','author');
            $collections->prepend(array('id','author'));
        }
        return $collections;
        
    }
}
