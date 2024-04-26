import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { Card, CardBody, CardHeader, IconButton, Typography, Tooltip, Chip, Input, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { NavbarSimple } from '../Components/NavBarSimple';
import { FiPlus } from "react-icons/fi";
import ModalCustom from '../Components/ModalCustom';
import { BsGrid } from "react-icons/bs";


const Requisiciones = () => {
  const [requisiciones, setRequisiciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



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

  const renderizarRequisicionCard = (requisicion) => (
    <Card variant='gradient' className="w-full rounded-md shadow-none" key={requisicion.id_requisicion}>


      <CardBody className="px-4 flex gap-4 flex-col">



        <CardHeader className='w-full bg-gray-900 text-white flex justify-center items-center h-40 m-0'>
          {requisicion.evidencia_entrega ?
            'evidencia subida' : 'sin evidencia'
          }

        </CardHeader>

        <div className='flex justify-between align-top'>
          <Typography className='text-sm text-center'>{requisicion.fecha_solicitud}</Typography>
          <Chip

            variant="gradient"
            value={requisicion.estado}
            color={renderizarColorEstado(requisicion.estado)}
            className='p-1 text-center'
          />


        </div>

        <div className='flex gap-4 flex-col '>
          <Typography className='text-sm'>{requisicion.descripcion}</Typography>

          <Typography className="text-sm font-bold">{requisicion.motivo_rechazo ? requisicion.motivo_rechazo : 'en progreso'}</Typography>
        </div>


        <div className='flex justify-end gap-4'>

          <Link to={`/requisiciones/${requisicion.id_requisicion}`}>
            <Button className='px-4' variant="text">

              Editar
            </Button>
          </Link>



          <Button variant="text" onClick={() => onDeleteClick(requisicion)}>

            Eliminar
          </Button>

        </div>

      </CardBody>
    </Card >
  );

  const toggleView = () => {
    setIsCardView((prev) => !prev); // Cambiar el estado opuesto al estado actual
  };



  return (
    <>
      <div className='min-h-screen from-gray-900 bg-gradient-to-b to-gray-900 p-4 sm:p-8 flex justify-center items-center'>


        <Card className="h-full w-full p-2 min-h-screen">
          <NavbarSimple />


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
              <div className="flex w-full gap-2 sm:w-max sm:flex-nowrap flex-wrap">

                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
                <Link to="/requisiciones/nueva">
                  <IconButton variant='filled' className='bg-pink-800'><FiPlus className="h-5 w-5 font-bold"></FiPlus></IconButton>
                </Link>

                <div>
                  <IconButton onClick={toggleView}>
                    <BsGrid className='w-5 h-5 font-bold' />
                  </IconButton>
                </div>

              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0 overflow-auto">

            {isCardView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {requisicionesFiltradas.map(renderizarRequisicionCard)}
              </div>
            ) : (

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
                        Solicitud
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
                        Costo estimado
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
                    <tr key={requisicion.id_requisicion} className='text-sm'>
                      <td className="px-4 py-2">{requisicion.id_requisicion}</td>
                      <td className="px-4 py-2">{requisicion.user}</td>
                      <td className="px-4 py-2">{requisicion.fecha_solicitud}</td>
                      <td className="px-4 py-2">
                        <Chip

                          variant="filled"
                          value={requisicion.estado}
                          color={renderizarColorEstado(requisicion.estado)}
                          className='p-1 text-center'
                        />
                      </td>
                      <td className="px-4 py-2">
                        {requisicion.motivo_rechazo ? (requisicion.motivo_rechazo.length > 15 ? requisicion.motivo_rechazo.substring(0, 15) + '...' : requisicion.motivo_rechazo) : "Sin revisar"}
                      </td>
                      <td className="px-4 py-2">{requisicion.descripcion.length > 20 ? requisicion.descripcion.substring(0, 20) + '...' : requisicion.descripcion}</td>
                      <td className="px-4 py-2">{requisicion.costo_estimado}</td>
                      <td className="px-4 py-2">
                        {requisicion.evidencia_entrega ? "Hay evidencia" : "No hay evidencia"}
                      </td>
                      <td className="px-4 py-2">
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
              </table>)}
          </CardBody>




        </Card>
      </div>
    </>
  );
};

export default Requisiciones;


