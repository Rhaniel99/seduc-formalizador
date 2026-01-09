<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'rhanielmonteiro.13@gmail.com', 
            ],
            [
                'name' => 'Administrador',
                'registration_number' => '252525',
                'password' => Hash::make('senha123'), 
                'profile' => 0, 
                'active' => true,
            ]
        );
    }
}
