import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import Cargando from '../components/cargando';
import g from '../css/generaladm.module.css'
import {HOST} from '../config';

export default function Ucredencial({ miItem, onInteraccion }) {
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
            descripcion: miItem.descripcion
        }
    });
    useEffect(() => {
        if (miItem) { // Check if 'miItem' is not null or undefined
            reset({
                id: miItem.id,
                nombre: miItem.nombre,
                descripcion: miItem.descripcion
            });
        }
    }, [miItem, reset]);

    const enviar = async (data) => {
        setCargando(true);
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("nombre", data.nombre);
        formData.append("descripcion", data.descripcion);
        if (data.img && data.img.length > 0) {
            formData.append("img", data.img[0]);
        }
        try {
            const response = await fetch(HOST+'credenciales', {
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
                <input 
                {...register('id')}
                type="hidden" name="id" />
                <div className={g.rengloninput100}>
                    <h1>Agregar Credencial</h1>
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
                        {...register('img')}
                        id="imgu" className={g.file} type='file' accept="image/*" />
                    <label htmlFor="imgu">
                        <span className={g.imgname}>
                            <span>Foto</span>
                        </span>
                        <span className={g.imgbutton}>Buscar Archivo</span>
                    </label>
                    {errors.foto && (
                        <div className={g.conterror}>
                            <span>{errors.foto.message}</span>
                        </div>
                    )}
                </div>
                <div className={g.rengloninput100}>
                    <textarea
                        {...register("descripcion", {
                            required: "Se requiere descripcion de la credencial",
                            minLength: {
                                value: 3,
                                message: "Minimo 5 caracteres"
                            },
                            maxLength: {
                                value: 400,
                                message: "Maximo 400 caracteres"
                            }
                        })}
                        className={g.mytextarea} name='descripcion' placeholder='Descripcion credencial' />
                    {errors.descripcion && (
                        <div className={g.conterror}>
                            <span>{errors.descripcion.message}</span>
                        </div>
                    )}
                </div>
                <div className={g.renglongen100}></div>
                <div className={g.rengloninput100}>
                    {cargando ? (
                        <Cargando mensaje="Guardando..." />
                    ) : (
                        <button className={g.botonEnviar}>Guardar Credencial</button>
                    )}
                </div>
            </form>
        </>
    )
}
