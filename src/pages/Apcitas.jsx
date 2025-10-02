import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Menuadmin from '../components/menuadmin';
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Fondo from '../components/fondo';
import {HOST} from '../config.js'
import g from '../css/generaladm.module.css';
import f from '../css/fotos.module.css';
import c from '../css/cita.module.css';
export default function Apcitas() {
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
    const [horarios, setHorarios] = useState(obtenerHorario(fechasimple));
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fecha: fechasimple
        }
    });

    const fachabuscar = watch('fecha');
    const servicios = ["vacio", "Reiki", "Masaje", "Taller", "Aromaterapia", "Psicologia"];
    const { data, loading, error, refetch } = UseFetch(HOST+'citas/proximas');
    const { data: datac, loading: loadingc, error: errorc } = UseFetch(HOST+'citas/buscar?fecha=' + fachabuscar);
    const h9 = Array.isArray(datac) ? !datac.some(item => item.hora === "09:00:00") : true;
    const h10 = Array.isArray(datac) ? !datac.some(item => item.hora === "10:00:00") : true;
    const h11 = Array.isArray(datac) ? !datac.some(item => item.hora === "11:00:00") : true;
    const h12 = Array.isArray(datac) ? !datac.some(item => item.hora === "12:00:00") : true;
    const h13 = Array.isArray(datac) ? !datac.some(item => item.hora === "13:00:00") : true;
    const h14 = Array.isArray(datac) ? !datac.some(item => item.hora === "14:00:00") : true;
    const h15 = Array.isArray(datac) ? !datac.some(item => item.hora === "15:00:00") : true;
    const h16 = Array.isArray(datac) ? !datac.some(item => item.hora === "16:00:00") : true;
    const h19 = Array.isArray(datac) ? !datac.some(item => item.hora === "19:00:00") : true;
    const h20 = Array.isArray(datac) ? !datac.some(item => item.hora === "20:00:00") : true;

    const [isModalOpenc, setIsModalOpenc] = useState(false);
    const [isModalOpenb, setIsModalOpenb] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [idcitab, setCitab] = useState(0);
    const openModalc = () => { setIsModalOpenc(true); };
    const closeModalc = () => { setIsModalOpenc(false); };
    const openModalb = (idb) => {
        setCitab(idb);
        setIsModalOpenb(true);
    };
    const closeModalb = () => { setIsModalOpenb(false); };

    useEffect(() => {
        setHorarios(obtenerHorario(fachabuscar));
    }, [fachabuscar]);
    /**********************************
     * CREAR MIEMBRO
     */
    const enviar = async (data) => {
        setCargando(true);
        try {
            const response = await fetch(`${HOST}citas`, {
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
    const borrarcita = async () => {
        setCargando(true);
        try {
            const response = await fetch(`${HOST}citas/${idcitab}`, {
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
                alert('error al eliminar al Eliminar la cita ');
            }
            setCargando(false);
        } catch (error) {
            alert('estamos teniendo problemas contacta a tu administrador ' + error);
        }

    }
    function obtenerHorario(fechaStr) {
        const fecha = new Date(fechaStr);
        const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        console.log(fecha.getDay() + " " + dias[fecha.getDay()]);
        const midia = dias[fecha.getDay()];
        if (midia == "Domingo" || midia == "Sabado") {
            return true;
        } else {
            return false;
        }
    }
    return (
        <>
            <Menuadmin />
            <Fondo />
            <div className={g.contPrincipal}>
                <div className={g.contCentro900}>
                    <h1>Citas</h1>
                    <div className={g.renglongen100}>
                        <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
                            <img src='/imgs/addnote.png' alt='Agregar galeria nueva'></img></div>
                    </div>
                    <section className={f.citascontendor}>
                        {data && data.length > 0 ? (
                            data && data.map((item, index) => (
                                <article key={index} className={f.tarjeta}>
                                    <div className={f.fechacitab}>
                                        <p>
                                            {item.fecha}
                                            <br />
                                            {item.hora.substring(0, 5)} hrs
                                        </p>
                                    </div>
                                    <div className={f.seccdetallecita}>

                                        <p><img src='/imgs/identityn.png' /> {item.nombre}
                                            <br /><img src='/imgs/calln.png' /> {item.telefono}
                                            <br /><img src='/imgs/massagen.png' /> {servicios[item.servicio]}
                                            <br /><img src='/imgs/mailn.png' /> {item.email}
                                            <br /></p>
                                        <p>{item.mensaje}</p>
                                    </div>
                                    <div className={f.seccacciones}>
                                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                                            <img src='/imgs/delete.png' alt='Eliminar Cita'></img>
                                        </div>
                                    </div>
                                </article>
                            ))) : (

                            <div className={g.sinRegistros}>
                                No se tiene registro dde citas
                            </div>
                        )}
                    </section>
                    {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                    {loading &&
                        <Cargando mensaje="Cargando..." />
                    }
                    <Modaldialog isOpen={isModalOpenc} onClose={closeModalc}>
                        <div className={g.contCentro400}>
                            <form onSubmit={handleSubmit(enviar)}>
                                <div className={g.rengloninput100}>
                                    <h1>Agregar Cita</h1>
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
                                        <input
                                            {...register('telefono', {
                                                required: "El Telefono es requerido",
                                                minLength: {
                                                    value: 3,
                                                    message: "Minimo 3 caracteres"
                                                },
                                                maxLength: {
                                                    value: 40,
                                                    message: "Maximo 40 caracteres"
                                                }
                                            })}
                                            className={g.inputgeneral2} type='tel' name="telefono" placeholder='Telefono' />
                                        {errors.telefono && (
                                            <div className={g.conterror}>
                                                <span>{errors.telefono.message}</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className={g.rengloninput100}>
                                    <div className={g.renglongen45}>
                                        <select
                                            {...register('servicio')}
                                            className={g.inputgeneral2} id="servicio" name='servicio' placeholder="Servicio">
                                            <option value="1">Reiki</option>
                                            <option value="2">Masaje</option>
                                            <option value="3">Taller</option>
                                            <option value="4">Aromaterapia</option>
                                            <option value="5">Psicologia</option>
                                        </select>
                                        {errors.servicio && (
                                            <div className={g.conterror}>
                                                <span>{errors.servicio.message}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={g.renglongen5}></div>
                                    <div className={g.renglongen50}>
                                        <input
                                            {...register('email', {
                                                required: "El email es requerido",
                                                minLength: {
                                                    value: 3,
                                                    message: "Minimo 3 caracteres"
                                                },
                                                maxLength: {
                                                    value: 40,
                                                    message: "Maximo 40 caracteres"
                                                }
                                            })}
                                            className={g.inputgeneral2} type='email' name="email" placeholder='Email' />
                                        {errors.email && (
                                            <div className={g.conterror}>
                                                <span>{errors.email.message}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={g.rengloninput100}>
                                    <div className={g.renglongen45}>
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
                                    <div className={g.renglongen5}></div>
                                    <div className={g.renglongen50}></div>
                                </div>
                                <div className={c.areahorariosadm}>
                                    <p>Horarios</p>
                                    <div>

                                        {horarios ? (
                                            <>

                                                <div className={h9 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice1" name="hora" value="09:00" disabled={!h9}
                                                        {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice1">9am - 10am</label>
                                                </div>
                                                <div className={h10 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice2" name="hora" value="10:00" disabled={!h10} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice2">10am - 11am</label>
                                                </div>
                                                <div className={h11 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice3" name="hora" value="11:00" disabled={!h11} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice3">11am - 12pm</label>
                                                </div>
                                                <div className={h12 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice4" name="hora" value="12:00" disabled={!h12} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice4">12pm - 1pm</label>
                                                </div>
                                                <div className={h13 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice5" name="hora" value="13:00" disabled={!h13} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice5">1pm - 2pm</label>
                                                </div>
                                                <div className={h14 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice6" name="hora" value="14:00" disabled={!h14} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice6">2pm - 3pm</label>
                                                </div>
                                                <div className={h15 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice7" name="hora" value="15:00" disabled={!h15} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice7">3pm - 4pm</label>
                                                </div>
                                                <div className={h16 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice8" name="hora" value="16:00" disabled={!h16} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice8">4pm - 5pm</label>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={h19 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice9" name="hora" value="19:00" disabled={!h19} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice9">7pm - 8pm</label>
                                                </div>
                                                <div className={h20 ? c.horaDisponible : c.horaApartada}>
                                                    <input type="radio" id="contactChoice10" name="hora" value="20:00" disabled={!h20} {...register("hora", { required: "selecciona un horario" })} />
                                                    <label htmlFor="contactChoice10">8pm - 9pm</label>
                                                </div>
                                            </>
                                        )
                                        }
                                    </div>
                                    {errors.hora && (
                                        <div className={g.conterror}>
                                            <span>{errors.hora.message}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={g.rengloninput100}>
                                    <textarea
                                        {...register("mensaje")}
                                        className={g.mytextarea} name='mensaje' placeholder='Detalle para la cita' />
                                </div>
                                <div className={g.renglongen100}></div>
                                <div className={g.rengloninput100}>
                                    {cargando ? (
                                        <Cargando mensaje="Guardando..." />
                                    ) : (
                                        <button className={g.botonEnviar}>Guardar Cita</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
                        <h3>Eliminar</h3>
                        <p>Seguro que quieres Eliminar la cita?</p>
                        {cargando ? (
                            <Cargando mensaje="Guardando..." />
                        ) : (
                            <button className={g.botongeneral} onClick={borrarcita}>Continuar</button>
                        )}
                    </Modaldialog>
                </div>
            </div>

        </>
    )
}
