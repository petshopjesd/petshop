import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cmenu from '../components/cmenu.jsx'
import Ccita from '../components/ccita.jsx'
import Servicios from '../components/servicios.jsx'
import Footer from '../components/footer.jsx'
import Galeria from '../components/galeria.jsx'
import Miembros from '../components/miembros.jsx'
import i from '../css/inicio.module.css'
import '../css/carousel.css'
import Casos from '../components/casos.jsx' 


export default function Piniciogeneral() {

  const [mostrar, setMostrar] = useState(false);
  const mostrarVideo = () => {
    if (mostrar) {
      setMostrar(false);
    } else {
      setMostrar(true);
    }
    setMostrar(!mostrar);
  }

  return (
    <>
      <Cmenu />
      {mostrar &&
        <div className={i.ventanaVideo}>
          <div className={i.videoCerrar} onClick={mostrarVideo}>X</div>
          <div className={i.fondoOscuro}>
            <iframe width="100%" height="480"
              src="https://www.youtube.com/embed/lgwO12P2MyQ?si=R4bYHWsxplJRUJDL"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
          </div>
        </div>
      }
      <div className={i.dinicio}>
        <div className={i.d2izq}>
          <div className={i.youtuber} onClick={mostrarVideo}></div>
          <div className={i.sliders}>
            <div className={i.slider1}>
              <h1>
                La salud de tu mascota es lo mas importante.
              </h1>
              <h3>Agenda Una Cita.</h3>
              <p>Mejoraremos la salud mental  y te diremos como se siente de forma profecional.</p>
            </div>
            <div className={i.slider2}>
              <h3>¿Deseas aprender?</h3>
              <p>Tenemos talleres.</p>
              <p>Enterate aqui te ayudamos a que puedas entender a tu mascota.</p>
              <div className={i.btnir}><a href='#citas'>Agendar Cita</a></div>
              
            </div>

          </div>

        </div>
      </div>
      <Servicios />
      <div className={i.dash2}>
        <div className={[i.d2izq, i.fgente].join(' ')}>
          <div className={[i.ctratamientos, i.centext].join(' ')}>
            <h1>354</h1>
            <p>Tratamientos</p>
            <p>correctos</p>
          </div>
          <div className={[i.cmasajes, i.centext].join(' ')}>
            <h1>600</h1>
            <p>Masajes</p>
            <p>Correctos</p>
          </div>
        </div>
        <div className={[i.d2der, i.fondorosa].join(' ')}>
          <div className={i.d2centrado}>
            <h1>Te aseguramos una mejor comunicacion con tu mascota.</h1>
            <h2>La comunicacion efectiva es fundamental en la terapia de masajes</h2>
            <p>tanto para el terapeuta como para el cliente. Permite una comprensión mutua de las necesidades, expectativas y resultados deseados, así como una sesión cómoda y segura.</p>
            <div className={i.botonread}>Leer Mas</div>
          </div>
        </div>

      </div>
      <Galeria />
      <div id='citas'></div>
      <Ccita />
      <Miembros />
      <div className={[i.dash3, i.fondoazul].join(' ')}>
        <div className={i.ccentrado2}>
          <div className={i.personal}>
            <img src="/imgs/testi-logo.png" alt="Persona" />
            <h1>Luz DA</h1>
            <h3>Director Creativo</h3>
            <br />
            <p>"Trabajamos duro para estar actualizados y darles el mejor servicio"</p>
          </div>
        </div>
      </div>
      <div className={i.dash3}>
        <div className={i.ccentrado}>
          <section className={i.titulo}>
            <p>Casos Actuales</p>
            <h2>Nuestros Casos recientes</h2>
          </section>
          <div className={i.renglon}></div>
          <Casos />
        </div>
      </div>
      <div className={[i.dash4, i.fondonaranja].join(' ')}>
        <div className={i.ccentrado3}>
          <section className={i.llamanos}>
            <h1>Llamanos Estamos a tu servicio!</h1>
            <h2>Podemos ayudarte las 24 horas</h2>
          </section>
          <div className={i.renglon}></div>

          <div className={i.bblanco}><Link to="/Pcontactanos">Contactanos</Link></div>
          <div className={i.pendiente}><p>"O" 722 407 0622</p></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

