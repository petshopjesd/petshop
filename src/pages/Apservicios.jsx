import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Menuadmin from '../components/menuadmin';
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Fondo from '../components/fondo';
import Uservicio from '../components/uservicio';
import {HOST} from '../config.js'
import g from '../css/generaladm.module.css';
import s from '../css/servicios.module.css';

export default function Apservicios() {
    const navigate = useNavigate();
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
            navigate('/Apinicio');
        }
    }, [navigate]);
    const { data, loading, error, refetch } = UseFetch(`${HOST}servicios`);
    const [isModalOpenc, setIsModalOpenc] = useState(false);
    const [isModalOpene, setIsModalOpene] = useState(false);
    const [isModalOpenb, setIsModalOpenb] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [idserviciob, setServiciob] = useState(0);
    const [serviciou, setServiciou] = useState({});
    //const [iconview, setIconview] = useState('ambulance.svg');
    const openModalc = () => { setIsModalOpenc(true); };
    const closeModalc = () => { setIsModalOpenc(false); };
    const openModale = (item) => {
        setServiciou({
            "id": item.id,
            "nombre": item.nombre,
            "icono": item.icono,
            "estatus": String(item.estatus),
            "descripcion": item.descripcion
        });
        setIsModalOpene(true);
    };
    const closeModale = () => { setIsModalOpene(false); };
    const openModalb = (idb) => {
        setServiciob(idb);
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
        watch,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange",
        defaultValues: { estatus: "1" }
    });

    const iconview = watch('icono');
    useEffect(() => {
        console.log(iconview);
    }, [iconview]);
    /**********************************
     * CREAR MIEMBRO
     */
    const enviar = async (data) => {
        setCargando(true);
        try {
            const response = await fetch(`${HOST}servicios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
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
            const response = await fetch(`${HOST}servicios/${idserviciob}`, {
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
                alert('error al eliminar al Eliminar el servicio ');
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
                    <div className={g.titulo}>
                        <h1>Servicios</h1>
                    </div>
                    <div className={g.renglongen100}>
                        <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
                            <img src='/imgs/addnote.png' alt='Agregar galeria nueva'></img></div>
                    </div>
                    <section className={s.contenedorservicios}>
                        {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                        {loading &&
                            <Cargando mensaje="Cargando..." />
                        }
                        {data && data.map((item, index) => (
                            <article key={index} className={s.micarta}>
                                <div className={s.icono}>
                                    <img src={"/imgs/" + item.icono} alt={item.nombre} width="60" />
                                </div>
                                <div className={s.seccionservicio}>
                                    <h1>{item.nombre}</h1>
                                    <h1>

                                        {item.estatus === 1 ?
                                            <img src="/imgs/able.png" alt="activo" width="40" /> :
                                            <img src="/imgs/disabled.png" alt="inactivo" width="40" />}</h1>
                                    <p>{item.descripcion}</p>
                                </div>
                                <div>
                                    <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                                        <img src='/imgs/edit.png' alt='Editar foto'></img>
                                    </div>
                                    <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                                        <img src='/imgs/delete.png' alt='Eliminar foto'></img>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                    <Modaldialog isOpen={isModalOpenc} onClose={closeModalc}>
                        <div className={g.contCentro400}>
                            <form onSubmit={handleSubmit(enviar)}>
                                <div className={g.rengloninput100}>
                                    <h1>Agregar Servicio</h1>
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
                                                id="activo"
                                                type="radio"
                                                value="1"
                                                className={g.radioinputg} />
                                            <label htmlFor="activo" className={g.radiolabel}>Activo</label>&nbsp;
                                            <input
                                                {...register('estatus', { required: "El estatus es requerido" })}
                                                id="inactivo"
                                                type="radio"
                                                value="2"
                                                className={g.radioinputg} />
                                            <label htmlFor="inactivo" className={g.radiolabel}>Inactivo</label>
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
                            <Uservicio miItem={serviciou} onInteraccion={manejarInteraccion} />
                        </div>
                    </Modaldialog>
                </div>
            </div>
        </>
    )
}
