<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookListController;

Route::get('/home', [BookListController::class, 'index'])->name('home.content');

Route::post('/addbooklist', [BookListController::class, 'create'])->name('booklist.add');

Route::post('/editbooklist', [BookListController::class, 'update'])->name('booklist.edit');

Route::post('/deletebooklist', [BookListController::class, 'delete'])->name('booklist.delete');
