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
} from "@material-tailwind/react";

export default function RequisicionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useStateContext();

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
      requisicion.id_usuario = user.id;
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

  const handleChangeDescripcion = (ev) => {
    setRequisicion({ ...requisicion, descripcion: ev.target.value });
    if (ev.target.value.length >= 10) {
      setErrors({ ...errors, descripcion: '' });
    } else {
      setErrors({ ...errors, descripcion: 'La descripción debe tener al menos 10 caracteres.' });
    }
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

      <div className="flex justify-center items-center min-h-screen bg-gray-900">

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

          

            
          


          {loading && <div>Loading...</div>}
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
                  {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion}</p>}
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
                  {errors.costo_estimado && <p className="text-red-500 text-xs">{errors.costo_estimado}</p>}
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
                <Button type="submit" className="bg-pink-800" variant="filled" fullWidth>
                  Guardar
                </Button>

                <Button variant="filled" className="" fullWidth onClick={handleCancelar}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </>

  );
}