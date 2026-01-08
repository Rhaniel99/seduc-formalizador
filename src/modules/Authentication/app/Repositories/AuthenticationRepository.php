<?php

namespace Modules\Authentication\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;

class AuthenticationRepository extends CoreRepository implements IAuthenticationRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool
    {
        return $this->model->where('email', $email)->update(['password' => $hashedPassword]) > 0;
    }

}
