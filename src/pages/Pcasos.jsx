import React from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { Link } from 'react-router-dom'
import Cmenu from '../components/cmenu.jsx'
import Footer from '../components/footer.jsx'
import Genera from '../components/generaImagen.jsx'
import { HOST } from '../config.js'
import g from '../css/general.module.css'
import c from '../css/casos.module.css'
export default function Pcasos() {
  const { data, loading, error, refetch } = UseFetch(HOST+'casos/time');
  return (
    <>
      <Cmenu />
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
        <h1 className={g.titulo}>Casos de Exito</h1>
      </div>
      <br /><br />
      <div className={g.gcontenedor}>
        <div className={g.gcontenedorp70}>
          <section className={c.casoscontenedor}>
            {data && data.length > 0 ? (
                  data && data.map((item, index) => (
            <article className={c.casotarjeta} key={index}>
              <div><Genera foto={item.fotof}></Genera> </div>
              <p>{item.titulo}</p>
              <p>{item.mascota}</p>
              <p>{item.fecha}</p>
              <div><Link className={g.link} to={"/Pcasodetalle/"+item.id}>Leer Mas</Link></div>
            </article>
            ))) : (<p>No hay casos de exito registrados.</p>)}
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
