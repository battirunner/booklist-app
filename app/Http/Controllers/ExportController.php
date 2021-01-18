<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Exports\BooksExport;
use App\Services\XmlExportService;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\ArrayToXml\ArrayToXml;


class ExportController extends Controller
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function exportCSV(Request $request) 
    {
        return Excel::download(new BooksExport($request[1]), 'books.csv');
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function exportXML(Request $request)
    {
        return ArrayToXml::convert(XmlExportService::exportCollection($request[1]));
    }

}
