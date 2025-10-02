import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Menuadmin from '../components/menuadmin'
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Ufoto from '../components/ufoto';
import { useParams } from 'react-router-dom'
import g from '../css/generaladm.module.css'
import { HOST } from '../config';
import f from '../css/fotos.module.css'
import Generaimagen from '../components/generaImagen';
import Fondo from '../components/fondo';
export default function Apfotos() {
    const navigate = useNavigate();
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
            navigate('/Apinicio');
        }
    }, [navigate]);
    let { galeria } = useParams();
    const { data, loading, error, refetch } = UseFetch(HOST+'foto/' + galeria);
    const [isModalOpenc, setIsModalOpenc] = useState(false);
    const [isModalOpene, setIsModalOpene] = useState(false);
    const [isModalOpenb, setIsModalOpenb] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [idfotob, setFotob] = useState(0);
    const [fotou, setFotou] = useState({});
    const openModalc = () => { setIsModalOpenc(true); };
    const closeModalc = () => { setIsModalOpenc(false); };
    const openModale = (item) => {
        const foto = (item.foto && item.foto.length > 0) ? item.foto : '';
        setFotou({
            "id": item.id,
            "idgaleria": galeria,
            "nombre": item.nombre,
            "foto": foto,
        });
        setIsModalOpene(true);
    };
    const closeModale = () => { setIsModalOpene(false); };
    const openModalb = (idb) => {
        setFotob(idb);
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
    } = useForm({ mode: "onChange" });
    /**********************************
     * CREAR MIEMBRO
     */
    const enviar = async (data) => {
        setCargando(true);
        const formData = new FormData();
        formData.append("foto", data.foto[0]);
        formData.append("idgaleria", galeria);
        formData.append("nombre", data.nombre);
        try {
            const response = await fetch(HOST+'foto', {
                method: 'POST',
                headers: {},
                body: formData
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
    const borrarfoto = async () => {
        setCargando(true);
        try {
            const response = await fetch(HOST+'foto/' + idfotob, {
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
                    <h1>Galerias de fotos</h1>
                    <div className={g.renglongen100}>
                        <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
                            <img src='/imgs/addnote.png' alt='Agregar galeria nueva'></img></div>
                    </div>
                    <section className={f.galeria}>
                        {data && data.length > 0 ? (
                            data && data.map((item, index) => (
                                <article key={index} className={f.tarjeta}>
                                    <div className={f.seccimg}>
                                        <Generaimagen foto={item.foto} />
                                    </div>
                                    <div className={f.seccnombre}>
                                        <p>{item.nombre}</p></div>
                                    <div className={f.seccacciones}>
                                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                                            <img src='/imgs/edit.png' alt='Editar foto'></img>
                                        </div>
                                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                                            <img src='/imgs/delete.png' alt='Eliminar foto'></img>
                                        </div>
                                    </div>
                                </article>
                            ))) : (

                            <div className={g.sinRegistros}>
                                No se tiene registro de Fotos
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
                                    <h1>Agregar Foto</h1>
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
                                        {...register('foto')}
                                        id="fotof" className={g.file} type='file' accept="image/*" />
                                    <label htmlFor="fotof">
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
                                <div className={g.renglongen100}></div>
                                <div className={g.rengloninput100}>
                                    {cargando ? (
                                        <Cargando mensaje="Guardando..." />
                                    ) : (
                                        <button className={g.botonEnviar}>Guardar Foto</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
                        <h3>Eliminar</h3>
                        <p>Seguro que quieres Eliminar la Foto?</p>
                        {cargando ? (
                            <Cargando mensaje="Guardando..." />
                        ) : (

                            <button className={g.botongeneral} onClick={borrarfoto}>Continuar</button>
                        )}
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
                        <div className={g.contCentro500}>
                            <Ufoto miItem={fotou} onInteraccion={manejarInteraccion} />
                        </div>
                    </Modaldialog>
                </div>
            </div>

        </>
    )
}
