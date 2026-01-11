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

            /* =======================
            |  Dados do formulário
            ======================= */
            $table->string('title')->nullable();
            $table->text('description')->nullable();

            $table->string('type')->nullable();
            $table->string('nature')->nullable();
            $table->string('technical_area')->nullable();

            $table->tinyInteger('urgency_level')
                ->default(2)
                ->comment('1=baixa, 2=médio, 3=alta, 4=critico');


            /* =======================
            |  Controle de rascunho
            ======================= */
            $table->boolean('is_draft')
                ->default(true)
                ->comment('true = rascunho editavel');

            $table->tinyInteger('current_step')
                ->default(1)
                ->comment('step atual do formulario');

            /* =======================
            |  Status administrativo
            ======================= */
            $table->tinyInteger('status')
                ->default(1)
                ->comment('1=a_iniciar, 2=em_andamento, 3=concluida, 4=arquivada, 5=encaminhada_siged');

            $table->boolean('is_document_generated')->default(false);

            $table->timestamps();
            $table->softDeletes();


            /* =======================
            |  Relacionamentos
            ======================= */
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();

            $table->index(['status', 'technical_area', 'urgency_level']);
            $table->index(['created_by', 'is_draft']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demands');
    }
};
