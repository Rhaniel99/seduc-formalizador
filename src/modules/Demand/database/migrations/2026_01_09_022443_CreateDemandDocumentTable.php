<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('demand_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('demand_id')->unique();

            $table->json('content')->nullable();
            $table->string('pdf_path')->nullable();

            $table->uuid('generated_by')->nullable();
            $table->timestamp('generated_at')->nullable();

            $table->timestamps();

            $table->foreign('demand_id')
                ->references('id')
                ->on('demands')
                ->cascadeOnDelete();

            $table->foreign('generated_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demand_documents');
    }
};