import React from 'react'
import c from "../css/cargando.module.css"
export default function Cargando({mensaje}) {
    return (
        <>
            <div id="contenedor" className={c.contenedor}>
                <div className={c.contenedorloader}>
                    <div className={c.loader}></div>
                </div>
                <div className={c.cargando}>{mensaje}</div>
            </div>
        </>
    )
}
