import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Menuadmin from '../components/menuadmin'
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Uusuario from '../components/uusuario';
import Fondo from '../components/fondo';
import {HOST} from '../config.js'
import g from '../css/generaladm.module.css'
import u from '../css/usuario.module.css'

export default function Apusuarios() {
    const navigate = useNavigate();
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
            navigate('/Apinicio');
        }
    }, [navigate]);
    const fechal = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const fechasimple = `${fechal.getFullYear()}-${pad(fechal.getMonth() + 1)}-${pad(fechal.getDate())}`;
    const { data, loading, error, refetch } = UseFetch(`${HOST}user`);
    const [isModalOpenc, setIsModalOpenc] = useState(false);
    const [isModalOpene, setIsModalOpene] = useState(false);
    const [isModalOpenb, setIsModalOpenb] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [iduserb, setUserb] = useState(0);
    const [useru, setUseru] = useState({});
    const openModalc = () => { setIsModalOpenc(true); };
    const closeModalc = () => { setIsModalOpenc(false); };
    const openModale = (miItem) => {
        setUseru({
            "iduser": miItem.iduser,
            "name": miItem.name,
            "apellido": miItem.apellido,
            "usuario": miItem.usuario,
            "pass": miItem.pass,
            "email": miItem.email,
            "fechaupdate": fechasimple,
            "pcasos": miItem.pcasos,
            "pcitas": miItem.pcitas,
            "pcredenciales": miItem.pcredenciales,
            "pgaleria": miItem.pgaleria,
            "pmiembros": miItem.pmiembros,
            "pservicios": miItem.pservicios,
            "pusuarios": miItem.pusuarios
        });
        setIsModalOpene(true);
    };
    const closeModale = () => { setIsModalOpene(false); };
    const openModalb = (idb) => {
        setUserb(idb);
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
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fechaalta: fechasimple,
            fechaupdate: fechasimple,
            idestatus: 1,
        }
    });
    useEffect(() => {
        reset({
            fechaalta: fechasimple,
            fechaupdate: fechasimple,
            idestatus: 1,
        });

    }, [reset]);
    /**********************************
     * CREAR MIEMBRO
     */
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const datau = await response.json();
            if (datau.iduser !== null) {
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
            const response = await fetch(`${HOST}user/${iduserb}`, {
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
                alert('error al eliminar al Eliminar la galeria ');
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
                    <h1>Usuarios</h1>
                    <div className={g.renglongen100}>
                        <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
                            <img src='/imgs/addnote.png' alt='Agregar galeria nueva'></img></div>
                    </div>
                    <section className={u.contenedorusuario}>
                        {data && data.length > 0 ? (
                            data && data.map((item, index) => (
                                <article className={u.tarjetausuario} key={index}>
                                    <div>
                                        <p>Nombre: {item.name} {item.apellido}</p>
                                        <p>User: {item.usuario}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <div className={u.listapermisos}>
                                        <p>Permisos:</p>
                                        <p>
                                            {item.pcasos === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Casos <br />
                                            {item.pcitas === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Citas <br />
                                            {item.pcredenciales === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Credenciales <br />
                                            {item.pgaleria === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Galeria<br />
                                            {item.pmiembros === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Miembros<br />
                                            {item.pservicios === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Servicio<br />
                                            {item.pusuarios === 1 ? <img src='/imgs/check.png' alt='Si' /> : <img src='/imgs/cancel.png' alt='No' />} Usuario
                                        </p>

                                    </div>
                                    <div>
                                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                                            <img src='/imgs/edit.png' alt='Editar Usuario'></img></div>
                                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.iduser)}>
                                            <img src='/imgs/delete.png' alt='Eliminar Usuario'></img></div>

                                    </div>
                                </article>
                            ))) : (
                            <div>No hay usuarios para mostrar</div>
                        )}
                    </section>
                    {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                    {loading &&
                        <Cargando mensaje="Cargando..." />
                    }
                    <div className={g.secciontabla1}>

                    </div>
                    <Modaldialog isOpen={isModalOpenc} onClose={closeModalc}>
                        <div className={g.contCentro400}>
                            <form onSubmit={handleSubmit(enviar)}>
                                <input {...register('fechaalta')} type='hidden' name='fechaalta' />
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
                        </div>
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
                        <h3>Eliminar</h3>
                        <p>Seguro que quieres Eliminar el Usuario?</p>
                        {cargando ? (
                            <Cargando mensaje="Guardando..." />
                        ) : (

                            <button className={g.botongeneral} onClick={borrargaleria}>Continuar</button>
                        )}
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
                        <div className={g.contCentro500}>
                            <Uusuario miItem={useru} onInteraccion={manejarInteraccion} />
                        </div>
                    </Modaldialog>
                </div>
            </div>

        </>
    )
}