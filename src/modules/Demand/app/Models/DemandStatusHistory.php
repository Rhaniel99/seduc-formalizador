<?php

namespace Modules\Demand\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use Modules\Demand\Enums\DemandStatus;

class DemandStatusHistory extends BaseModel
{
    protected $table = 'demand_status_histories';

    protected $fillable = [
        'demand_id',
        'from_status',
        'to_status',
        'changed_by',
        'comment',
    ];

    protected $casts = [
        'from_status' => DemandStatus::class,
        'to_status' => DemandStatus::class,
    ];

    public function demand(): BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
