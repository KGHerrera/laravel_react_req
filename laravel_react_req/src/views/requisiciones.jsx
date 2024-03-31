import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { Card, CardBody, CardHeader, IconButton, Typography, Tooltip, Chip, Option, Input, Button, Select } from "@material-tailwind/react";
import { ArrowDownTrayIcon, ArrowLongDownIcon, ArrowLongRightIcon, LockClosedIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { NavbarSimple } from '../Components/NavBarSimple';

const Requisiciones = () => {
  const [requisiciones, setRequisiciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    obtenerRequisiciones();
  }, []);

  const onDeleteClick = requisicion => {
    if (!window.confirm("Are you sure you want to delete this requisicion?")) {
      return;
    }
    axiosClient.delete(`/requisiciones/${requisicion.id_requisicion}`)
      .then(() => {
        obtenerRequisiciones();
      });
  };

  const obtenerRequisiciones = () => {
    setLoading(true);
    axiosClient.get('/requisiciones')
      .then(({ data }) => {
        setRequisiciones(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const filtrarPorEstado = estado => {

  };

  const renderizarColorEstado = estado => {
    switch (estado) {
      case 'pendiente':
        return 'yellow';
      case 'completada':
        return 'blue';
      case 'autorizada':
        return 'green';
      case 'rechazada':
        return 'red';
      default:
        return 'gray';
    }
  };

  const requisicionesFiltradas = selectedState
    ? requisiciones.filter(requisicion => requisicion.estado === selectedState)
    : requisiciones;

  return (
    <>

      <NavbarSimple />

      <Card className="h-full px-4 w-full">


        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Requisiciones
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Detalles sobre las requisiciones agregadas recientemente
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Select onChange={e => filtrarPorEstado(e.target.value)} label="filtrar por">
                <Option value="pendiente">Pendiente</Option>
                <Option value="completada">Completada</Option>
                <Option value="autorizada">Autorizada</Option>
                <Option value="rechazada">Rechazada</Option>
              </Select>
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />

            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    ID
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Usuario
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Fecha de Solicitud
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Estado
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Motivo de rechazo
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Descripción
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Evidencia de entrega
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Acciones
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {requisicionesFiltradas.map(requisicion => (
                <tr key={requisicion.id_requisicion}>
                  <td className="p-4">{requisicion.id_requisicion}</td>
                  <td className="p-4">{requisicion.user}</td>
                  <td className="p-4">{requisicion.fecha_solicitud}</td>
                  <td className="p-4">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={requisicion.estado}
                      color={renderizarColorEstado(requisicion.estado)}
                    />
                  </td>
                  <td className="p-4">
                    {requisicion.motivo_rechazo ? requisicion.motivo_rechazo : "Aún no se ha rechazado"}
                  </td>
                  <td className="p-4">{requisicion.descripcion}</td>
                  <td className="p-4">
                    {requisicion.evidencia_entrega ? "Hay evidencia" : "No hay evidencia"}
                  </td>
                  <td className="p-4">
                    <Tooltip content="Editar requisición">
                      <Link to={`/requisiciones/${requisicion.id_requisicion}`}>
                        <IconButton variant="text">

                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Link>
                    </Tooltip>

                    <Tooltip content="Eliminar requisición">
                      <IconButton variant="text" onClick={() => onDeleteClick(requisicion)}>

                        <TrashIcon className="h-4 w-4" />
                      </IconButton>

                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default Requisiciones;


