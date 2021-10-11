<?php

use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PagesController::class, 'home'])->name('home');
Route::get('student-housing/single', [PagesController::class, 'singleList'])->name('housing.single');
Route::get('student-housing/married', [PagesController::class, 'marriedList'])->name('housing.married');
Route::get('student-housing/{slug}', [PagesController::class, 'housingProfile'])->name('housing.profile');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
