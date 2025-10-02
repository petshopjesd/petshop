import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import Cargando from '../components/cargando';
import {HOST} from '../config.js'
import g from '../css/generaladm.module.css'
import u from '../css/usuario.module.css'



export default function Uusuario({ miItem, onInteraccion }) {
  const fechal = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const fechasimple = `${fechal.getFullYear()}-${pad(fechal.getMonth() + 1)}-${pad(fechal.getDate())}`;
  const [cargando, setCargando] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      iduser: miItem.iduser,
      name: miItem.name,
      apellido: miItem.apellido,
      usuario: miItem.usuario,
      pass: miItem.pass,
      email: miItem.email,
      fechaupdate: fechasimple,
      pcasos: miItem.pcasos,
      pcitas: miItem.pcitas,
      pcredenciales: miItem.pcredenciales,
      pgaleria: miItem.pgaleria,
      pmiembros: miItem.pmiembros,
      pservicios: miItem.pservicios,
      pusuarios: miItem.pusuarios,
    }
  });

  useEffect(() => {
    if (miItem) {
      reset({
        iduser: miItem.iduser,
        name: miItem.name,
        apellido: miItem.apellido,
        usuario: miItem.usuario,
        pass: miItem.pass,
        email: miItem.email,
        fechaupdate: fechasimple,
        pcasos: miItem.pcasos,
        pcitas: miItem.pcitas,
        pcredenciales: miItem.pcredenciales,
        pgaleria: miItem.pgaleria,
        pmiembros: miItem.pmiembros,
        pservicios: miItem.pservicios,
        pusuarios: miItem.pusuarios,
      });
    }
  }, [miItem, reset]);

  const iconview = watch('icono');
  useEffect(() => {
  }, [iconview]);
  const enviar = async (data) => {
    setCargando(true);
    const payload = {
            ...data,
            pcasos: data.pcasos ? 1 : 0,
            pcitas: data.pcitas ? 1 : 0,
            pcredenciales: data.pcredenciales ? 1 : 0,
            pgaleria: data.pgaleria ? 1 : 0,
            pmiembros: data.pmiembros ? 1 : 0,
            pservicios: data.pservicios ? 1 : 0,
            pusuarios: data.pusuarios ? 1 : 0,
        };
    try {
      const response = await fetch(`${HOST}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        onInteraccion();
      } else {
        alert('No se pudo guardar la informacion')
      }
      setCargando(false);
    } catch (error) {
      alert('estamos teniendo problemas contacta a tu administrador ' + error)
    }
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit(enviar)}>
        <input {...register('iduser')} type='hidden' name='iduser' />
        <input {...register('fechaupdate')} type='hidden' name='fechaupdate' />
        <input {...register('idestatus')} type='hidden' name='idestatus' />
        <div className={g.rengloninput100}>
          <h1>Agregar Usuario</h1>
        </div>
        <div className={g.rengloninput100}>
          <div className={g.renglongen45}>
            <input
              {...register('name', {
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
              className={g.inputgeneral2} type='text' name="name" placeholder='Nombre' />
            {errors.name && (
              <div className={g.conterror}>
                <span>{errors.name.message}</span>
              </div>
            )}
          </div>
          <div className={g.renglongen5}></div>
          <div className={g.renglongen50}>
            <input
              {...register('apellido', {
                required: "El apellido es requerido",
              })}
              className={g.inputgeneral2} type="text" name='apellido' placeholder='Apellido' />
            {errors.apellido && (
              <div className={g.conterror}>
                <span>{errors.apellido.message}</span>
              </div>
            )}
          </div>
        </div>
        <div className={g.rengloninput100}>
          <div className={g.renglongen45}>
            <input
              {...register('usuario', {
                required: "El nombre de usuario es requerido",
                minLength: {
                  value: 3,
                  message: "Minimo 3 caracteres"
                },
                maxLength: {
                  value: 40,
                  message: "Maximo 40 caracteres"
                }
              })}
              className={g.inputgeneral2} type='text' name="usuario" placeholder='Nombre de Usuario' />
            {errors.usuario && (
              <div className={g.conterror}>
                <span>{errors.usuario.message}</span>
              </div>
            )}
          </div>
          <div className={g.renglongen5}></div>
          <div className={g.renglongen50}>
            <input
              {...register('pass', {
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres"
                },
                maxLength: {
                  value: 40,
                  message: "La contraseña no puede exceder los 40 caracteres"
                },
                validate: {
                  hasUpper: (value) => /[A-Z]/.test(value) || "Debe contener al menos una letra mayúscula.",
                  hasLower: (value) => /[a-z]/.test(value) || "Debe contener al menos una letra minúscula.",
                  hasNumber: (value) => /\d/.test(value) || "Debe contener al menos un número.",
                  hasSpecial: (value) => /[@$!%*?&]/.test(value) || "Debe contener al menos un caracter especial (@$!%*?&)."
                }
              })}
              className={g.inputgeneral2} type='password' name="pass" placeholder='Agrega Contrasena' />
            {errors.pass && (
              <div className={g.conterror}>
                <span>{errors.pass.message}</span>
              </div>
            )}
          </div>
        </div>
        <div className={g.rengloninput100}>
          <div className={g.renglongen45}>
            <input
              {...register('email', {
                required: "El email es requerido",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Formato de email incorrecto"
                }
              })}
              className={g.inputgeneral2} type='email' name="email" placeholder='Correo Electronico' />
            {errors.email && (
              <div className={g.conterror}>
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>
          <div className={g.renglongen5}></div>
          <div className={g.renglongen50}>

          </div>
        </div>
        <div className={g.rengloninput100}>
          <label className={u.container}>Casos
            <input {...register('pcasos')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
          <label className={u.container}>Citas
            <input {...register('pcitas')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
          <label className={u.container}>Credenciales
            <input {...register('pcredenciales')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
          <label className={u.container}>Galeria
            <input {...register('pgaleria')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>

        </div>
        <div className={g.rengloninput100}>
          <label className={u.container}>Miembros
            <input {...register('pmiembros')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
          <label className={u.container}>Servicios
            <input {...register('pservicios')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
          <label className={u.container}>Usuarios
            <input {...register('pusuarios')} type="checkbox" />
            <span className={u.checkmark}></span>
          </label>
        </div>
        <div className={g.renglongen100}></div>
        <div className={g.rengloninput100}>
          {cargando ? (
            <Cargando mensaje="Guardando..." />
          ) : (
            <button className={g.botonEnviar}>Guardar Usuario</button>
          )}
        </div>
      </form>
    </>
  )
}
