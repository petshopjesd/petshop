import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import m from '../css/menuadmin.module.css'
export default function Menuadmin() {
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
          <li><Link to="/Aphome">Inicio</Link></li>
          {usuario.pcasos === 1 && <li><Link to="/Apcasos">Casos</Link></li>}
          {usuario.pcitas === 1 && <li><Link to="/Apcitas">Citas</Link></li>}
          {usuario.pcredenciales === 1 && <li><Link to="/Apcredenciales">Credenciales</Link></li>}
          {usuario.pgaleria === 1 && <li><Link to="/Apgaleria">Galeria</Link></li>}
          {usuario.pmiembros === 1 && <li><Link to="/Apmiembros">Miembros</Link></li>}
          {usuario.pservicios === 1 && <li><Link to="/Apservicios">Servicios</Link></li>}
          {usuario.pusuarios === 1 && <li><Link to="/Apusuarios">Usuarios</Link></li>}
          <li>
            <button className={m.btnsalir} onClick={cerrarSesion}>Salir</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
