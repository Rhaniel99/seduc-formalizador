<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

// ? POST
Route::post('/login', [AuthenticationController::class, 'authLogin'])->name('auth.login');
Route::post('/register', [AuthenticationController::class, 'userRegister'])->name('auth.register');
Route::post('/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');
Route::post('/forgot/verify', [AuthenticationController::class, 'forgotVerify'])->name('forgot.verify');
Route::post('/forgot/password', [AuthenticationController::class, 'forgotPassword'])->name('forgot.password');

Route::middleware('auth')->group(function() {
    Route::inertia('/complete-profile', 'Public/Authentication/Profile/Index')->name('profile.complete');
    Route::post('/complete-profile', [AuthenticationController::class, 'profileRegister'])->name('profile.register');
});