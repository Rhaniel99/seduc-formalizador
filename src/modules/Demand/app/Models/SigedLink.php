<?php

namespace Modules\Demand\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class SigedLink extends BaseModel
{
    protected $table = 'siged_links';

    protected $fillable = [
        'demand_id',
        'siged_url',
        'registered_by',
        'registered_at',
        'notes',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
    ];

    public function demand(): BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }

    public function registeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }
}
