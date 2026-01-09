<?php

namespace Modules\Demand\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

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
        'from_status' => 'integer',
        'to_status' => 'integer',
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
