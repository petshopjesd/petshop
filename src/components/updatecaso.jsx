import React from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import {HOST} from '../config.js'
import g from '../css/generaladm.module.css'
export default function Updatecaso({ miItem, onInteraccion }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange",
        defaultValues: {
            id: miItem.id,
            titulo: miItem.titulo,
            mascota: miItem.mascota,
            detalle: miItem.detalle,
            fecha: miItem.fecha,
            idmiembro: miItem.idmiembro,
            fotoi: miItem.fotoi,
            fotof: miItem.fotof
        }
    });
    useEffect(() => {
        if (miItem) { // Check if 'miItem' is not null or undefined
            reset({
                id: miItem.id,
                titulo: miItem.titulo,
                mascota: miItem.mascota,
                detalle: miItem.detalle,
                fecha: miItem.fecha,
                idmiembro: miItem.idmiembro,
                fotoi: miItem.fotoi,
                fotof: miItem.fotof
            });
        }
    }, [miItem, reset]);

    const enviar = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("fotoi", data.fotoi[0]);
        formData.append("fotof", data.fotof[0]);
        formData.append("titulo", data.titulo);
        formData.append("mascota", data.mascota);
        formData.append("detalle", data.detalle);
        formData.append("fecha", data.fecha);
        formData.append("idmiembro", data.idmiembro);

        try {
            const response = await fetch(`${HOST}casos`, {
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
    }
    return (
        <>
            <form onSubmit={handleSubmit(enviar)} >
                <input
                    {...register('id')}
                    type='hidden' name='id' />
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
                            id="fotoil" className={g.file} type='file' accept="image/*" />
                        <label htmlFor="fotoil">
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
                            id="fotofl" className={g.file} type='file' accept="image/*" />
                        <label htmlFor="fotofl">
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
                                value: 400,
                                message: "Maximo 40 caracteres"
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
        </>
    )
}
