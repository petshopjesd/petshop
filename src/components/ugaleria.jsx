import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import Cargando from '../components/cargando';
import g from '../css/generaladm.module.css'
import {HOST} from '../config.js'

export default function Ugaleria({ miItem, onInteraccion }) {
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
            nombre: miItem.nombre,
            detalle: miItem.detalle,
            fecha: miItem.fecha
        }
    });
    useEffect(() => {
        if (miItem) { // Check if 'miItem' is not null or undefined
            reset({
                id: miItem.id,
                nombre: miItem.nombre,
                detalle: miItem.detalle,
                fecha: miItem.fecha
            });
        }
    }, [miItem, reset]);
    const enviar = async (data) => {
        setCargando(true);
        try {
            const response = await fetch(`${HOST}galeria`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const datau = await response.json();
            const datosfinales = JSON.stringify(datau);
            if (datosfinales.id !== null) {
                console.log("Formulario exitoso");
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
                <div className={g.rengloninput100}>
                    <h1>Editar Galeria</h1>
                </div>
                <div className={g.rengloninput100}>
                    <div className={g.renglongen45}>
                        <input {...register('id')}
                        type='hidden' name='id'/>
                        <input {...register('nombre', {
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
        </>
    )
}
