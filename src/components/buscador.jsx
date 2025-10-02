import React from 'react'
import b from '../css/blogs.module.css'
export default function Buscador() {
  return (
    <>
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
    </>
  )
}
