<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header p-0">
                <h3 class="card-title">{{ __('ListTitle', ['name' => __(\Illuminate\Support\Str::plural('Requisicion')) ]) }}</h3>

                <div class="px-2 mt-4">

                    <ul class="breadcrumb mt-3 py-3 px-4 rounded">
                        <li class="breadcrumb-item"><a href="@route(getRouteName().'.home')" class="text-decoration-none">{{ __('Dashboard') }}</a></li>
                        <li class="breadcrumb-item active">{{ __(\Illuminate\Support\Str::plural('Requisicion')) }}</li>
                    </ul>

                    <div class="row justify-content-between mt-4 mb-4">
                        @if(getCrudConfig('Requisicion')->create && hasPermission(getRouteName().'.requisicion.create', 0, 0))
                        <div class="col-md-4 right-0">
                            <a href="@route(getRouteName().'.requisicion.create')" class="btn btn-success">{{ __('CreateTitle', ['name' => __('Requisicion') ]) }}</a>
                        </div>
                        @endif
                        @if(getCrudConfig('Requisicion')->searchable())
                        <div class="col-md-4">
                            <div class="input-group">
                                <input type="text" class="form-control" @if(config('easy_panel.lazy_mode')) wire:model.lazy="search" @else wire:model="search" @endif placeholder="{{ __('Search') }}" value="{{ request('search') }}">
                                <div class="input-group-append">
                                    <button class="btn btn-default">
                                        <a wire:target="search" wire:loading.remove><i class="fa fa-search"></i></a>
                                        <a wire:loading wire:target="search"><i class="fas fa-spinner fa-spin" ></i></a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                </div>
            </div>

            <div class="card-body table-responsive p-0">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col" style='cursor: pointer' wire:click="sort('id_requisicion')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'id_requisicion') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'id_requisicion') fa-sort-amount-up ml-2 @endif'></i> {{ __('Id_requisicion') }} </th>
                            <th scope="col" style='cursor: pointer' wire:click="sort('fecha_solicitud')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'fecha_solicitud') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'fecha_solicitud') fa-sort-amount-up ml-2 @endif'></i> {{ __('Fecha_solicitud') }} </th>
                            <th scope="col" style='cursor: pointer' wire:click="sort('estado')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'estado') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'estado') fa-sort-amount-up ml-2 @endif'></i> {{ __('Estado') }} </th>
                            <th scope="col" style='cursor: pointer' wire:click="sort('descripcion')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'descripcion') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'descripcion') fa-sort-amount-up ml-2 @endif'></i> {{ __('Descripcion') }} </th>
                            <th scope="col" style='cursor: pointer' wire:click="sort('motivo_rechazo')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'motivo_rechazo') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'motivo_rechazo') fa-sort-amount-up ml-2 @endif'></i> {{ __('Motivo_rechazo') }} </th>
                            <th scope="col" style='cursor: pointer' wire:click="sort('costo_estimado')"> <i class='fa @if($sortType == 'desc' and $sortColumn == 'costo_estimado') fa-sort-amount-down ml-2 @elseif($sortType == 'asc' and $sortColumn == 'costo_estimado') fa-sort-amount-up ml-2 @endif'></i> {{ __('Costo_estimado') }} </th>
                            
                            @if(getCrudConfig('Requisicion')->delete or getCrudConfig('Requisicion')->update)
                                <th scope="col">{{ __('Action') }}</th>
                            @endif
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($requisicions as $requisicion)
                            @livewire('admin.requisicion.single', [$requisicion], key($requisicion->id))
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="m-auto pt-3 pr-3">
                {{ $requisicions->appends(request()->query())->links() }}
            </div>

            <div wire:loading wire:target="nextPage,gotoPage,previousPage" class="loader-page"></div>

        </div>
    </div>
</div>
