import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import Cargando from '../components/cargando';
import g from '../css/generaladm.module.css'
import {HOST} from '../config'

export default function Uservicio({ miItem, onInteraccion }) {
    console.log(miItem);
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
            id: miItem.id,
            nombre: miItem.nombre,
            icono: miItem.icono,
            estatus: String(miItem.estatus),
            descripcion: miItem.descripcion,
        }
    });
    
    useEffect(() => {
        if (miItem) {
            reset({
                id: miItem.id,
                nombre: miItem.nombre,
                icono: miItem.icono,
                estatus: String(miItem.estatus),
                descripcion: miItem.descripcion,
            });
        }
    }, [miItem.id, miItem.nombre, miItem.icono, miItem.estatus, miItem.descripcion, reset]);

    const iconview = watch('icono');
    useEffect(() => {
    }, [iconview]);
    const enviar = async (data) => {
        setCargando(true);
        try {
            const response = await fetch(HOST + 'servicios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
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
                <div className={g.rengloninput100}>
                    <h1>Agregar Galeria</h1>
                </div>
                <div className={g.rengloninput100}>
                    <div className={g.renglongen45}>
                        <input {...register('id')} type='hidden' name="id"/> 
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
                        <select
                            {...register('icono', {
                                required: "El miembro es requerido"
                            })}
                            className={g.inputgeneral2} id="icono" name="icono">
                            <option value="ambulance.svg">Ambulancia</option>
                            <option value="buildinghospital.svg">Hospital</option>
                            <option value="dog.svg">Mascota</option>
                            <option value="facemask.svg">Cubre vocas</option>
                            <option value="nurse.svg">Enfermeria</option>
                            <option value="paw.svg">Huella</option>
                            <option value="pill.svg">Medicamento</option>
                            <option value="reportmedical.svg">Seguimiento</option>
                            <option value="stethoscope.svg">Estetoscopio</option>
                            <option value="vaccine.svg">Vacuna</option>
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
                        <div className={g.radiowrapper}>
                            <input
                                {...register('estatus', { required: "El estatus es requerido" })}
                                id="activou"
                                type="radio"
                                value="1"
                                className={g.radioinputg} />
                            <label htmlFor="activou" className={g.radiolabel}>Activo</label>&nbsp;
                            <input
                                {...register('estatus', { required: "El estatus es requerido" })}
                                id="inactivou"
                                type="radio"
                                value="2" 
                                className={g.radioinputg} />
                            <label htmlFor="inactivou" className={g.radiolabel}>Inactivo</label>
                        </div>
                    </div>
                    <div className={g.renglongen5}></div>
                    <div className={g.renglongen50}>
                        <img src={"/imgs/" + iconview} width={40}></img>
                    </div>
                </div>
                <div className={g.rengloninput100}>
                    <textarea
                        {...register("descripcion", {
                            required: "Se requiere descripcion del servicio",
                            minLength: {
                                value: 3,
                                message: "Minimo 5 caracteres"
                            },
                            maxLength: {
                                value: 400,
                                message: "Maximo 400 caracteres"
                            }
                        })}
                        className={g.mytextarea} name='descripcion' placeholder='Descripcion del Servicio' />
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
                        <button className={g.botonEnviar}>Guardar Galeria</button>
                    )}
                </div>
            </form>
        </>
    )
}
