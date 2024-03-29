<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequisicionRequest;
use App\Http\Resources\RequisicionResource;
use App\Models\Requisicion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RequisicionesController extends Controller
{
    public function index()
    {
        // Obtener todas las requisiciones ordenadas por ID de manera descendente
        $requisiciones = Requisicion::with('user')->orderBy('id_requisicion', 'desc')->get();
        // Retornar una respuesta JSON con la colección de requisiciones formateada usando RequisicionResource
        return response()->json(RequisicionResource::collection($requisiciones));
    }

    public function show($id)
    {
        // Cargar manualmente el modelo Requisicion correspondiente usando el ID proporcionado
        $requisicion = Requisicion::findOrFail($id);

        // Devolver una respuesta JSON con el recurso RequisicionResource
        return response()->json(new RequisicionResource($requisicion));
    }

    public function store(StoreRequisicionRequest $request)
    {
        // Valida y obtiene los datos validados del formulario
        $data = $request->validated();

        // Crea una nueva requisición con los datos validados
        $requisicion = Requisicion::create($data);

        // Devuelve la respuesta JSON con los datos de la requisición creada
        return response()->json(new RequisicionResource($requisicion));
    }

    public function update(Request $request, $id)
    {
        // Lógica para actualizar una requisición existente
    }

    public function destroy($id)
    {
        // Lógica para eliminar una requisición
    }
}
