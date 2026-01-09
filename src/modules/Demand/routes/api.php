<?php

use Illuminate\Support\Facades\Route;
use Modules\Demand\Http\Controllers\DemandController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('demands', DemandController::class)->names('demand');
});
