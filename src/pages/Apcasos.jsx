import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import Menuadmin from '../components/menuadmin'
import Modaldialog from '../components/modaldialog';
import { UseFetch } from '../components/useFetch';
import Updatecaso from '../components/updatecaso';
import Generaimagen from '../components/generaImagen';
import Fondo from '../components/fondo';
import g from '../css/generaladm.module.css'
import { HOST } from '../config';


export default function Apcasos() {
  const navigate = useNavigate();
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/Apinicio');
    }
  }, [navigate]);

  const manejarInteraccion = () => {
    setIsModalOpene(false);
    refetch();
  };
  const [isModalOpenc, setIsModalOpenc] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [isModalOpenb, setIsModalOpenb] = useState(false);
  const [isModalOpenv, setIsModalOpenv] = useState(false);
  const [idcasob, setCasoid] = useState(0);
  const [casou, setCasou] = useState({});
  const [casov, setCasov] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  const openModalc = () => { setIsModalOpenc(true); };
  const closeModalc = () => { setIsModalOpenc(false); };
  const openModale = (item) => {
    const fotoi = (item.fotoi && item.fotoi.length > 0) ? item.fotoi : '';
    const fotof = (item.fotof && item.fotof.length > 0) ? item.fotof : '';
    setCasou({
      "id": item.id,
      "titulo": item.titulo,
      "mascota": item.mascota,
      "detalle": item.detalle,
      "fotoi": fotoi,
      "fotof": fotof,
      "fecha": item.fecha,
      "idmiembro": item.idmiembro
    });
    setIsModalOpene(true);
  };
  const closeModale = () => { setIsModalOpene(false); };
  const openModalb = (idcaso) => {
    setCasoid(idcaso);
    setIsModalOpenb(true);
  };
  const closeModalb = () => { setIsModalOpenb(false); };
  const openModalv = (item) => {
    const fotoi = (item.fotoi && item.fotoi.length > 0) ? item.fotoi : '';
    const fotof = (item.fotof && item.fotof.length > 0) ? item.fotof : '';
    setCasov({
      "id": item.id,
      "titulo": item.titulo,
      "mascota": item.mascota,
      "detalle": item.detalle,
      "fotoi": fotoi,
      "fotof": fotof,
      "fecha": item.fecha,
      "idmiembro": item.idmiembro
    });
    setIsModalOpenv(true);
  };
  const closeModalv = () => { setIsModalOpenv(false); };
  const { data, loading, error, refetch } = UseFetch(HOST+'casos');

  const borrarcaso = async () => {
    try {
      const response = await fetch(host+'casos/' + idcasob, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        refetch();
        reset();
        setIsModalOpenb(false);
      } else {
        alert('error al eliminar el caso ');
      }
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu adm,inistrador ' + error);
    }

  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  const enviar = async (data) => {
    const formData = new FormData();
    formData.append("fotoi", data.fotoi[0]);
    formData.append("fotof", data.fotof[0]);
    formData.append("titulo", data.titulo);
    formData.append("mascota", data.mascota);
    formData.append("detalle", data.detalle);
    formData.append("fecha", data.fecha);
    formData.append("idmiembro", data.idmiembro);
    try {
      const response = await fetch(HOST+'casos', {
        method: 'POST',
        headers: {},
        body: formData
      });
      const datau = await response.json();
      const datosfinales = JSON.stringify(datau);
      if (datosfinales.id !== null) {
        setIsModalOpenc(false);
        refetch();
        reset();
      } else {
        alert('No se pudo guardar la informacion')
      }
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu administrador ' + error)
    }
    return;
  }

  return (
    <>
      <Menuadmin />
      <Fondo />
      <div className={g.contPrincipal}>
        <div className={g.contCentro900}>
          <h1>Casos de exito</h1>
          <div className={g.renglongen100}>
            <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
              <img src='/imgs/addnote.png' alt='Agregar caso nuevo'></img></div>
          </div>
          <div className={g.secciontabla1}>
            <table className={g.tabla100}>
              <thead>
                <tr>
                  <th>Caso</th>
                  <th>Mascota</th>
                  <th>Facha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data && data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.titulo}</td>
                      <td>{item.mascota}</td>
                      <td>{item.fecha}</td>
                      <td>
                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}><img src='/imgs/edit.png' alt='Editar Caso'></img></div>
                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}><img src='/imgs/delete.png' alt='Eliminar Caso'></img></div>
                        <div className={[g.baccion, g.fleer].join(' ')} onClick={() => openModalv(item)}><img src='/imgs/lupa.png' alt='Caso Completos'></img></div>
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td colSpan={4}>No hay casos para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
            {error && <p>Error al cargar los datos: {error.mensaje}</p>}
            {loading && <p>Cargando...</p>}
          </div>
        </div>
        <Modaldialog isOpen={isModalOpenc} onClose={closeModalc}>
          <div className={g.contCentro500}>
            <div className={g.rengloninput100}>
              <h2>Agregar Usuario</h2>
            </div>
            <form onSubmit={handleSubmit(enviar)} >
              <div className={g.rengloninput100}>
                <div className={g.renglongen45}>
                  <input
                    {...register('titulo', {
                      required: "El titulo es requerido",
                      minLength: {
                        value: 3,
                        message: "Minimo 3 caracteres"
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximo 40 caracteres"
                      }
                    })}
                    className={g.inputgeneral2} type='text' name="titulo" placeholder='Titulo' />
                  {errors.titulo && (
                    <div className={g.conterror}>
                      <span>{errors.titulo.message}</span>
                    </div>
                  )}
                </div>
                <div className={g.renglongen5}></div>
                <div className={g.renglongen50}>
                  <input
                    {...register('mascota', {
                      required: "El nombre de la mascota es requerido",
                      minLength: {
                        value: 3,
                        message: "Minimo 3 caracteres"
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximo 40 caracteres"
                      }
                    })}
                    className={g.inputgeneral2} type="text" name='mascota' placeholder='Mascota' />
                  {errors.mascota && (
                    <div className={g.conterror}>
                      <span>{errors.mascota.message}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={g.rengloninput100}>
                <div className={g.renglongen45}>
                  <input
                    {...register('fecha', {
                      required: "El fecha es requerida"
                    })}
                    className={g.inputgeneral2} type='date' name='fecha' />
                  {errors.fecha && (
                    <div className={g.conterror}>
                      <span>{errors.fecha.message}</span>
                    </div>
                  )}
                </div>
                <div className={g.renglongen5}></div>
                <div className={g.renglongen50}>
                  <select
                    {...register('idmiembro', {
                      required: "El miembro es requerido"
                    })}
                    className={g.inputgeneral2} id="idmiembro" name="idmiembro">
                    <option value="1">Luz DA</option>
                  </select>
                  {errors.idmiembro && (
                    <div className={g.conterror}>
                      <span>{errors.idmiembro.message}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={g.rengloninput100}>
                <div className={g.renglongen45}>
                  <input
                    {...register('fotoi')}
                    id="fotoi" className={g.file} type='file' accept="image/*" />
                  <label htmlFor="fotoi">
                    <span className={g.imgname}>
                      <span>Foto antes</span>
                    </span>
                    <span className={g.imgbutton}>Buscar Archivo</span>
                  </label>
                </div>
                <div className={g.renglongen5}></div>
                <div className={g.renglongen50}>
                  <input
                    {...register('fotof')}
                    id="fotof" className={g.file} type='file' accept="image/*" />
                  <label htmlFor="fotof">
                    <span className={g.imgname}>
                      <span>Foto despues</span>
                    </span>
                    <span className={g.imgbutton}>Buscar Archivo</span>
                  </label>
                </div>
              </div>
              <div className={g.rengloninput100}>
                <textarea
                  {...register("detalle", {
                    required: "Se requiere detalle del caso",
                    minLength: {
                      value: 3,
                      message: "Minimo 5 caracteres"
                    },
                    maxLength: {
                      value: 10000,
                      message: "Maximo 10000 caracteres"
                    }
                  })}
                  className={g.mytextarea} name='detalle' placeholder='Detalles del caso' />
                {errors.detalle && (
                  <div className={g.conterror}>
                    <span>{errors.detalle.message}</span>
                  </div>
                )}
              </div>
              <div className={g.renglongen100}></div>
              <div className={g.rengloninput100}>
                <button className={g.botonEnviar}>Guardar Caso</button>
              </div>
            </form>
          </div>
        </Modaldialog>
        <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
          <div className={g.contCentro500}>
            <div className={g.rengloninput100}>
              <h2>Editar Usuario</h2>
            </div>
            <Updatecaso miItem={casou} onInteraccion={manejarInteraccion} />
          </div>
        </Modaldialog>
        <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
          <h3>Eliminar caso</h3>
          <p>Seguro que quieres Eliminar el caso?</p>
          <button className={g.botongeneral} onClick={borrarcaso}>Continuar</button>
        </Modaldialog>
        <Modaldialog isOpen={isModalOpenv} onClose={closeModalv}>
          <div className={g.modalview}>
            <h3>Vista previa</h3>
            <div className={g.seccionFotos}>
              <Generaimagen foto={casov.fotoi} />
              <div className={g.renglongen100}></div>
              <Generaimagen foto={casov.fotof} />
            </div>
            <div className={g.seccionDetalle}>
              <div className={g.renglongen100}>
                <p>Caso: {casov.titulo}
                  <br />
                  Mascota: {casov.mascota}
                </p>
              </div>
              <div className={g.renglongen100}>
                <p>Miembro:{casov.idmiembro} fecha:{casov.fecha}</p>
              </div>
              <p>{casov.detalle}</p>
            </div>
          </div>
        </Modaldialog>
      </div>
    </>
  )
}
