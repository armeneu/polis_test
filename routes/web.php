<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all frontend routes
Route::get('/', function () {
    return view('app');
});

Route::get('/article/{id}', function () {
    return view('app');
});

Route::get('/new-article', function () {
    return view('app');
});
