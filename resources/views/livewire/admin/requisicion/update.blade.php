<div class="card">
    <div class="card-header p-0">
        <h3 class="card-title">{{ __('UpdateTitle', ['name' => __('Requisicion') ]) }}</h3>
        <div class="px-2 mt-4">
            <ul class="breadcrumb mt-3 py-3 px-4 rounded">
                <li class="breadcrumb-item"><a href="@route(getRouteName().'.home')" class="text-decoration-none">{{ __('Dashboard') }}</a></li>
                <li class="breadcrumb-item"><a href="@route(getRouteName().'.requisicion.read')" class="text-decoration-none">{{ __(\Illuminate\Support\Str::plural('Requisicion')) }}</a></li>
                <li class="breadcrumb-item active">{{ __('Update') }}</li>
            </ul>
        </div>
    </div>

    <form class="form-horizontal" wire:submit.prevent="update" enctype="multipart/form-data">

        <div class="card-body">

                        <!-- Estado Input -->
            <div class='form-group'>
                <label for='input-estado' class='col-sm-2 control-label '> {{ __('Estado') }}</label>
                <select id='input-estado' wire:model.lazy='estado' class="form-control  @error('estado') is-invalid @enderror">
                    @foreach(getCrudConfig('Requisicion')->inputs()['estado']['select'] as $key => $value)
                        <option value='{{ $key }}'>{{ $value }}</option>
                    @endforeach
                </select>
                @error('estado') <div class='invalid-feedback'>{{ $message }}</div> @enderror
            </div>
            <!-- Costo_estimado Input -->
            <div class='form-group'>
                <label for='input-costo_estimado' class='col-sm-2 control-label '> {{ __('Costo_estimado') }}</label>
                <input type='number' id='input-costo_estimado' wire:model.lazy='costo_estimado' class="form-control  @error('costo_estimado') is-invalid @enderror" placeholder='' autocomplete='on'>
                @error('costo_estimado') <div class='invalid-feedback'>{{ $message }}</div> @enderror
            </div>
            <!-- Descripcion Input -->
            <div class='form-group'>
                <label for='input-descripcion' class='col-sm-2 control-label '> {{ __('Descripcion') }}</label>
                <input type='text' id='input-descripcion' wire:model.lazy='descripcion' class="form-control  @error('descripcion') is-invalid @enderror" placeholder='' autocomplete='on'>
                @error('descripcion') <div class='invalid-feedback'>{{ $message }}</div> @enderror
            </div>
            <!-- Motivo_rechazo Input -->
            <div class='form-group'>
                <label for='input-motivo_rechazo' class='col-sm-2 control-label '> {{ __('Motivo_rechazo') }}</label>
                <input type='text' id='input-motivo_rechazo' wire:model.lazy='motivo_rechazo' class="form-control  @error('motivo_rechazo') is-invalid @enderror" placeholder='' autocomplete='on'>
                @error('motivo_rechazo') <div class='invalid-feedback'>{{ $message }}</div> @enderror
            </div>
            <!-- Evidencia_entrega Input -->
            <div class='form-group'>
                <label for='input-evidencia_entrega' class='col-sm-2 control-label '> {{ __('Evidencia_entrega') }}</label>
                <input type='file' id='input-evidencia_entrega' wire:model='evidencia_entrega' class="form-control-file  @error('evidencia_entrega') is-invalid @enderror">
                @if($evidencia_entrega and !$errors->has('evidencia_entrega') and $evidencia_entrega instanceof Illuminate\Http\UploadedFile and $evidencia_entrega->isPreviewable())
                    <a href="{{ $evidencia_entrega->temporaryUrl() }}" target="_blank"><img width="200" height="200" class="mt-3 img-fluid shadow" src="{{ $evidencia_entrega->temporaryUrl() }}" alt=""></a>
                @endif
                @error('evidencia_entrega') <div class='invalid-feedback'>{{ $message }}</div> @enderror
            </div>


        </div>

        <div class="card-footer">
            <button type="submit" class="btn btn-info ml-4">{{ __('Update') }}</button>
            <a href="@route(getRouteName().'.requisicion.read')" class="btn btn-default float-left">{{ __('Cancel') }}</a>
        </div>
    </form>
</div>
