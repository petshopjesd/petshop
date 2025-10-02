import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import {HOST} from '../config.js'
import Cargando from '../components/cargando';
import g from '../css/generaladm.module.css'

export default function Umiembro({ miItem, onInteraccion }) {
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
            titulo: miItem.titulo,
            detalle: miItem.detalle,
        }
    });
    useEffect(() => {
        if (miItem) { // Check if 'miItem' is not null or undefined
            reset({
                id: miItem.id,
                nombre: miItem.nombre,
                titulo: miItem.titulo,
                detalle: miItem.detalle,
            });
        }
    }, [miItem, reset]);

    const enviar = async (data) => {
        setCargando(true);
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("nombre", data.nombre);
        formData.append("titulo", data.titulo);
        formData.append("detalle", data.detalle);
        if (data.fotom && data.fotom.length > 0) {
            formData.append("foto", data.fotom[0]);
        }
        try {
            const response = await fetch(`${HOST}miembros`, {
                method: 'PUT',
                headers: {},
                body: formData
            });

            if (response.ok) {
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
                            {...register('fotom')}
                            id="fotol" className={g.file} type='file' accept="image/*" />
                        <label htmlFor="fotol">
                            <span className={g.imgname}>
                                <span>Foto Miembro</span>
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
        </>
    )
}
