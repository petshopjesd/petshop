import React from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { HOST } from '../config'
import { useNavigate } from 'react-router-dom'
import Generaimagen from '../components/generaImagen.jsx'
import i from '../css/inicio.module.css'


export default function Miembros() {
    const { data, error, loading } = UseFetch(HOST + 'miembros');
    const navigate = useNavigate();

    return (

        <div className={i.dash2}>
            <section className={i.titulo}>
                <p>Nuestros Miembros</p>
                <h2>Miembro Certificado</h2>
            </section>
            <div className={i.dashCentro}>
                <div className={i.ccentrado}>
                    <div className={i.contmiembros}>
                        {data && data.length > 0 ? data.map((item, index) => (
                            <div className={i.cartamiembro} key={index} onClick={() => navigate('/Pmiembro/'+item.id)} style={{ cursor: 'pointer' }}>
                                <Generaimagen foto={item.foto} className={i.imgmiebrof} />
                                <section className={i.tmiembro}>
                                    <p>{item.nombre}</p>
                                    <h3>{item.titulo}</h3>
                                </section>
                            </div>
                        )) : (
                            <p>Cargando miembros...</p>
                        )}
                    </div>
                </div>
            </div>

        </div >
    )
}
