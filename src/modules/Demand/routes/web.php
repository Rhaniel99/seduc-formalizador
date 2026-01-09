<?php

use Illuminate\Support\Facades\Route;
use Modules\Demand\Http\Controllers\DemandController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('demands', DemandController::class)->names('demand');
});
