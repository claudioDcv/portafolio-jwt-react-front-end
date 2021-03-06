import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom";

import UsersList from './users/List';
import UserSingle from './users/Single';

import ProfilesList from './profiles/List';

import ListadoEmpresa from './_comun/ListadoEmpresa';
import DetalleEmpresa from './_comun/DetalleEmpresa';

import MisVisitasMedicas from './_medico/MisVisitasMedicas';
import VisitaMedica from './_medico/VisitaMedica';

import SupervisarVisitasMedicas from './_supervisor/SupervisarVisitasMedicas';
import NuevaVisitaMedica from './_supervisor/NuevaVisitaMedica';

import MisCharlas from './_examinador/MisCharlas';
import Charlas from './_supervisor/Charlas';

import DetalleCapacitacion from './_examinador/DetalleCapacitacion';
import DetalleCapacitacionSupervisor from './_supervisor/DetalleCapacitacion';

import TechniciansList from './_tecnico/List';
import TechniciansListsupervisor from './_supervisor/ListadoInformes';

import InformeNuevoInstalacion from './_tecnico/InformeNuevoInstalacion';
import NuevaCharla from './_supervisor/NuevaCharla';

import Login from "./auth/Login";
import Home from './home/Home';

// import Instalaciones from './_adminempresa/ListadoInstalaciones';
// import Capacitaciones from './_adminempresa/ListaCapacitacionesProgramadas';
// import VisitasProgramadas from './_adminempresa/ListaVisitasMedicasProgramadas';

import ListadoInformesAsignado from './_prevencionista/ListadoInformesAsignado';

import CertificadosHome from './_trabajador/CertificadosHome';

// home/informes/trabajador/4
import InformesTrabajador from './_adminempresa/InformesTrabajador';
import InformesInstalaciones from './_adminempresa/InformesInstalaciones';

import Capacitaciones from './_adminempresa/Capacitaciones';
import VisitasMedicas from './_adminempresa/VisitasMedicas';

class Main extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />

          <Route exact path="/certificados" component={CertificadosHome} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/usuarios" component={UsersList} />
          <PrivateRoute path="/usuarios/detalle/:id" component={UserSingle} />

          <PrivateRoute exact path="/perfiles" component={ProfilesList} />

          {/*<PrivateRoute exact path="/home/evaluaciones/:id" component={Instalaciones} />
          <PrivateRoute exact path="/home/capacitaciones/:id" component={Capacitaciones} />
          <PrivateRoute exact path="/home/visitasprogramadas/:id" component={VisitasProgramadas} />*/}

          <PrivateRoute exact path="/home/empresas" component={ListadoEmpresa} />
          <PrivateRoute exact path="/home/empresas/:id" component={DetalleEmpresa} />
          <PrivateRoute exact path="/home/empresas/:id/medico" component={MisVisitasMedicas} />
          <PrivateRoute exact path="/home/empresas/:id/medico/:visitaMedicaId" component={VisitaMedica} />

          <PrivateRoute exact path="/home/empresas/:id/examinador" component={MisCharlas} />
          <PrivateRoute exact path="/home/empresas/:id/examinador/capacitacion/:idCapacitacion" component={DetalleCapacitacion} />

          <PrivateRoute exact path="/home/empresas/:id/supervisor/capacitacion" component={Charlas} />
          <PrivateRoute exact path="/home/empresas/:id/supervisor/capacitacion/nueva-charla" component={NuevaCharla} />
          <PrivateRoute exact path="/home/empresas/:id/supervisor/capacitacion/ver/:idCapacitacion" component={DetalleCapacitacionSupervisor} />
          <PrivateRoute exact path="/home/empresas/:id/supervisor" component={TechniciansListsupervisor} />
          <PrivateRoute exact path="/home/empresas/:id/supervisor/visitas-medicas" component={SupervisarVisitasMedicas} />
          <PrivateRoute exact path="/home/empresas/:id/supervisor/visitas-medicas/nueva-visita" component={NuevaVisitaMedica} />

          <PrivateRoute exact path="/home/empresas/:id/tecnico" component={TechniciansList} />
          <PrivateRoute exact path="/home/empresas/:id/tecnico/informe-instalacion" component={InformeNuevoInstalacion} />
          <PrivateRoute exact path="/home/empresas/:id/tecnico/informe-instalacion/:informeId" component={InformeNuevoInstalacion} />

          <PrivateRoute exact path="/home/empresas/:id/tecnico/informe-persona" component={InformeNuevoInstalacion} />
          <PrivateRoute exact path="/home/empresas/:id/tecnico/informe-persona/:informeId" component={InformeNuevoInstalacion} />

          <PrivateRoute exact path="/home/empresas/:id/prevencionista" component={ListadoInformesAsignado} />

          <PrivateRoute exact path="/home/informes/trabajadores/:id" component={InformesTrabajador} />
          <PrivateRoute exact path="/home/informes/instalaciones/:id" component={InformesInstalaciones} />
          <PrivateRoute exact path="/home/capacitaciones/:id" component={Capacitaciones} />
          <PrivateRoute exact path="/home/visitas/:id" component={VisitasMedicas} />

        </div>
      </Router>);
  }
}

const isLogin = () => {
  return window.localStorage.getItem('token') || false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default Main;