import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import m from '../css/menuadmin.module.css'
export default function Cmenu() {
  const navigate = useNavigate();
  const usuarioString = localStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioString);
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/Apinicio');
  };
  const [menuOpen, setmenuOpen] = useState(false);
  function abrirMenu() {
    setmenuOpen(!menuOpen);
  }
  return (
    <>
      <nav className={m.navbar}>
        <div className={m.navbarcontainer}>
          <button className={`${m.navbartoggle} ${menuOpen ? m.active : ''}`} onClick={abrirMenu}>
            <span className={m.bar}></span>
            <span className={m.bar}></span>
            <span className={m.bar}></span>
          </button>
        </div>
        <ul className={`${m.navbarmenu} ${menuOpen ? m.active : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Pacerca">Acerca</Link></li>
          <li><Link to="/Pservicios">Servicios</Link></li>
          <li><Link to="/Pcontactanos">Contactanos</Link></li>
          <li><Link to="/Pcasos"> Casos </Link></li>
          <li><div className={m.telefono}>722 407 0622</div></li>
        </ul>
      </nav>
    </>
  )
}



