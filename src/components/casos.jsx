import React from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { Link } from 'react-router-dom'
import Genera from '../components/generaImagen.jsx'
import {HOST} from '../config';
import g from '../css/general.module.css'
import c from '../css/casos.module.css'

export default function Casos() {
    const { data, loading, error } = UseFetch(HOST+'casos/time');

    return (
        <>
            <div className={g.gcontenedor}>
                    <div className={g.gcontenedorp70}>
                      <section className={c.casoscontenedor}>
                    {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                    {loading && <p>Cargando...</p>}
                    {data && data.map((item, index) => (
                        <article className={c.casotarjeta} key={index} >
                            <Genera foto={item.fotof}/>
                            <p className={c.titulo}>{item.titulo}<span className={c.fecha}> {item.fecha}</span></p>
                            <p className={c.subtitulo}>{item.mascota}</p>
                            <Link className={c.link} to={"/Pcasodetalle/" + item.id}>Leer Mas</Link>
                        </article>
                    ))}
                    </section>
                </div>
            </div>
            <div className={c.separador}></div>
        </>
    )
}