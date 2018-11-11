// ModalAsignarPrevencionistaInformeDetalle
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

class ModalPrevencionistaInformes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.aprobar = this.aprobar.bind(this);
    this.rechazar = this.rechazar.bind(this);
    this.cerrar = this.cerrar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {

    if(!this.state.modal) {
      alert(this.props.informe.detalle)
    }
    this.setState({
      modal: !this.state.modal,
    });
  }

  aprobar() {
    this.setState({
      modal: false,
    });
  }

  rechazar() {
    this.setState({
      modal: false,
    });
  }

  cerrar() {
    this.setState({
      modal: false,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  vistaTrabajador(t) {
    return (
      <div>
      <ul>
        <li>Informe Trabajador <strong>{t.nombre} {t.apellidoPaterno} {t.apellidoMaterno}</strong></li>
      </ul>
      <h5>Riesgos</h5>
      <ul>
        {t.riesgos.map(e => (
          <li key={e.id}>{e.id}) {e.nombre}</li>
        ))}
      </ul>
      </div>
    );
  }

  render() {
    const { informe } = this.props;
    return (
      <div>
        <Button color="info" size="sm" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Informes Observaciones y Recomendaciones</ModalHeader>
          <ModalBody>
            <strong>{informe.nombre}</strong>
            {informe.trabajador && this.vistaTrabajador(informe.trabajador)}

            <Label for="exampleSelect">Observaciones</Label>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.cerrar}>Cerrar</Button>{' '}
            <Button color="danger" onClick={this.rechazar}>Rechazar</Button>{' '}
            <Button color="info" onClick={this.aprobar}>Aprobar</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPrevencionistaInformes;