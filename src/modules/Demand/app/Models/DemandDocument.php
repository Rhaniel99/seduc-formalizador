<?php

namespace Modules\Demand\Models;


use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class DemandDocument extends BaseModel
{
    protected $table = 'demand_documents';

    protected $fillable = [
        'demand_id',
        'content',
        'pdf_path',
        'generated_by',
        'generated_at',
    ];

    protected $casts = [
        'content' => 'array',
        'generated_at' => 'datetime',
    ];

    public function demand(): BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }

    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}