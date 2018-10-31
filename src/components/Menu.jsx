import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import SelectProfileUser from './SelectProfileUser';
import { email, profile } from '../config/const';
import { hasProfile, profileList } from '../common/utils';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand>SAFE</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <SelectProfileUser />
            </NavItem>
            <NavItem>
              <Link to="/home">Home</Link>
            </NavItem>
            {hasProfile(profileList.SAFE_ADMIN_SUPERVISOR) && (<NavItem>
              <Link to="/usuarios"><FontAwesomeIcon icon="users" /> Usuarios</Link>
            </NavItem>)}
            {hasProfile(profileList.SAFE_ADMIN_SUPERVISOR) && (<NavItem>
              <Link to="/perfiles"><FontAwesomeIcon icon="users" /> Perfiles</Link>
            </NavItem>)}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon="user" /> {email()} - {profile().name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <FontAwesomeIcon icon="user" /> Perfil
                  </DropdownItem>
                <DropdownItem>
                  <FontAwesomeIcon icon="key" /> Cambiar Contraseña
                  </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/">
                    <FontAwesomeIcon icon="sign-out-alt" /> Cerrar Sesión
                      </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Menu;