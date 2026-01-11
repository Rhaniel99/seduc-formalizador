<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demand_responsibles', function (Blueprint $table) {
            $table->id();
            $table->uuid('demand_id');
            // $table->uuid('user_id')->nullable(); // se existir no sistema
            $table->string('name');
            $table->string('registration_number');
            $table->timestamps();
            $table->foreign('demand_id')->references('id')->on('demands')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demand_responsibles');
    }
};
