<?php

namespace Modules\Authentication\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use App\Models\User;

interface IAuthenticationRepository extends ICoreRepository
{
    public function create(array $data): User;

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool;
}
