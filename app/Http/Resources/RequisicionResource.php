<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequisicionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = false;
    
    public function toArray($request)
    {
        return [
            'id_requisicion' => $this->id_requisicion,
            'id_usuario' => $this->id_usuario,
            'fecha_solicitud' => $this->fecha_solicitud,
            'estado' => $this->estado,
            'descripcion' => $this->descripcion,
            'motivo_rechazo' => $this->motivo_rechazo,
            'evidencia_entrega' => $this->evidencia_entrega,
            'costo_estimado' => $this->costo_estimado,
            'user' => $this->user ? $this->user->name : null,
        ];
    }
}
