<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('demands', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('created_by');

            $table->string('title')->nullable();
            $table->text('description')->nullable();

            // classification (string for now, can be normalized later)
            $table->string('type')->nullable();
            $table->string('nature')->nullable();
            $table->string('technical_area')->nullable();

            // 1=low | 2=medium | 3=high | 4=critical
            $table->tinyInteger('urgency_level')
                ->default(2)
                ->comment('1=baixa, 2=médio, 3=alta, 4=critico');

            // 1=to_start | 2=in_progress | 3=completed | 4=archived | 5=sent_to_siged
            $table->tinyInteger('status')
                ->default(1)
                ->comment('1=a_iniciar, 2=em_andamento, 3=concluida, 4=arquivada, 5=encaminhada_siged');

            $table->boolean('is_document_generated')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();

            $table->index(['status', 'technical_area', 'urgency_level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demands');
    }
};
