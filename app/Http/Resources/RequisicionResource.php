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
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'usuario_id' => $this->ID_Usuario,
            'fecha_solicitud' => $this->Fecha_Solicitud,
            'estado' => $this->Estado,
            'descripcion' => $this->Descripcion,
            'motivo_rechazo' => $this->Motivo_Rechazo,
            'evidencia_entrega' => $this->Evidencia_Entrega,
            'costo_estimado' => $this->Costo_Estimado,
        ];
    }
}
