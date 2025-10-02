import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fondo from '../components/fondo';
import Menuadmin from '../components/menuadmin'


export default function Aphome() {

const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/Apinicio');
    }
  }, [navigate]);




  return (
    <>
    <Menuadmin />
    <Fondo />
    <h1>home</h1>
    </>
  )
}
