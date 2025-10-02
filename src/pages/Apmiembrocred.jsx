import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseFetch } from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Menuadmin from '../components/menuadmin';
import Cargando from '../components/cargando';
import Modaldialog from '../components/modaldialog';
import Fondo from '../components/fondo';
import Generaimagen from '../components/generaImagen';
import Ucredencial from '../components/Ucredencial';
import g from '../css/generaladm.module.css';
import c from '../css/credencial.module.css';
import { HOST } from '../config';

export default function Apmiembrocred() {
    const navigate = useNavigate();
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
            navigate('/Apinicio');
        }
    }, [navigate]);
    let { miembro, nombre } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: "onChange" });
    const { data, loading, error, refetch } = UseFetch(HOST + 'mcv/' + miembro);
    const { data: datac, loading: loadingc, error: errorc, refetch: refetchc } = UseFetch(HOST + 'credenciales');
    const [isModalOpenc, setIsModalOpenc] = useState(false);
    const [isModalOpenb, setIsModalOpenb] = useState(false);
    const [isModalOpene, setIsModalOpene] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [idcredencialb, setCredencialb] = useState(0);
    const [credencialu, setCredencialu] = useState({});
    const openModalc = () => { setIsModalOpenc(true); };
    const closeModalc = () => { setIsModalOpenc(false); };
    const openModalb = (idb) => {
        setCredencialb(idb);
        setIsModalOpenb(true);
    };
    const closeModalb = () => { setIsModalOpenb(false); };
    const openModale = (item) => {
        setCredencialu({
            "id": item.id,
            "nombre": item.nombre,
            "descripcion": item.descripcion
        });
        setIsModalOpene(true);
    };
    const closeModale = () => { setIsModalOpene(false); };
    const manejarInteraccion = () => {
        setIsModalOpene(false);
        refetch();
    };
    /**********************************
     * CREAR CREDENCIAL
     */
    const enviar = async (data) => {
        setCargando(true);
        try {
            const response = await fetch(HOST + 'miembrocred', {
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
                alert('No se pudo guardar la credencial')
            }
            setCargando(false);
        } catch (error) {
            alert('estamos teniendo problemas contacta a tu administrador ' + error)
        }
        return;
    }
    /******************************************
    ELIMINAR CREDENCIAL
    */
    const borrarcita = async () => {
        setCargando(true);
        try {
            const response = await fetch(HOST + 'miembrocred/' + idcredencialb, {
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
                alert('error al eliminar al Eliminar credencial ');
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
                    <h1>Credenciales</h1>
                    <h3>Credenciales del Miembro: {nombre}</h3>
                    <div className={g.renglongen100}>
                        <div className={[g.baccion, g.fcrear].join(' ')} onClick={openModalc}>
                            <img src='/imgs/addnote.png' alt='Agregar credencial nueva'></img></div>
                    </div>
                    <section className={c.contCredenciales}>
                        {data && data.length > 0 ? (
                            data && data.map((item, index) => (
                                <article key={index} className={c.credencial}>
                                    <Generaimagen foto={item.img} />
                                    <div className={c.fechacitab}>
                                        <h3>
                                            {item.credencial}
                                        </h3>
                                        <p>
                                            {item.descripcion}
                                        </p>
                                    </div>
                                    <div className={c.seccacciones}>
                                        <div className={[g.baccion, g.feditar].join(' ')} onClick={() => openModale(item)}>
                                            <img src='/imgs/edit.png' alt='Editar credencial'></img>
                                        </div>
                                        <div className={[g.baccion, g.feliminar].join(' ')} onClick={() => openModalb(item.id)}>
                                            <img src='/imgs/delete.png' alt='Eliminar credencial'></img>
                                        </div>
                                    </div>
                                </article>
                            ))) : (

                            <div className={g.sinRegistros}>
                                No se tiene registro de Credenciales para el miembro: {nombre}
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
                                <input {...register('idm')} type='hidden' name='idm' value={miembro} />
                                <div className={g.rengloninput100}>
                                    <h1>Agregar Credencial</h1>
                                </div>
                                <div className={g.rengloninput100}>
                                    <select
                                        {...register('idc')}
                                        className={g.inputgeneral2} id="idc" name='idc'>
                                        {datac && datac.length > 0 ? (
                                            datac && datac.map((itemc, indexc) => (
                                                <option key={indexc} value={itemc.id}>{itemc.nombre}</option>
                                            ))) : (
                                            <></>
                                        )}
                                    </select>
                                    {errors.nombre && (
                                        <div className={g.conterror}>
                                            <span>{errors.nombre.message}</span>
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
                        </div>
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpenb} onClose={closeModalb}>
                        <h3>Eliminar</h3>
                        <p>Seguro que quieres Eliminar la credencial?</p>
                        {cargando ? (
                            <Cargando mensaje="Guardando..." />
                        ) : (
                            <button className={g.botongeneral} onClick={borrarcita}>Continuar</button>
                        )}
                    </Modaldialog>
                    <Modaldialog isOpen={isModalOpene} onClose={closeModale}>
                        <div className={g.contCentro500}>
                            <Ucredencial miItem={credencialu} onInteraccion={manejarInteraccion} />
                        </div>
                    </Modaldialog>
                </div >
            </div >

        </>
    )
}
