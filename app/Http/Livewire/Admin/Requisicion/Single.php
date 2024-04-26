<?php

namespace App\Http\Livewire\Admin\Requisicion;

use App\Models\Requisicion;
use Livewire\Component;

class Single extends Component
{

    public $requisicion;

    public function mount(Requisicion $Requisicion){
        $this->requisicion = $Requisicion;
    }

    public function delete()
    {
        $this->requisicion->delete();
        $this->dispatchBrowserEvent('show-message', ['type' => 'error', 'message' => __('DeletedMessage', ['name' => __('Requisicion') ]) ]);
        $this->emit('requisicionDeleted');
    }

    public function render()
    {
        return view('livewire.admin.requisicion.single')
            ->layout('admin::layouts.app');
    }
}
