import { useState } from 'react'
import { UseFetch } from '../components/useFetch.jsx'
import { HOST } from '../config.js'
import c from '../css/cita.module.css'

export default function Ccita() {

    const fecha = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const fechaFormateada =
        `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ` +
        `${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
    const fechasimple = `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}`;
    const [horarios, setHorarios] = useState(obtenerHorario(fechasimple));

    const [values, setValues] = useState({
        nombre: '',
        telefono: '',
        email: '',
        servicio: '1',
        mensaje: '',
        fecha: fechasimple,
        hora: ''
    });
    const { data: datac, loading: loadingc, error: errorc } = UseFetch(HOST+'citas/buscar?fecha=' + values.fecha);
    const h9 = Array.isArray(datac) ? !datac.some(item => item.hora === "09:00:00") : true;
    const h10 = Array.isArray(datac) ? !datac.some(item => item.hora === "10:00:00") : true;
    const h11 = Array.isArray(datac) ? !datac.some(item => item.hora === "11:00:00") : true;
    const h12 = Array.isArray(datac) ? !datac.some(item => item.hora === "12:00:00") : true;
    const h13 = Array.isArray(datac) ? !datac.some(item => item.hora === "13:00:00") : true;
    const h14 = Array.isArray(datac) ? !datac.some(item => item.hora === "14:00:00") : true;
    const h15 = Array.isArray(datac) ? !datac.some(item => item.hora === "15:00:00") : true;
    const h16 = Array.isArray(datac) ? !datac.some(item => item.hora === "16:00:00") : true;
    const h19 = Array.isArray(datac) ? !datac.some(item => item.hora === "19:00:00") : true;
    const h20 = Array.isArray(datac) ? !datac.some(item => item.hora === "20:00:00") : true;
    const [nombrerr, setNombrerr] = useState(false);
    const [telefonoerr, settelefonoerr] = useState(false);
    const [emailerr, setemailerr] = useState(false);
    const [horarioerr, sethorarioerr] = useState(false);


    function obtenerHorario(fechaStr) {
        const fecha = new Date(fechaStr);
        const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        console.log(fecha.getDay() + " " + dias[fecha.getDay()]);
        const midia = dias[fecha.getDay()];
        if (midia == "Domingo" || midia == "Sabado") {
            return true;
        } else {
            return false;
        }
    }


    const datainputs = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });

        if (name === "fecha") {
            values.hora = ''
            console.log("mi fecha: " + value);
            setHorarios(obtenerHorario(value)); // Usa el valor actualizado
            console.log("mi hora es: " + values.hora);
        }
    }

    const envio = async (e) => {
        e.preventDefault();
        console.log(values);
        if (!validarForm(values)) {
            console.log("formulario incorrecto")
            return;
        }
        try {
            const response = await fetch(HOST+'citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(values)
            });
            if (response.ok) {

                alert('Cita agendada correctamente');
                setValues({
                    nombre: '',
                    telefono: '',
                    email: '',
                    servicio: '1',
                    mensaje: '',
                    fecha: fechasimple,
                    hora: ''
                });
                setHorarios(obtenerHorario(fechasimple));
            } else {
                alert('Error al agendar la cita');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    }
    function validarForm(values) {
        let formok = true;
        setNombrerr(false);
        settelefonoerr(false);
        setemailerr(false);
        sethorarioerr(false);

        if (!values.nombre.trim()) {
            setNombrerr(true); formok = false;
            console.log("nombre vacio " + values.nombre);
        }
        if (!values.telefono.trim()) {
            settelefonoerr(true); formok = false;
            console.log("telefono vacio " + values.telefono);
        }
        if (!/^\d+$/.test(values.telefono)) {
            console.log("Telefono incorrecto " + values.telefono);
            settelefonoerr(true);
            formok = false;
        }
        if (!values.email.trim()) {
            setemailerr(true); formok = false;
            console.log("email vacio" + values.email);
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
            console.log("email incorrecto");
            setemailerr(true); formok = false;
        }
        if (!values.hora.trim()) {
            console.log("hora:" + values.hora);
            sethorarioerr(true); formok = false;
        }

        console.log("Formulario:" + formok);
        return formok;
    }
    return (
        <div id="citas" className={c.dcita}>
            <div className={c.dfoto}></div>
            <div className={c.separador}></div>
            <div className={c.contcita}>
                <section className={c.ftitulo}>Agenda una cita personalizada !</section>
                <div className={c.formcita}>
                    <form onSubmit={envio}>
                        <div className={c.fila100}>
                            <div className={c.fila45}>
                                <input className={c.myinput} type="text" name="nombre" placeholder='Nombre' value={values.nombre}
                                    onChange={datainputs} />
                                {nombrerr ? (<span className={c.errormens}>Nombre requerido</span>) : (<></>)}
                            </div>
                            <div className={c.fila5}></div>
                            <div className={c.fila50}>
                                <input className={c.myinput} type="tel" name="telefono" placeholder='Telefono' pattern="[0-9]+"
                                    value={values.telefono} size="10" onChange={datainputs} />
                                {telefonoerr ? (<span className={c.errormens}>Telefono invalido</span>) : (<></>)}
                            </div>
                        </div>
                        <div className={c.fila100}>
                            <div className={c.fila45}>
                                <select className={c.myinput} id="servicio" name='servicio' placeholder="Servicio" value={values.servicio} onChange={datainputs}>
                                    <option value="1">Reiki</option>
                                    <option value="2">Masaje</option>
                                    <option value="3">Taller</option>
                                    <option value="4">Aromaterapia</option>
                                    <option value="5">Psicologia</option>
                                </select>
                            </div>
                            <div className={c.fila5}></div>
                            <div className={c.fila50}>
                                <input className={c.myinput} type="email" name="email" placeholder='Email' value={values.email}
                                    onChange={datainputs} />
                                {emailerr ? (<span className={c.errormens}>Email invalido</span>) : (<></>)}
                            </div>

                        </div>
                        <div className={c.fila100}>
                            <div className={c.fila45}>
                                <input type="date" name="fecha" value={values.fecha} min={fechasimple} className={c.myinput} onChange={datainputs} />
                            </div>
                        </div>
                        <div className={c.areahorarios}>
                            <p>Horarios</p>
                            {horarioerr ? (<span className={c.errormens}>selecciona un horario</span>) : (<></>)}
                            <div>
                                {horarios ? (
                                    <>
                                        <div className={h9 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice1" name="hora" value="09:00" onChange={datainputs} disabled={!h9} />
                                            <label htmlFor="contactChoice1">9am - 10am</label>
                                        </div>
                                        <div className={h10 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice2" name="hora" value="10:00" onChange={datainputs} disabled={!h10} />
                                            <label htmlFor="contactChoice2">10am - 11am</label>
                                        </div>
                                        <div className={h11 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice3" name="hora" value="11:00" onChange={datainputs} disabled={!h11} />
                                            <label htmlFor="contactChoice3">11am - 12pm</label>
                                        </div>
                                        <div className={h12 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice4" name="hora" value="12:00" onChange={datainputs} disabled={!h12} />
                                            <label htmlFor="contactChoice4">12pm - 1pm</label>
                                        </div>
                                        <div className={h13 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice5" name="hora" value="13:00" onChange={datainputs} disabled={!h13} />
                                            <label htmlFor="contactChoice5">1pm - 2pm</label>
                                        </div>
                                        <div className={h14 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice6" name="hora" value="14:00" onChange={datainputs} disabled={!h14} />
                                            <label htmlFor="contactChoice6">2pm - 3pm</label>
                                        </div>
                                        <div className={h15 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice7" name="hora" value="15:00" onChange={datainputs} disabled={!h15} />
                                            <label htmlFor="contactChoice7">3pm - 4pm</label>
                                        </div>
                                        <div className={h16 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice8" name="hora" value="16:00" onChange={datainputs} disabled={!h16} />
                                            <label htmlFor="contactChoice8">4pm - 5pm</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={h19 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice9" name="hora" value="19:00" onChange={datainputs} disabled={!h19} />
                                            <label htmlFor="contactChoice9">7pm - 8pm</label>
                                        </div>
                                        <div className={h20 ? c.horaDisponible : c.horaApartada}>
                                            <input type="radio" id="contactChoice10" name="hora" value="20:00" onChange={datainputs} disabled={!h20} />
                                            <label htmlFor="contactChoice10">8pm - 9pm</label>
                                        </div>
                                    </>
                                )
                                }
                            </div>
                        </div>
                        <div className={c.fila100}>
                            <textarea className={c.mytextarea} name="mensaje" rows="5" cols="88" placeholder='Platicanos de tu mascota' value={values.mensaje}
                                onChange={datainputs} />
                        </div>
                        <div className={c.fila100}> </div>
                        <div className={c.fila100}>
                            <button className={c.btncita} >Solicitar una Cita!</button>
                        </div>
                    </form>
                </div>
                <div className={c.pieform}>
                </div>
            </div>

        </div>
    )
}
