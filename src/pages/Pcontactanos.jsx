import React from 'react'
import { useForm } from 'react-hook-form'
import Cmenu from '../components/cmenu'
import Footer from '../components/footer'
import g from '../css/general.module.css'
import c from '../css/contactanos.module.css'

export default function Pcontactanos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const enviar = (data) => {
    const { nombre, email, asunto, mensaje } = data;
    const telefonoWhatsapp = '527224070622';
    const textoMensaje = `¡Hola! Tienes un nuevo mensaje de contacto:\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n*Asunto:* ${asunto}\n*Mensaje:* ${mensaje}`;
    const urlWhatsapp = `https://wa.me/${telefonoWhatsapp}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(urlWhatsapp, '_blank');
    reset();
  };

  return (
    <>
      <Cmenu />
      <div className={[g.gcontenedor, g.fondorosa].join(' ')}>
        <h1 className={c.titulo}>Contactanos</h1>
      </div>
      <div className={g.gcontenedor}>
        <div className={g.fila}><br /><br /><br /><br /></div>
        <div className={g.gcontenedor70}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1473.401695266409!2d-99.5817091489766!3d19.25003141905143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd8b7641ab4111%3A0xd12c6c491b6e37b5!2sTraza%20tu%20imagen!5e0!3m2!1ses-419!2smx!4v1757546800825!5m2!1ses-419!2smx"
            height="480" allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className={g.gcontenedor}>
        <div className={c.gcontenedor70}>
          <br />
          <br />
          <br />
          <section className={c.formcont}>
            <div className={g.fila}>
              <h1 className={c.titulof}>Contactanos</h1>
            </div>
            <form className={c.formulario} onSubmit={handleSubmit(enviar)}>
              <div className={g.fila}>
                <textarea
                  {...register("mensaje", {
                    required: "El mensaje es obligatorio",
                    minLength: { value: 10, message: "Minimo 10 caracteres" },
                    maxLength: { value: 500, message: "Maximo 500 caracteres" }
                  })}
                  placeholder="Mensaje" name='mensaje' className={c.itexta} cols="30" rows="9"></textarea>
                {errors.mensaje && (
                  <div className={g.conterror}>
                    <span>{errors.mensaje.message}</span>
                  </div>
                )}
              </div>
              <div className={g.fila}>
                <div className={g.fila45}>
                  <input
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                      minLength: { value: 3, message: "Minimo 3 caracteres" },
                      maxLength: { value: 100, message: "Maximo 100 caracteres" }
                    })}
                    type="text" name='nombre' placeholder="Nombre" className={c.inputg} />
                  {errors.nombre && (
                    <div className={g.conterror}>
                      <span>{errors.nombre.message}</span>
                    </div>
                  )}
                </div>
                <div className={g.fila5}></div>
                <div className={g.fila50}>
                  <input
                    {...register("email", {
                      required: "El correo es obligatorio",
                      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Formato de correo no valido" },
                      maxLength: { value: 100, message: "Maximo 100 caracteres" }
                    })}
                    name='email'
                    type="email" placeholder="Correo Electrónico" className={c.inputg} />
                  {errors.email && (
                    <div className={g.conterror}>
                      <span>{errors.email.message}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={g.fila}>
                <input
                  {...register("asunto", {
                    required: "El asunto es obligatorio",
                    minLength: { value: 5, message: "Minimo 5 caracteres" },
                    maxLength: { value: 100, message: "Maximo 100 caracteres" }
                  })}
                  type="text" name='asunto' placeholder="Tema o duda" className={c.input} />
                {errors.asunto && (
                  <div className={g.conterror}>
                    <span>{errors.asunto.message}</span>
                  </div>
                )}
              </div>
              <div className={g.fila}>
                <button type="submit" className={c.botonbn}>Enviar</button>
              </div>
            </form>
          </section>
          <section className={c.contactoscont}>
            <div className={g.fila}>
              <img src="/imgs/home.svg" alt="Ubicacion" width="35" className={c.iconoinfo} />
              <p className={c.titulod}>Metepec Estado de Mexico</p>
              <p className={c.subtitulod}>Calle  Constitución CP 50780 </p>
            </div>
            <div className={g.fila}>
              <img src="/imgs/device-mobile.svg" alt="Ubicacion" width="35" className={c.iconoinfo} />
              <p className={c.titulod}>7224070622</p>
              <p className={c.subtitulod}>Lunes - Viernes 7pm a 9pm </p>
              <p className={c.subtitulod}>Sabado - Domingo 9am a 5pm </p>
            </div>
            <div className={g.fila}>
              <img src="/imgs/mail.svg" alt="Ubicacion" width="35" className={c.iconoinfo} />
              <p className={c.titulod}>test@test.com</p>
              <p className={c.subtitulod}>Manda tu consulta cuando quieras</p>
            </div>



          </section>
          <div className={g.fila}><br /><br /><br /><br /></div>
        </div>
      </div>

      <Footer />
    </>
  )
}
