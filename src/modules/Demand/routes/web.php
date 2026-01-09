<?php

use Illuminate\Support\Facades\Route;
use Modules\Demand\Http\Controllers\DashboardController;
use Modules\Demand\Http\Controllers\DemandController;

Route::middleware(['auth'])->group(function () {
    Route::resource('demands', DemandController::class)->names('demand');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
});
