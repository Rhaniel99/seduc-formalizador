<?php

namespace Modules\Authentication\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;

class AuthenticationService implements IAuthenticationService
{
    protected IAuthenticationRepository $repository;

    public function __construct(IAuthenticationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function login(LoginData $data): bool
    {
        $credentials = $data->only('email', 'password')->toArray();

        $remember = $data->remember;

        if (!Auth::attempt($credentials, $remember)) {
            return false;
        }

        request()->session()->regenerate();

        return true;
    }

    public function register(RegisterData $data): User
    {
        $userData = $data->toArray();
        $userData['password'] = Hash::make($userData['password']);

        // Chama o repositório para criar o usuário no banco
        $newUser = $this->repository->create($userData);

        return $newUser;
    }

    public function resetPassword(ResetPasswordData $data): bool
    {
        $hashedPassword = Hash::make($data->password);

        return $this->repository->updatePasswordByEmail(
            $data->email,
            $hashedPassword
        );
    }

}
