import { UseFetch } from './useFetch'
import {HOST} from '../config';
import c from '../css/cartas.module.css'

export default function Servicios() {
const { data, loading, error } = UseFetch(HOST+'servicios/estatus/1');    

  return (
    <>
      
      <div className={c.carea}>
        <div className={c.areacentro}>
          <section className={c.titulo}>
            <p>Servicios Profesionales</p>
            <h2>El Mejor Cuidado Personalizado.</h2>
          </section>
          {error && <p>Error al cargar los datos: {error.mensaje}</p>}
          {loading && <p>Cargando...</p>}
          {data && data.map((item, index) => (
                  <div key={index} className={c.micarta}>
                      <div className={c.icono}>
                        <img src={"/imgs/"+item.icono} alt={item.nombre} width="60"/>
                      </div>
                      <h1>{item.nombre}</h1>
                      <p>{item.descripcion}</p>
                  </div>
          ))}
          </div>
      </div>
    </>
    
  )
}
