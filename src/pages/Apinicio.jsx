import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import {HOST} from '../config.js'
import g from "../css/generaladm.module.css"

export default function Apinicio() {
  const navigate = useNavigate();
  const [userv, setUserv] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  const enviar = async (e) => {

    try {
      const response = await fetch(`${HOST}user/valida?usuario=${e.usuario}&pass=${e.pass}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const datau = await response.json();
      if (datau !== null) {
        if (datau.idstatus === 1) {
          localStorage.setItem('usuario', JSON.stringify(datau));
          navigate('/Aphome');
        } 
      }else {
          setUserv(false);
          reset();
        }
    } catch (error) {
      alert('Estamos experimentando problemas contacta a tu administrador ' + error);
    }
  }
  return (

    <div className={[g.contCentro, g.boxshadow].join(' ')}>
      <div className={g.icon}></div>
      <h1>Inicio de sesion</h1>
      <section>
        <form onSubmit={handleSubmit(enviar)}>
          <div className={g.rengloninput100}>
            <input
              {...register("usuario", {
                required: "El usuario es requerido",
                minLength: {
                  value: 3,
                  message: "Minimo 3 caracteres"
                },
                maxLength: {
                  value: 40,
                  message: "Maximo 40 caracteres"
                }
              })}
              className={g.inputgeneral}
              type='text' name='usuario' placeholder='Usuario' />
            {errors.usuario && (
              <div className={g.conterror}>
                <span>{errors.usuario.message}</span>
              </div>
            )}
          </div>
          <div className={g.rengloninput100}>
            <input
              {...register("pass", {
                required: "El password es requerido",
                minLength: {
                  value: 3,
                  message: "Minimo 3 caracteres"
                },
                maxLength: {
                  value: 40,
                  message: "Maximo 40 caracteres"
                }
              })}
              className={g.inputgeneral}
              type='password' name='pass' placeholder='Password' />
            {errors.pass && (
              <div className={g.conterror}>
                <span>{errors.pass.message}</span>
              </div>
            )}
          </div>
          <div className={g.rengloninput100}>
            {!userv ? (
              <div className={g.conterror}>
                <span>Credenciales invalidas</span>
              </div>
            ) : (<></>)
            }

          </div>
          <div className={g.rengloninput100}>
            <button className={g.botongeneral} type='submit'>Iniciar Sesion</button>
          </div>
        </form>
      </section>
    </div>
  )
}
