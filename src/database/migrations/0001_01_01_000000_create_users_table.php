<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name');

            // matrícula institucional
            $table->string('registration_number')->unique();

            $table->string('email')->unique();
            $table->string('password');

            $table->tinyInteger('profile')
                ->default(2)
                ->comment('1=gestor, 2=requisitante, 3=detin');

            $table->boolean('active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['profile', 'active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
