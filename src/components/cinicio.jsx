
import { Route, Routes } from 'react-router'
import Piniciogeneral  from '../pages/Piniciogeneral.jsx'
import Pacerca from '../pages/Pacerca.jsx'
import Pservicios from '../pages/Pservicios.jsx'
import Pblog from '../pages/Pblog.jsx'
import Pdetalles from '../pages/Pdetalles.jsx'
import Pelementos from '../pages/Pelementos.jsx'
import Pcontactanos from '../pages/Pcontactanos.jsx'
import Apinicio from '../pages/Apinicio.jsx'
import Aphome from '../pages/Aphome.jsx'
import Apcasos from '../pages/Apcasos.jsx'
import Apmiembros from '../pages/Apmiembros.jsx'
import Apgaleria from '../pages/Apgaleria.jsx'
import Apfotos from '../pages/Apfotos.jsx'
import Apcitas from '../pages/Apcitas.jsx'
import Apservicios from '../pages/Apservicios.jsx'
import Apcredenciales from '../pages/Apcredenciales.jsx'
import Apmiembrocred from '../pages/Apmiembrocred.jsx'
import Apusuarios from '../pages/Apusuarios.jsx'
import Pcasos from '../pages/Pcasos.jsx'
import Pcasodetalle from '../pages/Pcasodetalle.jsx'
import Pmiembro from '../pages/Pmiembro.jsx'

export const Cinicio = () => {
  return (
    <Routes>
        <Route path="/" element={<Piniciogeneral />} />
        <Route path="/Pacerca" element={<Pacerca />} />
        <Route path="/Pservicios" element={<Pservicios />} />
        <Route path="/Pblog" element={<Pblog />} />
        <Route path="/Pcasos" element={<Pcasos />} />
        <Route path="/Pdetalles/:blog" element={<Pdetalles />} />
        <Route path="/Pelementos" element={<Pelementos />} />
        <Route path="/Pcontactanos" element={<Pcontactanos />} />
        <Route path="/Apinicio" element={<Apinicio />} />
        <Route path="/Aphome" element={<Aphome />} />
        <Route path="/Apcasos" element={<Apcasos />} />
        <Route path="/Pcasodetalle/:idcaso" element={<Pcasodetalle />} />
        <Route path="/Apmiembros" element={<Apmiembros />} />
        <Route path="/Apgaleria" element={<Apgaleria />} />
        <Route path="/Apfotos/:galeria" element={<Apfotos />} />
        <Route path="/Apcitas" element={<Apcitas />} />
        <Route path="/Apservicios" element={<Apservicios />} />
        <Route path="/Apcredenciales" element={<Apcredenciales />} />
        <Route path="/Apmiembrocred/:miembro/:nombre" element={<Apmiembrocred />} />
        <Route path="/Apusuarios" element={<Apusuarios />} />
        <Route path="/Pmiembro/:miembro" element={<Pmiembro />} />
    </Routes>
  )
}
