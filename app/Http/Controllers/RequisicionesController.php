<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequisicionRequest;
use App\Http\Requests\UpdateRequisicionRequest;
use App\Http\Resources\RequisicionResource;
use App\Models\Requisicion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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


    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Ajusta las reglas de validación según tus necesidades
        ]);

        // Obtiene el archivo de la solicitud
        $image = $request->file('image');

        // Genera un nombre único para el archivo
        $imageName = 'requisicion_' . time() . '.' . $image->getClientOriginalExtension();

        // Guarda el archivo en el almacenamiento
        $path = $image->storeAs('public/evidencias', $imageName);

        // Devuelve la URL del archivo guardado
        $url = Storage::url($path);

        // Devuelve una respuesta JSON con la URL de la imagen
        return response()->json(['image_url' => $url]);
    }

    public function update(UpdateRequisicionRequest $request, $id)
    {


        // Encontrar la requisición por su ID
        $requisicion = Requisicion::findOrFail($id);

        // Validar los datos recibidos del formulario
        $data = $request->validated();

        // Verificar si se ha enviado una imagen
        if ($request->hasFile('evidencia_entrega')) {
            // Guardar la imagen
            $image = $request->file('evidencia_entrega');
            $imageName = 'requisicion_' . $requisicion->id . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('evidencias/' . $requisicion->id), $imageName);

            // Actualizar el campo de evidencia de entrega en la requisición
            $data['evidencia_entrega'] = $imageName;
        }

        // Actualizar los datos de la requisición
        $requisicion->update($data);

        // Devolver la respuesta JSON con los datos actualizados de la requisición
        return response()->json(new RequisicionResource($requisicion));
    }


    public function destroy($id)
    {
        $requisicion = Requisicion::findOrFail($id);
        $requisicion->delete();
        return response()->json(['message' => 'Requisición eliminada correctamente'], 200);
    }
}
