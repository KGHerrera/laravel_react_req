<?php

namespace App\CRUD;

use EasyPanel\Contracts\CRUDComponent;
use EasyPanel\Parsers\Fields\Field;
use App\Models\Requisicion;

class RequisicionComponent implements CRUDComponent
{
    // Manage actions in crud
    public $create = true;
    public $delete = true;
    public $update = true;

    // If you will set it true it will automatically
    // add `user_id` to create and update action
    public $with_user_id = true;

    public function getModel()
    {
        return Requisicion::class;
    }

    // which kind of data should be showed in list page
    public function fields()
    {
        return ['id_requisicion','fecha_solicitud', 'estado', 'descripcion', 'motivo_rechazo', 'costo_estimado'];
    }

    // Searchable fields, if you dont want search feature, remove it
    public function searchable()
    {
        return ['fecha_solicitud', 'estado', 'descripcion', 'motivo_rechazo', 'costo_estimado'];
    }

    // Write every fields in your db which you want to have a input
    // Available types : "ckeditor", "checkbox", "text", "select", "file", "textarea"
    // "password", "number", "email", "select", "date", "datetime", "time"
    public function inputs()
    {
        return [
           
            'estado' => [
                'select' => [
                    'seleccionar' => 'seleccionar',
                    'pendiente' => 'pendiente',
                    'autorizada' => 'autorizada',
                    'completada' => 'completada',
                    'rechazada' => 'rechazada',
                ]
                
                
            ],
            'costo_estimado' => 'number',
            'descripcion' => 'text',
            'motivo_rechazo' => 'text',
            'evidencia_entrega' => 'file',
            
            
        ];
    }

    // Validation in update and create actions
    // It uses Laravel validation system
    public function validationRules()
    {
        return [
            
            
            'estado' => 'required|in:pendiente,autorizada,rechazada,completada',
            'descripcion' => 'required|string',
            'motivo_rechazo' => 'nullable|string',
            'evidencia_entrega' => 'nullable|file',
            'costo_estimado' => 'required|numeric',
        ];
    }

    // Where files will store for inputs
    public function storePaths()
    {
        return [];
    }
}
