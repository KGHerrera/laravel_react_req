<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requisicion extends Model
{
    use HasFactory;

    // Nombre de la tabla asociada con el modelo
    protected $table = 'requisiciones';

    // Nombre de la clave primaria en la tabla
    protected $primaryKey = 'id_requisicion';

    // Si la clave primaria es un incremento automático (autoincremental)
    public $incrementing = true;

    // Si las marcas de tiempo (timestamps) deben ser administradas automáticamente por Eloquent
    public $timestamps = true;

    // Los atributos que pueden ser asignados masivamente
    protected $fillable = [
        'id_usuario',
        'fecha_solicitud',
        'estado',
        'descripcion',
        'motivo_rechazo',
        'evidencia_entrega',
        'costo_estimado'
    ];

    // Relación con el modelo Usuario (si hay una)
    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
