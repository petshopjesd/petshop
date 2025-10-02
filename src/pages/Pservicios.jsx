import React from 'react'
import Cmenu from '../components/cmenu'
import Footer from '../components/footer'
import Servicios from '../components/servicios'
import g from '../css/general.module.css'

export default function Pservicios() {
  return (
    <>
      <Cmenu/>
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
        <h1 className={g.titulo}>Servicios</h1>
      </div>
      <Servicios />
      <Footer />
    </>
  )
}
