<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    public function up(): void
    {
        Schema::create('siged_links', function (Blueprint $table) {
            $table->id();

            $table->uuid('demand_id')->unique();
            $table->string('siged_url');

            $table->uuid('registered_by');
            $table->timestamp('registered_at')->useCurrent();

            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('demand_id')
                ->references('id')
                ->on('demands')
                ->cascadeOnDelete();

            $table->foreign('registered_by')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siged_links');
    }
};