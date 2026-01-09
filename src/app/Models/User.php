<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Modules\Demand\Models\Demand;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'name',
        'registration_number',
        'email',
        'password',
        'profile',
        'active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'active' => 'boolean',
        ];
    }

    /* =======================
     |  Relationships
     ======================= */

    public function demands()
    {
        return $this->hasMany(Demand::class, 'created_by');
    }

    /* =======================
     |  Helpers de perfil
     ======================= */

    public function isDev(): bool
    {
        return $this->profile === 0;
    }

    public function isManager(): bool
    {
        return $this->profile === 1;
    }

    public function isRequester(): bool
    {
        return $this->profile === 2;
    }

    public function isDetin(): bool
    {
        return $this->profile === 3;
    }

    public function isActive(): bool
    {
        return $this->active;
    }
}
