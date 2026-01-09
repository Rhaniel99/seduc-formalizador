<?php

namespace Modules\Authentication\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;

class AuthenticationController extends Controller
{
    protected IAuthenticationService $service;

    public function __construct(IAuthenticationService $service)
    {
        $this->service = $service;
    }

    public function authLogin(LoginData $r)
    {
        $success = $this->service->loginByIdentifier(
            $r->identifier,
            $r->password,
            $r->remember
        );

        if (! $success) {
            throw ValidationException::withMessages([
                'identifier' => 'O e-mail ou a matrícula informados estão incorretos.',
            ]);
        }

        return to_route('dashboard.index')
            ->with('success', 'Seja bem vindo!');
    }

    public function userRegister(RegisterData $r)
    {
        $user = $this->service->register($r);
        Auth::login($user);
        request()->session()->regenerate();
        return to_route('lukisa.index')->with(['success' => "Bem vindo! Sua conta foi criada com sucesso."]);
    }


    public function forgotPassword(ResetPasswordData $r): RedirectResponse
    {
        $success = $this->service->resetPassword($r);

        if (!$success) {
            return back()->with('errors', 'Os dados informados não correspondem a nenhuma conta.');
        }

        return to_route('home')->with('success', 'Sua senha foi redefinida com sucesso! Você já pode fazer o login.');
    }

    public function logout()
    {
        Auth::logout();
        return to_route('home');
    }
}
