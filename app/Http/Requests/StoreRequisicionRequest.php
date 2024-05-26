<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequisicionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id_usuario' => 'required|exists:users,id',
            'fecha_solicitud' => 'required|date',
            'estado' => 'required|in:pendiente,autorizada,rechazada,completada',
            'descripcion' => 'string',
            'motivo_rechazo' => 'nullable|string',
            'evidencia_entrega' => 'nullable|string',
            'costo_estimado' => 'numeric',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id_usuario.required' => 'El ID de usuario es obligatorio.',
            'id_usuario.exists' => 'El ID de usuario proporcionado no existe en la base de datos.',
            'fecha_solicitud.required' => 'La fecha de solicitud es obligatoria.',
            'fecha_solicitud.date' => 'La fecha de solicitud debe ser una fecha válida.',
            'estado.required' => 'El estado es obligatorio.',
            'estado.in' => 'El estado debe ser uno de: pendiente, autorizada, rechazada, completada.',
            'descripcion.string' => 'La descripción debe ser una cadena de caracteres.',
            'motivo_rechazo.string' => 'El motivo de rechazo debe ser una cadena de caracteres.',
            'evidencia_entrega.string' => 'La evidencia de entrega debe ser un archivo.',
            'costo_estimado.numeric' => 'El costo estimado debe ser un valor numérico.',
        ];
    }
}
