<?php

namespace App\DTOs;

use App\Models\User;
use Spatie\LaravelData\Data;

class AuthUserData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $role,
        public readonly bool $isDev,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            role: self::mapRole($user),
            isDev: $user->isDev(),
        );
    }

    private static function mapRole(User $user): string
    {
        if ($user->isDev()) {
            return 'dev';
        }

        return match (true) {
            $user->isManager() => 'gestor',
            $user->isDetin() => 'detin',
            $user->isRequester() => 'requisitante',
            default => 'unknown',
        };
    }
}
