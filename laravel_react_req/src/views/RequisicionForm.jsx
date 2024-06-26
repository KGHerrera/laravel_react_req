import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  CardHeader,
  Spinner,
} from "@material-tailwind/react";

export default function RequisicionForm({ id, closeModal, obtenerRequisiciones, onSuccess }) {

  const navigate = useNavigate();
  const { user } = useStateContext();

  const [loadingData, setLoadingData] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [requisicion, setRequisicion] = useState({
    id_requisicion: null,
    id_usuario: '',
    fecha_solicitud: today,
    estado: 'pendiente',
    descripcion: '',
    costo_estimado: '',
    motivo_rechazo: '',
    evidencia_entrega: '',
  });
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const [errors, setErrors] = useState({
    descripcion: '',
    costo_estimado: ''
  });

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

    if (requisicion.descripcion.trim().length < 10) {
      setErrors({
        ...errors,
        descripcion: 'La descripción debe tener al menos 10 caracteres'
      });
      return;
    }

    setLoadingData(true);

    if (requisicion.evidencia_entrega) {
      const formData = new FormData();
      formData.append('image', requisicion.evidencia_entrega);

      axiosClient.post('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          const image_url = response.data.image_url;

          // Actualiza la requisición con la URL de la imagen
          updateRequisicion(image_url);
        })
        .catch((error) => {
          console.error('Error al subir la imagen:', error);
          setLoadingData(false);
          // Manejar el error de subida de imagen
        });
    } else {
      // No hay imagen para subir, solo actualizar los datos de la requisición
      updateRequisicion('');
    }
  };

  const updateRequisicion = (image_url) => {
    if (requisicion.id_requisicion) {
      requisicion.evidencia_entrega = image_url;

      axiosClient.put(`/requisiciones/${requisicion.id_requisicion}`, requisicion)
        .then(() => {
          setLoadingData(false);
          closeModal();
          onSuccess('Requisición actualizada con éxito');
          obtenerRequisiciones();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }

          setLoadingData(false);
        });
    } else {
      requisicion.id_usuario = user.id;
      requisicion.evidencia_entrega = image_url;

      axiosClient.post('/requisiciones', requisicion)
        .then(() => {
          setLoadingData(false);
          closeModal();
          onSuccess('Requisición agregada con éxito');
          obtenerRequisiciones();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoadingData(false);
        });
    }
  };


  const handleChangeDescripcion = (ev) => {
    setRequisicion({ ...requisicion, descripcion: ev.target.value });

  };

  const handleChangeCostoEstimado = (ev) => {
    setRequisicion({ ...requisicion, costo_estimado: ev.target.value });
    const costoPattern = /^\d+(\.\d{1,2})?$/;
    if (costoPattern.test(ev.target.value)) {
      setErrors({ ...errors, costo_estimado: '' });
    } else {
      setErrors({
        ...errors,
        costo_estimado: 'El costo estimado debe ser un número entero'
      });
    }
  };

  const handleCancelar = () => {
    history('/requisiciones');
  };

  return (
    <>






      <Card className="max-w-md shadow-lg p-8" style={{ width: '360px' }}>


        <CardHeader
          variant="filled"
          color="gray"
          className="grid m-0 mb-8 h-24 w-full place-items-center"
        >
          <Typography variant="h4" color="white" className="text-center">



            {requisicion.id_requisicion && "Editar requisición" || "Nueva requisición"}

          </Typography>
        </CardHeader>







        {loading && <div>Cargando datos...</div>}
        {/* {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )} */}
        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <Select
                value={requisicion.estado}
                onChange={(val) => setRequisicion({ ...requisicion, estado: val })}
                label="Estado"

              >
                <Option value="pendiente">Pendiente</Option>
                <Option value="autorizada">Autorizada</Option>
                <Option value="rechazada">Rechazada</Option>
                <Option value="completada">Completada</Option>
              </Select>



              {requisicion.estado === 'rechazada' &&
                <Input
                  label="Motivo de rechazo"
                  value={requisicion.motivo_rechazo || ''}
                  onChange={(ev) =>
                    setRequisicion({ ...requisicion, motivo_rechazo: ev.target.value })
                  }
                  placeholder="Motivo de Rechazo"
                  className="input"
                  icon={<i className="fa fa-exclamation" />}

                />
              }
              <div>
                <Textarea
                  value={requisicion.descripcion}
                  label="Descripción"
                  onChange={(ev) => handleChangeDescripcion(ev)}
                  placeholder=""
                  className="input"

                />
                {errors.descripcion && <p className="text-pink-500 text-xs">{errors.descripcion}</p>}
              </div>

              <div>
                <Input
                  value={requisicion.costo_estimado}
                  label="Costo Estimado"
                  onChange={(ev) =>
                    handleChangeCostoEstimado(ev)
                  }
                  placeholder="Costo Estimado"
                  className="input"
                  icon={<i className="fa fa-dollar" />}
                />
                {errors.costo_estimado && <p className="text-pink-500 text-xs mt-2">{errors.costo_estimado}</p>}
              </div>

              {requisicion.id_requisicion &&
                <Input
                  label="Evidencia de Entrega"

                  type="file"
                  className="file-select"

                  onChange={(ev) =>
                    setRequisicion({ ...requisicion, evidencia_entrega: ev.target.files[0] })
                  }
                  variant="outlined"
                />

              }
            </div>

            <div className="flex flex-row mt-6 gap-2">



              {loadingData ?

                <Button color='pink' variant="filled" fullWidth className="flex justify-center">
                  <Spinner className="h-4" color="white"></Spinner>
                </Button>
                :

                <Button type="submit" color='pink' variant="filled" fullWidth>
                  Guardar
                </Button>

              }




              <Button variant="filled" className="" fullWidth onClick={closeModal}>
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </Card>

    </>

  );
}