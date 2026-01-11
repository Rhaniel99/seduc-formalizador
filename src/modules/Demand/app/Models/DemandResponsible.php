<?php

namespace Modules\Demand\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DemandResponsible extends BaseModel
{
    protected $table = 'demand_responsibles';

    protected $fillable = [
        'demand_id',
        'name',
        'registration_number',
    ];

    public function demand(): BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }
}
