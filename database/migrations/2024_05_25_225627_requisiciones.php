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
            $table->id('id_requisicion');
            $table->unsignedBigInteger('id_usuario');
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->date('fecha_solicitud');
            $table->enum('estado', ['pendiente', 'autorizada', 'rechazada', 'completada'])->default('pendiente');
            $table->text('descripcion')->nullable();
            $table->text('motivo_rechazo')->nullable();
            $table->text('evidencia_entrega')->nullable();
            $table->decimal('costo_estimado', 10, 2)->nullable();
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
