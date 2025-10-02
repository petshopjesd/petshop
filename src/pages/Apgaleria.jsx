import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import Menuadmin from '../components/menuadmin'
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Ugaleria from '../components/ugaleria';
import Fondo from '../components/fondo';
import g from '../css/generaladm.module.css'
import { HOST } from '../config';
export default function Apgaleria() {
  const navigate = useNavigate();
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/Apinicio');
    }
  }, [navigate]);
  const { data, loading, error, refetch } = UseFetch(HOST+'galeria');
  const [isModalOpenc, setIsModalOpenc] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [isModalOpenb, setIsModalOpenb] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [idgaleriab, setGaleriab] = useState(0);
  const [galeriau, setGaleriau] = useState({});
  const openModalc = () => { setIsModalOpenc(true); };
  const closeModalc = () => { setIsModalOpenc(false); };
  const openModale = (item) => {
    setGaleriau({
      "id": item.id,
      "nombre": item.nombre,
      "detalle": item.detalle,
      "fecha": item.fecha
    });
    setIsModalOpene(true);
  };
  const closeModale = () => { setIsModalOpene(false); };
  const openModalb = (idb) => {
    setGaleriab(idb);
    setIsModalOpenb(true);
  };
  const closeModalb = () => { setIsModalOpenb(false); };
  const manejarInteraccion = () => {
    setIsModalOpene(false);
    refetch();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });
  /**********************************
   * CREAR MIEMBRO
   */
  const enviar = async (data) => {
    setCargando(true);
    try {
      const response = await fetch(HOST+'galeria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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
      setCargando(false);
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu administrador ' + error)
    }
    return;
  }
  /******************************************
  Eliminar Miembro
  */
  const borrargaleria = async () => {
    setCargando(true);
    try {
      const response = await fetch(HOST+'galeria/' + idgaleriab, {
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
        alert('error al eliminar al Eliminar la galeria ');
      }
      setCargando(false);
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu administrador ' + error);
    }

  }

  return (
    <>
      <Menuadmin />
      <Fondo />
      <div className={g.contPrincipal}>
        <div className={g.contCentro900}>
          <h1>Galerias de fotos</h1>
          <div className={g.renglongen100}>
            <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
              <img src='/imgs/addnote.png' alt='Agregar galeria nueva'></img></div>
          </div>
          <div className={g.secciontabla1}>
            <table className={g.tabla100}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Detalle</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data && data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.detalle}</td>
                      <td>{item.fecha}</td>
                      <td>
                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                          <img src='/imgs/edit.png' alt='Editar Galeria'></img></div>
                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                          <img src='/imgs/delete.png' alt='Eliminar Galeria'></img></div>
                          <div className={[g.baccion, g.fleer].join(' ')}>
                            <Link to={"/Apfotos/"+item.id}>
                            <img src='/imgs/addphoto.png' alt='Galeria Completos'></img>
                            </Link>
                            </div>
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
            {loading &&
              <Cargando mensaje="Cargando..." />
            }
          </div>
          <Modaldialog isOpen={isModalOpenc} onClose={closeModalc}>
            <div className={g.contCentro400}>
              <form onSubmit={handleSubmit(enviar)}>
                <div className={g.rengloninput100}>
                  <h1>Agregar Galeria</h1>
                </div>
                <div className={g.rengloninput100}>
                  <div className={g.renglongen45}>
                    <input
                      {...register('nombre', {
                        required: "El Nombre es requerido",
                        minLength: {
                          value: 3,
                          message: "Minimo 3 caracteres"
                        },
                        maxLength: {
                          value: 40,
                          message: "Maximo 40 caracteres"
                        }
                      })}
                      className={g.inputgeneral2} type='text' name="nombre" placeholder='Nombre' />
                    {errors.nombre && (
                      <div className={g.conterror}>
                        <span>{errors.nombre.message}</span>
                      </div>
                    )}
                  </div>
                  <div className={g.renglongen5}></div>
                  <div className={g.renglongen50}>
                    <input
                      {...register('fecha', {
                        required: "la fecha es requerida",
                      })}
                      className={g.inputgeneral2} type="date" name='fecha' placeholder='Fecha' />
                    {errors.fecha && (
                      <div className={g.conterror}>
                        <span>{errors.fecha.message}</span>
                      </div>
                    )}
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
                        value: 400,
                        message: "Maximo 40 caracteres"
                      }
                    })}
                    className={g.mytextarea} name='detalle' placeholder='Detalles del miembro' />
                  {errors.detalle && (
                    <div className={g.conterror}>
                      <span>{errors.detalle.message}</span>
                    </div>
                  )}
                </div>
                <div className={g.renglongen100}></div>
                <div className={g.rengloninput100}>
                  {cargando ? (
                    <Cargando mensaje="Guardando..." />
                  ) : (
                    <button className={g.botonEnviar}>Guardar Galeria</button>
                  )}
                </div>
              </form>
            </div>
          </Modaldialog>
          <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
            <h3>Eliminar</h3>
            <p>Seguro que quieres Eliminar la Galeria?</p>
            {cargando ? (
              <Cargando mensaje="Guardando..." />
            ) : (

              <button className={g.botongeneral} onClick={borrargaleria}>Continuar</button>
            )}
          </Modaldialog>
          <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
            <div className={g.contCentro500}>
              <Ugaleria miItem={galeriau} onInteraccion={manejarInteraccion} />
            </div>
          </Modaldialog>
        </div>
      </div>

    </>
  )
}
