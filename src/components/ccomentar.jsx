import React from 'react'
import { useState } from 'react'
import g from '../css/general.module.css'
import c from '../css/contactanos.module.css'
import {HOST} from '../config';

export function Ccomentar({blog}) {
    const fecha = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const fechaFormateada = 
    `${fecha.getFullYear()}-${pad(fecha.getMonth()+1)}-${pad(fecha.getDate())} ` +
    `${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
    
    const [values, setValues] = useState({
        idblog: blog,
        nombre: '',
        comentario: '',
        fechac:fechaFormateada,
        fechau:fechaFormateada
    });
    const datainputs = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    
        const envio = async (e) => {
            e.preventDefault();
            try {
            const response = await fetch(HOST+'comblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                alert('se agrego tu comentario');
            } else {
                alert('Error al guardar tu comentario');
            }
            } catch (error) {
                alert('Error de conexión');
            }
        }
    return (
        < >
            <div className={g.formcont}>
                <h4 className={c.comentatituloform}>Dejanos un comentario</h4>
                <form onSubmit={envio}>
                <input type="hidden" name="idblog" value={blog} />
                <div className={g.fila}>
                    <textarea placeholder="Comentarios" name='comentario' className={c.itexta}  value={values.comentario} cols="30" rows="9" 
                    onChange={datainputs}></textarea>
                </div>
                <div className={g.fila}>
                <input type="text" name="nombre" placeholder='Nombre' value={values.nombre} className={c.input}
                onChange={datainputs}/>
                </div>  
                <div className={g.fila}>
                <button className={c.botonbn}>Enviar</button>
                </div>
                </form>
            </div>
            
        </>
    )
    }
