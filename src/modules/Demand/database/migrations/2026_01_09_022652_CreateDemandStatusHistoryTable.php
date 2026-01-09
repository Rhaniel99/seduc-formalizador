<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('demand_status_histories', function (Blueprint $table) {
            $table->id();

            $table->uuid('demand_id');

            $table->string('from_status')->nullable();
            $table->string('to_status');

            $table->uuid('changed_by')->nullable();
            $table->text('comment')->nullable();

            $table->timestamps();

            $table->foreign('demand_id')
                ->references('id')
                ->on('demands')
                ->cascadeOnDelete();

            $table->foreign('changed_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->index(['demand_id', 'to_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demand_status_histories');
    }
};