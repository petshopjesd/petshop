import React from 'react'
import { Link } from 'react-router'
import Cmenu from '../components/cmenu.jsx'
import Blogs from '../components/blogs.jsx'
import Footer from '../components/footer.jsx'
import { UseFetch } from '../components/useFetch.jsx';
import { HOST } from '../config.js';
import g from '../css/general.module.css'
import b from '../css/blogs.module.css'


export default function Pblog() {
  const { data, loading, error } = UseFetch(HOST+'datosblog');

  function obtenerDia(fechae) {
    const fecha = new Date(fechae);
    const dia = fecha.getDate().toString().padStart(2, '0');
    return dia;
  }
  function obtenerMes(fechae) {
    const fecha = new Date(fechae);
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[fecha.getMonth()];
  }
  return (
    <>
      <Cmenu />
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
        <h1 className={g.titulo}>Blogs</h1>
      </div>
      <br /><br />
      <div className={g.gcontenedor}>
        <div className={g.gcontenedorp70}>
          <div className={g.areablogs}>
            {error && <p>Error al cargar los datos: {error.mensaje}</p>}
            {loading && <p>Cargando...</p>}
            {data && data.map((item, index) => (
              <div key={index} >
                <div className={b.imgblog}><img src={"/imgs/blog1.png"} alt={item.titulo} />
                  <div className={b.cuadrodiana}>
                    <p><span className={b.numfecha}>{obtenerDia(item.fechacreacion)}</span><br />{obtenerMes(item.fechacreacion)}</p>
                  </div>
                </div>
                <div className={[b.conTexto, b.sombra].join(' ')}>
                  <div className={b.pading}>
                    <p className={b.tituloc}>{item.titulo}</p>
                    <p className={b.subtituloc}>{item.subtitulo}</p>
                    <Link className={b.link} to={"/Pdetalles/" + item.idmyblog}>Leer Mas</Link>
                    <p className={b.categorias}>Categorias | Comentarios</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={g.areabusqueda}>
            <div className={b.cuadrolat}>
              <form>
                <div className={b.renglon50}>
                  <div className={b.contInputb}>
                    <input type='text' id='busdueda' placeholder='Buscar' className={b.inputb}></input>
                  </div>

                  <div className={b.iconbuscar}>
                    <img src='/imgs/lupa.png' width={30} className={b.lugimg}></img>
                  </div>
                </div>
                <div className={b.renglon50}>
                  <button className={b.buscarbot}>BUSCAR</button>
                </div>
              </form>
            </div>
            <div className={b.separador20}></div>
            <div className={b.cuadrolat}>
              <div className={b.renglon50}>
                <h1>Categorias</h1>
              </div>
              <div className={b.renglon50}>
                <p>Salud (10)</p>
                <p>Tecnologia(11)</p>
              </div>
            </div>
            <div className={b.separador20}></div>
            <div className={b.cuadrolat}>
              <div className={b.renglon50}>
                <h1>Top Post</h1>
              </div>
            </div>
            <div className={b.separador20}></div>
            <div className={b.cuadrolat}>
              <div className={b.renglon50}>
                <h1>Tag Clouds</h1>
              </div>
            </div>
            <div className={b.separador20}></div>
            <div className={b.cuadrolat}>
              <div className={b.renglon50}>
                <h1>Instagram Feeds </h1>
              </div>
            </div>
            <div className={b.separador20}></div>
            <div className={b.cuadrolat}>
              <form>

                <div className={b.renglon50}>
                  <input type='text' id='newsletter' placeholder='Introduce tu email' className={b.inputnews}></input>
                </div>
                <div className={b.renglon50}>
                  <button className={b.buscarbot}>SUSCRIBETE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
