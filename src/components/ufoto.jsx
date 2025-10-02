import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import {HOST} from '../config';
import Cargando from '../components/cargando';
import g from '../css/generaladm.module.css'
export default function Ufoto({ miItem, onInteraccion }) {
  const [cargando, setCargando] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: miItem.id,
      idgaleria: miItem.idgaleria,
      nombre: miItem.nombre
    }
  });
  useEffect(() => {
    if (miItem) { // Check if 'miItem' is not null or undefined
      reset({
        id: miItem.id,
        idgaleria: miItem.idgaleria,
        nombre: miItem.nombre
      });
    }
  }, [miItem, reset]);

  const enviar = async (data) => {
    setCargando(true);
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("nombre", data.nombre);
    formData.append("idgaleria", data.idgaleria);
    if (data.foto && data.foto.length > 0) {
      formData.append("foto", data.foto[0]);
    }
    try {
      const response = await fetch(`${HOST}foto`, {
        method: 'PUT',
        headers: {},
        body: formData
      });

      if (response.ok) {
        console.log("Formulario exitoso");
        onInteraccion();
      } else {
        alert('No se pudo guardar la información');
      }
    } catch (error) {
      alert('Estamos teniendo problemas, contacta a tu administrador: ' + error);
    }
    setCargando(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit(enviar)}>
        <input {...register('id')} type='hidden' name='id' />
        <input {...register('idgaleria')} type='hidden' name='id' />
        <div className={g.rengloninput100}>
          <h1>Agregar Foto</h1>
        </div>
        <div className={g.rengloninput100}>
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
        <div className={g.rengloninput100}>
          <input
            {...register('foto')}
            id="fotom" className={g.file} type='file' accept="image/*" />
          <label htmlFor="fotom">
            <span className={g.imgname}>
              <span>Foto</span>
            </span>
            <span className={g.imgbutton}>Buscar Archivo</span>
          </label>
        </div>
        <div className={g.renglongen100}></div>
        <div className={g.rengloninput100}>
          {cargando ? (
            <Cargando mensaje="Guardando..." />
          ) : (
            <button className={g.botonEnviar}>Guardar Foto</button>
          )}
        </div>
      </form>
    </>

  )
}
