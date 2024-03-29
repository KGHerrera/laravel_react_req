import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function RequisicionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requisicion, setRequisicion] = useState({
    id_requisicion: null,
    id_usuario: '',
    fecha_solicitud: '',
    estado: '',
    descripcion: '',
    costo_estimado: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/requisiciones/${id}`)
        .then(({ data }) => {
          setLoading(false);
          console.log(data)
          setRequisicion(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (requisicion.id_requisicion) {
      axiosClient.put(`/requisiciones/${requisicion.id_requisicion}`, requisicion)
        .then(() => {
          navigate('/requisiciones');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/requisiciones', requisicion)
        .then(() => {
          navigate('/requisiciones');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {requisicion.id_requisicion && <h1>Actualizar Requisición: {requisicion.id_requisicion}</h1>}
      {!requisicion.id_requisicion && <h1>Nueva Requisición</h1>}
      <div>
        {loading && <div>Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={requisicion.id_usuario}
              onChange={(ev) =>
                setRequisicion({ ...requisicion, id_usuario: ev.target.value })
              }
              placeholder="ID Usuario"
            />
            <input
              value={requisicion.fecha_solicitud}
              onChange={(ev) =>
                setRequisicion({ ...requisicion, fecha_solicitud: ev.target.value })
              }
              placeholder="Fecha de Solicitud"
            />
            <input
              value={requisicion.estado}
              onChange={(ev) =>
                setRequisicion({ ...requisicion, estado: ev.target.value })
              }
              placeholder="Estado"
            />
            <input
              value={requisicion.descripcion}
              onChange={(ev) =>
                setRequisicion({ ...requisicion, descripcion: ev.target.value })
              }
              placeholder="Descripción"
            />
            <input
              value={requisicion.costo_estimado}
              onChange={(ev) =>
                setRequisicion({ ...requisicion, costo_estimado: ev.target.value })
              }
              placeholder="Costo Estimado"
            />
            <input type="submit" value="Guardar" />
          </form>
        )}
      </div>
    </>
  );
}