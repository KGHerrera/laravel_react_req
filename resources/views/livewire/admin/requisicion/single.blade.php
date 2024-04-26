<tr x-data="{ modalIsOpen : false }">
    <td class="">{{ $requisicion->id_requisicion }}</td>
    <td class="">{{ $requisicion->fecha_solicitud }}</td>
    <td class="">{{ $requisicion->estado }}</td>
    <td class="">{{ $requisicion->descripcion }}</td>
    <td class="">{{ $requisicion->motivo_rechazo }}</td>
    <td class="">{{ $requisicion->costo_estimado }}</td>
    
    @if(getCrudConfig('Requisicion')->delete or getCrudConfig('Requisicion')->update)
        <td>

            @if(getCrudConfig('Requisicion')->update && hasPermission(getRouteName().'.requisicion.update', 0, 0, $requisicion))
                <a href="@route(getRouteName().'.requisicion.update', $requisicion->id_requisicion)" class="btn text-primary mt-1">
                    <i class="icon-pencil"></i>
                </a>
            @endif

            @if(getCrudConfig('Requisicion')->delete && hasPermission(getRouteName().'.requisicion.delete', 0, 0, $requisicion))
                <button @click.prevent="modalIsOpen = true" class="btn text-danger mt-1">
                    <i class="icon-trash"></i>
                </button>
                <div x-show="modalIsOpen" class="cs-modal animate__animated animate__fadeIn">
                    <div class="bg-white shadow rounded p-5" @click.away="modalIsOpen = false" >
                        <h5 class="pb-2 border-bottom">{{ __('DeleteTitle', ['name' => __('Requisicion') ]) }}</h5>
                        <p>{{ __('DeleteMessage', ['name' => __('Requisicion') ]) }}</p>
                        <div class="mt-5 d-flex justify-content-between">
                            <a wire:click.prevent="delete" class="text-white btn btn-success shadow">{{ __('Yes, Delete it.') }}</a>
                            <a @click.prevent="modalIsOpen = false" class="text-white btn btn-danger shadow">{{ __('No, Cancel it.') }}</a>
                        </div>
                    </div>
                </div>
            @endif
        </td>
    @endif
</tr>
