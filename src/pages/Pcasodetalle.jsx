import React from 'react'
import { useParams } from 'react-router-dom'
import { UseFetch } from '../components/useFetch.jsx';
import { HOST } from '../config';
import Cmenu from '../components/cmenu.jsx'
import g from '../css/general.module.css'
import c from '../css/casos.module.css'
import Generaimagen from '../components/generaImagen.jsx';

export default function Pcasodetalle() {
    let { idcaso } = useParams();
    const { data, loading, error, refetch } = UseFetch(HOST + 'casos/' + idcaso);
    return (
        <>
            <Cmenu />
            <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
                <h1 className={g.titulo}>Detalle del Caso</h1>
            </div>
            <br /><br />
            <div className={g.gcontenedor}>
                <div className={c.cont70}>
                    {data ? (
                        <>
                            <div className={c.fotocasoi}>
                                <Generaimagen foto={data.fotoi}></Generaimagen>
                                <div className={c.condatoscasos}>
                                    <h2>{data.titulo}</h2>
                                    <p><strong>Mascota:</strong> {data.mascota} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Fecha:</strong> {data.fecha}</p>
                                </div>
                            </div>
                            <article className={c.casosdetalle}>
                                <p>{data.detalle}</p>
                            </article>
                            <div className={c.fotocasoi}>
                                <Generaimagen foto={data.fotof}></Generaimagen>
                            </div>
                        </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                    {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                    {loading && <p>Cargando...</p>}
                </div>
                <div className={g.gcontenedorp30}>
                    <div></div>
                </div>
            </div>

        </>
    )
}
