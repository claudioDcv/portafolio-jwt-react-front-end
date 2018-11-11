// ModalAsignarPrevencionistaInformeDetalle
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import Select from 'react-select';

class ModalAsignarPrevencionistaInformeDetalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      prevencionistaSeleccionado: null,
    };

    this.guardar = this.guardar.bind(this);
    this.cerrar = this.cerrar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      prevencionistaSeleccionado: null
    });
  }

  guardar() {
    const idPrevencionista = this.state.prevencionistaSeleccionado.value;
    this.setState({
      modal: !this.state.modal,
      prevencionistaSeleccionado: null
    }, () => this.props.onAsignar({
        idDetalle: this.props.informe.detalle,
        idPrevencionista,
    }));
  }

  cerrar() {
    this.setState({
      modal: false,
      prevencionistaSeleccionado: null,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Button color="info" size="sm" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Label for="exampleSelect">Instalaciones</Label>
            <Select
                value={this.state.prevencionistaSeleccionado}
                onChange={(value) => this.handleChange({ target: { value, name: 'prevencionistaSeleccionado' } })}
                options={this.props.prevencionistas}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.guardar}>Asignar</Button>{' '}
            <Button color="secondary" onClick={this.cerrar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalAsignarPrevencionistaInformeDetalle;