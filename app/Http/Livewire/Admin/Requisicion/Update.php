<?php

namespace App\Http\Livewire\Admin\Requisicion;

use App\Models\Requisicion;
use Livewire\Component;
use Livewire\WithFileUploads;

class Update extends Component
{
    use WithFileUploads;

    public $requisicion;

    public $id_usuario;
    public $fecha_solicitud;
    public $estado;
    public $descripcion;
    public $motivo_rechazo;
    public $evidencia_entrega;
    public $costo_estimado;
    
    protected $rules = [
        'id_usuario' => 'required|numeric',
        'fecha_solicitud' => 'required|date',
        'estado' => 'required|in:pendiente,autorizada,rechazada,completada',
        'descripcion' => 'required|string',
        'motivo_rechazo' => 'nullable|string',
        'evidencia_entrega' => 'nullable|file',
        'costo_estimado' => 'nullable|numeric',        
    ];

    public function mount(Requisicion $Requisicion){
        $this->requisicion = $Requisicion;
        $this->id_usuario = $this->requisicion->id_usuario;
        $this->fecha_solicitud = $this->requisicion->fecha_solicitud;
        $this->estado = $this->requisicion->estado;
        $this->descripcion = $this->requisicion->descripcion;
        $this->motivo_rechazo = $this->requisicion->motivo_rechazo;
        $this->evidencia_entrega = $this->requisicion->evidencia_entrega;
        $this->costo_estimado = $this->requisicion->costo_estimado;        
    }

    public function updated($input)
    {
        $this->validateOnly($input);
    }

    public function update()
    {
        if($this->getRules())
            $this->validate();

        $this->dispatchBrowserEvent('show-message', ['type' => 'success', 'message' => __('UpdatedMessage', ['name' => __('Requisicion') ]) ]);
        
        if($this->getPropertyValue('evidencia_entrega') and is_object($this->evidencia_entrega)) {
            $this->evidencia_entrega = $this->getPropertyValue('evidencia_entrega')->store('evidencia_entrega');
        }

        $this->requisicion->update([
            'id_usuario' => $this->id_usuario,
            'fecha_solicitud' => $this->fecha_solicitud,
            'estado' => $this->estado,
            'descripcion' => $this->descripcion,
            'motivo_rechazo' => $this->motivo_rechazo,
            'evidencia_entrega' => $this->evidencia_entrega,
            'costo_estimado' => $this->costo_estimado,
            'user_id' => auth()->id(),
        ]);
    }

    public function render()
    {
        return view('livewire.admin.requisicion.update', [
            'requisicion' => $this->requisicion
        ])->layout('admin::layouts.app', ['title' => __('UpdateTitle', ['name' => __('Requisicion') ])]);
    }
}
