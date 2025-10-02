import React from 'react'
import { Link } from 'react-router' 
import f from '../css/footer.module.css'


export default function Footer() {
  return (
    <>
      <footer className={f.footer}>
        <div className={f.pcon}>
          <div className={f.con3}>
            <div className={f.logo}>
            </div>
            <div className={f.redes}>
              <p><br/><br/>Salud a tu Mascotita<br/><br/><br/></p>
              <a href="https://www.facebook.com/share/1C3EYTSgkh/" target='_blank'><img src="/imgs/facebook.png" width={25}/></a>
              <a href="https://www.instagram.com/luzda_terapias?igsh=eWoxNGl1c2NyMDk4" target="_blank"><img src="/imgs/instagram.png" width={25}/></a>
              {/*               
              <a href="www.x.com"><img src="/imgs/xtwitter.png" width={25}/></a>
              <a href="www.pinteres.com"><img src="/imgs/pinteres.png" width={25}/></a> 
              */}
            </div>
          </div>
          <div className={f.con2}>
            <h1 className={f.titulo}>Company</h1>
            <p><Link  className={f.milink} to="/">Inicio</Link></p>
            <p><Link  className={f.milink} to="/Pacerca">Acerca</Link></p>
            <p><Link  className={f.milink} to="/Pservicios">Servicios</Link></p>
            <p><Link  className={f.milink} to="/Pcasos">Casos</Link></p>
            <p><Link  className={f.milink} to="/Pcontactanos">Contactanos</Link></p>
          </div>
          <div className={f.con2}>
            <h1 className={f.titulo}>Service</h1>
            <p>Reiki</p>
            <p>Aceites</p>
            <p>Talleres</p>
            <p>Accesorios</p>
            <p>Ubicacion</p>
            <p></p>
          </div>
          <div className={f.con3}>
            <h1 className={f.titulo}>Ubicacion del proximo Taller</h1>
          </div>
          <div className={f.copia}>
            <p>Copyright ©2025 Todos los derechos Recervados |   <img src="/imgs/favorite.png" width={25}/>&nbsp;&nbsp; por LuzDA</p>
          </div>
        </div>
      </footer>
    </>
  )
}
