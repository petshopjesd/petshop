import React from 'react'
import Cmenu from '../components/cmenu'
import Buscador from '../components/buscador'
import Footer from '../components/footer'
import { UseFetch } from '../components/useFetch'
import { useParams } from 'react-router-dom'
import { Ccomentar } from '../components/ccomentar'
import { useState } from 'react'
import {HOST} from '../config.js'
import d from '../css/pdetalles.module.css'
import g from '../css/general.module.css'


export default function Pdetalles() {
  let { blog } = useParams();
  const [refresh, setRefresh] = useState(0);
  const { data, loading, error } = UseFetch(`${HOST}datosblog/${blog}`);
  const {data: data2, loading: loading2, error: error2} = UseFetch(`${HOST}comblog/${blog}`);
  return (
    <>
      <Cmenu/>
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
              <h1 className={g.titulo}>Detalles del Blog</h1>
            </div>
            <div className={d.renglon100}></div>
      <div className={d.contenedor}>
        <section className={d.area70}>
          <div className={d.detalleblog}>
            {error && <p>Error al cargar los datos: {error.mensaje}</p>}
                {loading && <p>Cargando...</p>}
                {data && (
                  <>
                    <div className={d.imagenblog}>
                        <img src={'/imgs/'+data.imgurl} alt={data.titulo} width={380}/>
                    </div>
                    <h1 className={d.tituloc}>{data.titulo}</h1>
                    <p className={d.subtituloc}>{data.subtitulo}</p>
                    <p className={d.categorias}>Categorias | Comentarios</p>
                    
                    <p>publish by {data.name} {data.apellido} fecha: {data.fechaupdate}</p>
                    <p className={d.detalleblogtexto}>{data.contenido}</p>
                  </>
                )}    
            
            <div className={d.renglondinamico}>
            <p className={d.titulocom}>Comentarios</p>
          {error2 && <p>Error al cargar los comentarios: {error2.mensaje}</p>}
          {loading2 && <p>Cargando comentarios...</p>}
          {data2 && data2.map((item, index) => (  
            <div key={index} className={d.areageneralcoment}>
              <div className={d.areaavatarc}>
                <div className={d.avatarc}></div>
              </div>
              <div className={d.areacomenttext}>
                <p className={d.comentariotexto}> {item.comentario}</p>
                <p className={d.nomcom}>{item.nombre} <span className={d.fechacom}>publicado {item.fechac}</span></p>
              </div>
            </div>
          ))}
        </div>
        <div className={d.renglondinamico}>
        <Ccomentar blog={blog} onComentar={() => setRefresh(r => r + 1)}/>
            </div>
          </div>
          <div className={d.buscargeneral}>
            <div className={d.separador}></div>
            <div className={d.seccionbuscar}>
              <Buscador/>
            </div>
          </div>
          <div className={d.renglon100}></div>
        </section>
      </div>      
      <div className={d.panblog}>
        
                
      </div>
      <hr/> 
      <Footer />
    </>
  )
}

