import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Generaimagen from '../components/generaImagen';
import Menuadmin from '../components/menuadmin'
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Umiembro from '../components/umiembro';
import g from '../css/generaladm.module.css'
import Fondo from '../components/fondo';
import { HOST } from '../config';
export default function Apmiembros() {
  const navigate = useNavigate();
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/Apinicio');
    }
  }, [navigate]);
  const { data, loading, error, refetch } = UseFetch(`${HOST}miembros`);
  const [isModalOpenc, setIsModalOpenc] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [isModalOpenb, setIsModalOpenb] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [idmiembrob, setMiembrob] = useState(0);
  const [miembrou, setMiembrou] = useState({});
  const openModalc = () => { setIsModalOpenc(true); };
  const closeModalc = () => { setIsModalOpenc(false); };
  const openModale = (item) => {
    const foto = (item.foto && item.foto.length > 0) ? item.foto[0] : '';
    setMiembrou({
      "id": item.id,
      "nombre": item.nombre,
      "titulo": item.titulo,
      "detalle": item.detalle,
      "foto": foto
    });
    setIsModalOpene(true);
  };
  const closeModale = () => { setIsModalOpene(false); };
  const openModalb = (idb) => {
    setMiembrob(idb);
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
   * cREAR MIEMBRO
   */
  const enviar = async (data) => {
    setCargando(true);
    const formData = new FormData();
    formData.append("foto", data.foto[0]);
    formData.append("nombre", data.nombre);
    formData.append("titulo", data.titulo);
    formData.append("detalle", data.detalle);
    try {
      const response = await fetch(`${HOST}miembros`, {
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
      setCargando(false);
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu administrador ' + error)
    }
    return;
  }
  /******************************************
  Eliminar Miembro
  */
  const borrarmiembro = async () => {
    setCargando(true);
    try {
      const response = await fetch(`${HOST}miembros/${idmiembrob}`, {
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
        alert('error al eliminar al Eliminar al miembro ');
      }
      setCargando(false);
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu adm,inistrador ' + error);
    }

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
                  <th>Nombre</th>
                  <th>Titulo</th>
                  <th>Detalle</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data && data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.titulo}</td>
                      <td>{item.detalle}</td>
                      <td> <Generaimagen foto={item.foto} /></td>
                      <td>
                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                          <img src='/imgs/edit.png' alt='Editar Caso'></img></div>
                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                          <img src='/imgs/delete.png' alt='Eliminar Caso'></img></div>
                        <div className={[g.baccion, g.fleer].join(' ')}>
                          <Link to={`/Apmiembrocred/${item.id}/${item.nombre}`}>
                            <img src='/imgs/certadd.png' alt='Galeria Completos' width={30}></img>
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
                  <h1>Agregar Miembro</h1>
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
                      {...register('titulo', {
                        required: "El Titulo es requerido",
                        minLength: {
                          value: 3,
                          message: "Minimo 3 caracteres"
                        },
                        maxLength: {
                          value: 40,
                          message: "Maximo 40 caracteres"
                        }
                      })}
                      className={g.inputgeneral2} type="text" name='titulo' placeholder='Titulo' />
                    {errors.titulo && (
                      <div className={g.conterror}>
                        <span>{errors.titulo.message}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={g.rengloninput100}>
                  <div className={g.renglongen45}>
                    <input
                      {...register('foto')}
                      id="fotom" className={g.file} type='file' accept="image/*" />
                    <label htmlFor="fotom">
                      <span className={g.imgname}>
                        <span>Foto antes</span>
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
                    <button className={g.botonEnviar}>Guardar Miembro</button>
                  )}
                </div>
              </form>
            </div>
          </Modaldialog>
          <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
            <h3>Eliminar</h3>
            <p>Seguro que quieres Eliminar al Miembro?</p>
            {cargando ? (
              <Cargando mensaje="Guardando..." />
            ) : (

              <button className={g.botongeneral} onClick={borrarmiembro}>Continuar</button>
            )}
          </Modaldialog>
          <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
            <div className={g.contCentro500}>
              <div className={g.rengloninput100}>
                <h2>Editar Miembro</h2>
              </div>
              <Umiembro miItem={miembrou} onInteraccion={manejarInteraccion} />
            </div>
          </Modaldialog>
        </div>
      </div>
    </>
  )
}
