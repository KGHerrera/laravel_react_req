import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';

const Requisiciones = () => {
  const [requisiciones, setRequisiciones] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <div>
        <h1>Requisiciones</h1>
        <Link to="/requisiciones/nueva">Agregar nueva</Link>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Fecha de Solicitud</th>
                <th>Estado</th>
                <th>Motivo de rechazo</th>
                <th>Descripción</th>
                <th>Evidencia de entrega</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requisiciones.map(requisicion => (
                <tr key={requisicion.id_requisicion}>
                  <td>{requisicion.id_requisicion}</td>
                  <td>{requisicion.user}</td>
                  <td>{requisicion.fecha_solicitud}</td>
                  <td>{requisicion.estado}</td>
                  <td>
                    {requisicion.motivo_rechazo ? requisicion.motivo_rechazo : "Aún no se ha rechazado"}
                  </td>
                  <td>{requisicion.descripcion}</td>
                  <td>
                    {requisicion.evidencia_entrega ? "Hay evidencia" : "No hay evidencia"}
                  </td>
                  <td>

                    <Link to={`/requisiciones/${requisicion.id_requisicion}`}>Editar</Link>
                    <button onClick={() => onDeleteClick(requisicion)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Requisiciones;
