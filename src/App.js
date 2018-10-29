import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGhost,
  faSignOutAlt,
  faKey,
  faUser,
  faTrash,
  faEye,
  faUsers,
  faShieldAlt,
  faAt,
  faBuilding,
  faGraduationCap,
  faNotesMedical,
  faFileAlt,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import Master from './container/Main';

const icons = [
  faGhost,
  faSignOutAlt,
  faKey, faUser, faTrash, faEye, faUsers, faShieldAlt, faAt,
  faBuilding,
  faGraduationCap,
  faNotesMedical,
  faFileAlt,
  faArrowLeft,
];

library.add(icons);

class App extends Component {
  render() {
    return (
      <Master />
    );
  }
}

export default App;