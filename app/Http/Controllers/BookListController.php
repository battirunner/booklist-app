<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Services\BookListService;
use Illuminate\Support\Facades\Validator;

class BookListController extends Controller
{
    /**
     * Show listing of all books
     *
     * @param Request $request
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request)
    {
        if($request->sort)
        {
            if($request->sort == 'title')
                return Book::orderBy('title',$request->order)->get();
            if($request->sort == 'author')
                return Book::orderBy('author',$request->order)->get();
        }  
        return Book::get();
    }

    /**
     * Create a new book
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'  => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => $validator->errors()->all(),
            ], 422);
        }

        return BookListService::addbooklist($request);
    }

    /**
     * Update existing book
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'     => ['required', 'exists:books,id'],
            'title'  => ['string', 'max:255'],
            'author' => ['string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => $validator->errors()->all(),
            ], 422);
        }

        return BookListService::editbooklist($request);
    }

    /**
     * Delete a book from list
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'  => ['required', 'exists:books,id'],
        ]);

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => $validator->errors()->all(),
            ], 422);
        }

        return BookListService::deletebooklist($request->id);
    }
}
