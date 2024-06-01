<?php

namespace App\Http\Livewire\Admin\Requisicion;

use App\Models\Requisicion;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;

class Update extends Component
{
    use WithFileUploads;

    public $requisicion;

    public $estado;
    public $costo_estimado;
    public $descripcion;
    public $motivo_rechazo;
    public $evidencia_entrega;
    
    protected $rules = [
        'estado' => 'required|in:pendiente,autorizada,rechazada,completada',
        'descripcion' => 'required|string',
        'motivo_rechazo' => 'nullable|string',
        'evidencia_entrega' => 'nullable',
        'costo_estimado' => 'required|numeric',        
    ];

    public function mount(Requisicion $Requisicion){
        $this->requisicion = $Requisicion;
        $this->estado = $this->requisicion->estado;
        $this->costo_estimado = $this->requisicion->costo_estimado;
        $this->descripcion = $this->requisicion->descripcion;
        $this->motivo_rechazo = $this->requisicion->motivo_rechazo;
        $this->evidencia_entrega = $this->requisicion->evidencia_entrega;        
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
        
        if ($this->evidencia_entrega && is_object($this->evidencia_entrega)) {
            // Almacenar el archivo en el directorio 'public/evidencias'
            $this->evidencia_entrega = $this->evidencia_entrega->store('public/evidencias');
            // Obtener la URL pública del archivo almacenado
            $this->evidencia_entrega = Storage::url($this->evidencia_entrega);
        }

        $this->requisicion->update([
            'estado' => $this->estado,
            'costo_estimado' => $this->costo_estimado,
            'descripcion' => $this->descripcion,
            'motivo_rechazo' => $this->motivo_rechazo,
            'evidencia_entrega' => $this->evidencia_entrega,
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
