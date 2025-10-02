import React from 'react'
import Cmenu from '../components/cmenu'
import Footer from '../components/footer'
import a from '../css/acerca.module.css'
import g from '../css/general.module.css'

export default function Pacerca() {
  return (
    <>
      <Cmenu/>
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
        <h1 className={a.titulo}>Acerca de Nosotros</h1>
      </div>
      <section className={g.gcontenedor}>
        <div className={g.gcontenedor50}>
        <h1 className={a.subtitulo}>Nuestra Mision</h1>
        <p className={a.texto}>
          Somos un equipo apasionado por la tecnología y el desarrollo web. Nuestro objetivo es crear aplicaciones intuitivas y eficientes que mejoren la experiencia del usuario.
        </p>
        <h1 className={a.subtitulo}>Nuestra Vision</h1>
        <p className={a.texto}>
          Con años de experiencia en el sector, nos especializamos en el desarrollo de soluciones personalizadas que se adaptan a las necesidades de nuestros clientes.
        </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
