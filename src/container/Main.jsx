import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom";

import UsersList from './users/List';
import UserSingle from './users/Single';
import UsersCreate from './users/Create';

import ProfilesList from './profiles/List';

import ListadoEmpresa from './_comun/ListadoEmpresa';
import DetalleEmpresa from './_comun/DetalleEmpresa';

import MisVisitasMedicas from './_medico/MisVisitasMedicas';
import MisCharlas from './_examinador/MisCharlas';
import DetalleCapacitacion from './_examinador/DetalleCapacitacion';

import TechniciansList from './technicians/List';
import NewReport from './technicians/Register';

import Login from "./auth/Login";
import Home from './home/Home';

class Main extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/usuarios" component={UsersList} />
          <PrivateRoute path="/usuarios/registrar" component={UsersCreate} />
          <PrivateRoute path="/usuarios/detalle/:id" component={UserSingle} />

          <PrivateRoute exact path="/perfiles" component={ProfilesList} />

          <PrivateRoute exact path="/home/empresas" component={ListadoEmpresa} />
          <PrivateRoute exact path="/home/empresas/:id" component={DetalleEmpresa} />
          <PrivateRoute exact path="/home/empresas/:id/medico" component={MisVisitasMedicas} />
          <PrivateRoute exact path="/home/empresas/:id/examinador" component={MisCharlas} />
          <PrivateRoute exact path="/home/empresas/:id/examinador/capacitacion/:idCapacitacion" component={DetalleCapacitacion} />

          <PrivateRoute exact path="/home/empresas/:id/tecnico" component={TechniciansList} />
          <PrivateRoute exact path="/home/empresas/:id/tecnico/nuevo-informe" component={NewReport} />
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