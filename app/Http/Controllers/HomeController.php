<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Show Home page of the app
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('app');
    }
}
