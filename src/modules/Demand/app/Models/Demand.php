<?php

namespace Modules\Demand\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Demand\Enums\DemandStatus;
use Modules\Demand\Enums\UrgencyLevel;
use App\Models\User;

class Demand extends BaseModel
{
    use SoftDeletes;

    protected $table = 'demands';

    protected $fillable = [
        'title',
        'description',
        'type',
        'nature',
        'technical_area',
        'urgency_level',
        'status',
        'is_document_generated',
        'is_draft',
        'current_step',
        'created_by',
    ];

    protected $casts = [
        'urgency_level' => UrgencyLevel::class,
        'status' => DemandStatus::class,
        'is_document_generated' => 'boolean',
        'is_draft' => 'boolean',
        'current_step' => 'integer',
    ];

    /* =======================
     |  Relacionamentos
     ======================= */

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function document(): HasOne
    {
        return $this->hasOne(DemandDocument::class);
    }

    public function sigedLink(): HasOne
    {
        return $this->hasOne(SigedLink::class);
    }

    public function statusHistory(): HasMany
    {
        return $this->hasMany(DemandStatusHistory::class);
    }

    public function responsibles(): HasMany
    {
        return $this->hasMany(DemandResponsible::class);
    }

    /* =======================
     |  Helpers de domínio
     ======================= */

    public function isDraft(): bool
    {
        return $this->is_draft === true;
    }

    public function isCompleted(): bool
    {
        return $this->status === DemandStatus::COMPLETED;
    }

    public function isArchived(): bool
    {
        return $this->status === DemandStatus::ARCHIVED;
    }

    /**
     * RN05 – Imutabilidade após conclusão
     */
    public function canBeEdited(): bool
    {
        return $this->isDraft();
    }

    /**
     * Usado pelo front para restaurar o step
     */
    public function getCurrentStep(): int
    {
        return $this->current_step ?? 1;
    }
}
