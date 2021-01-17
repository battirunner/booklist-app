<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Http\Request;

class BookListService
{
    /**
     * Add a book to database
     *
     * @param \Illuminate\Http\Request $bookData
     *
     * @return \Illuminate\Http\Response
     */
    public static function addbooklist(Request $bookData)
    {
        $exists = Book::where('author', $bookData->author)->where('title', $bookData->title)->exists();

        if ($exists) {
            return response([
                'success' => false,
                'message' => ['Duplicate Record!!'],
            ], 400);
        }

        $book         = new Book;
        $book->title  = $bookData->title;
        $book->author = $bookData->author;
        $book->save();

        return response()->json([
            'message' => 'Successfully Added',
            'id'      => $book->id,
        ]);
    }

    /**
     * Edit existing book in DB
     *
     * @param \Illuminate\Http\Request $bookData
     *
     * @return \Illuminate\Http\Response
     */
    public static function editbooklist(Request $bookData)
    {
        $book         = Book::find($bookData->id);
        $book->title  = $bookData->title ?? $book->title;
        $book->author = $bookData->author ?? $book->author;
        
        $exists = Book::where('author', $bookData->author)->where('title', $bookData->title)->exists();

        if ($exists) {
            return response([
                'success' => false,
                'message' => ['Duplicate Record!!'],
            ], 400);
        }

        $book->save();

        return response([
            'success' => true,
            'message' => 'Successfully Updated.',
        ]);
    }

    /**
     * Delete book from DB
     *
     * @param int $bookId
     *
     * @return \Illuminate\Http\Response
     */
    public static function deletebooklist($bookId)
    {
        $book = Book::find($bookId);
        $book->delete();

        return response([
            'success' => true,
            'message' => 'Successfully Deleted.',
        ]);
    }
}
