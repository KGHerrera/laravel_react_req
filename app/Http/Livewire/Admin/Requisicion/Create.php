<?php

namespace App\Http\Livewire\Admin\Requisicion;

use App\Models\Requisicion;
use Livewire\Component;
use Livewire\WithFileUploads;

class Create extends Component
{
    use WithFileUploads;

    public $estado;
    public $costo_estimado;
    public $descripcion;
    public $motivo_rechazo;
    public $evidencia_entrega;
    
    protected $rules = [
        'estado' => 'required|in:pendiente,autorizada,rechazada,completada',
        'descripcion' => 'required|string',
        'motivo_rechazo' => 'nullable|string',
        'evidencia_entrega' => 'nullable|file',
        'costo_estimado' => 'required|numeric',        
    ];

    public function updated($input)
    {
        $this->validateOnly($input);
    }

    public function create()
    {
        if($this->getRules())
            $this->validate();

        $this->dispatchBrowserEvent('show-message', ['type' => 'success', 'message' => __('CreatedMessage', ['name' => __('Requisicion') ])]);
        
        if($this->getPropertyValue('evidencia_entrega') and is_object($this->evidencia_entrega)) {
            $this->evidencia_entrega = $this->getPropertyValue('evidencia_entrega')->store('evidencia_entrega');
        }

        Requisicion::create([
            'estado' => $this->estado,
            'costo_estimado' => $this->costo_estimado,
            'descripcion' => $this->descripcion,
            'motivo_rechazo' => $this->motivo_rechazo,
            'evidencia_entrega' => $this->evidencia_entrega,
            'user_id' => auth()->id(),
        ]);

        $this->reset();
    }

    public function render()
    {
        return view('livewire.admin.requisicion.create')
            ->layout('admin::layouts.app', ['title' => __('CreateTitle', ['name' => __('Requisicion') ])]);
    }
}
