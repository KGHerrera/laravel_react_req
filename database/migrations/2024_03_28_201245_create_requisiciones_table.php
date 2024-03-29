<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requisiciones', function (Blueprint $table) {
            $table->id("id_requisicion");
            $table->unsignedBigInteger('id_usuario');
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->date('fecha_solicitud');
            $table->enum('estado', ['Pendiente', 'Autorizada', 'Rechazada', 'Completada'])->default('Pendiente');
            $table->text('descripcion')->nullable();
            $table->text('motivo_Rechazo')->nullable();
            $table->binary('evidencia_Entrega')->nullable();
            $table->decimal('costo_Estimado', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requisiciones');
    }
};
