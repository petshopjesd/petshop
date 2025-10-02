import React from 'react'
import { UseFetch } from '../components/useFetch'
import { HOST } from '../config'
import Cmenu from '../components/cmenu.jsx'
import Footer from '../components/footer.jsx'
import Generaimagen from '../components/generaImagen';
import { useParams } from 'react-router-dom'
import p from '../css/pmiembro.module.css'
import g from '../css/general.module.css'

export default function Pmiembro() {
    let { miembro } = useParams();
    const { data: datam, loading: loadingm, error: errorm } = UseFetch(HOST + 'miembros/' + miembro);
    const { data: datac, loading: loadingc, error: errorc } = UseFetch(HOST + 'mcv/' + miembro);

    if (loadingm || loadingc) {
        return <div className={g.cargando}><p>Cargando...</p></div>;
    }
    if (errorm) {
        return <div className={g.error}><p>Error al cargar los datos del miembro: {errorm.message}</p></div>;
    }

    return (
        <>
            <Cmenu />
            <div className={p.contenedorPrincipal}>
                <div className={p.contenedorMiembro}>
                    {datam && (
                        <article className={p.perfil}>
                            <div className={p.fotoContenedor}>
                                <Generaimagen foto={datam.foto} />
                            </div>
                            <section className={p.info}>
                                <h1>{datam.nombre}</h1>
                                <h2>{datam.titulo}</h2>
                                <p>{datam.detalle}</p>
                            </section>
                        </article>
                    )}
                    <section className={p.credenciales}>
                        <h3>Credenciales y Certificaciones</h3>
                        <div className={p.credencialesGrid}>
                            {errorc && <p>Error al cargar las credenciales.</p>}
                            {datac && datac.length > 0 ? datac.map((cred, index) => (
                                <div key={index} className={p.credencialCard}>
                                    <Generaimagen foto={cred.img} />
                                    <h4>{cred.credencial}</h4>
                                    <p>{cred.descripcion}</p>
                                </div>
                            )) : !errorc && <p>No hay credenciales para mostrar.</p>}
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}


