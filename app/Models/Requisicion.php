<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requisicion extends Model
{
    use HasFactory;

    // Nombre de la tabla asociada con el modelo
    protected $table = 'requisiciones';

    protected $primaryKey = 'id_requisicion';

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
