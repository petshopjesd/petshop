import React from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { Link } from 'react-router-dom'
import b from '../css/blogs.module.css'
import {HOST} from '../config';

export default function Blogs() {
    const { data, loading, error } = UseFetch(`${HOST}datosblog`);

return (
    <>
        <div className={b.carea}>
                <div className={b.areacentro}>
            {error && <p>Error al cargar los datos: {error.mensaje}</p>}
            {loading && <p>Cargando...</p>}
            {data && data.map((item, index) => (
                    <div key={index} className={b.ablog}>
                        <img src={"/imgs/blog1.png"} alt={item.titulo} />
                        <p className={b.titulo}>{item.titulo}<span className={b.fecha}> * {item.fechacreacion}</span></p>
                        <p className={b.subtitulo}>{item.subtitulo}</p>
                        <Link className={b.link} to={"/Pdetalles/"+item.idmyblog}>Leer Mas</Link>
                    </div>
            ))}
            </div>
        </div>
    </>
)
}
