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
            $table->id();
            $table->unsignedBigInteger('ID_Usuario');
            $table->foreign('ID_Usuario')->references('id')->on('users');
            $table->date('Fecha_Solicitud');
            $table->enum('Estado', ['Pendiente', 'Autorizada', 'Rechazada', 'Completada'])->default('Pendiente');
            $table->text('Descripcion')->nullable();
            $table->text('Motivo_Rechazo')->nullable();
            $table->binary('Evidencia_Entrega')->nullable();
            $table->decimal('Costo_Estimado', 10, 2)->nullable();
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
