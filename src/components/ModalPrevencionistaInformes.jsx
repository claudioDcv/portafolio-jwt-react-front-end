// ModalAsignarPrevencionistaInformeDetalle
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Table } from 'reactstrap';

import ModalAgregarRecomendacion from './ModalAgregarRecomendacion';

import InformeService from '../http/service/InformeService';

class ModalPrevencionistaInformes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      observaciones: [],
    };

    this.aprobar = this.aprobar.bind(this);
    this.rechazar = this.rechazar.bind(this);
    this.cerrar = this.cerrar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.agregarRecomendacion = this.agregarRecomendacion.bind(this);
  }

  toggle() {

    if (!this.state.modal) {
      InformeService.observacionByInformeId(this.props.informe.detalle).then(observaciones => {
        this.setState({ observaciones }, () => {
          this.setState({
            modal: !this.state.modal,
          });
        });
      });
    } else {
      this.setState({
        modal: !this.state.modal,
      });
    }
  }

  aprobar() {
    InformeService.aprobarInformeDetalle(this.props.informe.detalle).then(() => {
      this.setState({
        modal: false,
      });
    });
  }

  rechazar() {
    InformeService.rechazarInformeDetalle(this.props.informe.detalle).then(() => {
      this.setState({
        modal: false,
      });
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

  agregarRecomendacion(data, callback) {
    InformeService.agregarRecomendacionParaObservacionPorPreve(data).then(e => {
      callback();
      InformeService.observacionByInformeId(this.props.informe.detalle).then(observaciones => {
        this.setState({ observaciones });
      });
    });
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
    const { observaciones } = this.state;
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
            <Table striped>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Titulo</th>
                  <th>Recomendación</th>
                </tr>
              </thead>
              <tbody>
                {observaciones.map(e => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.nombre}</td>
                    <td>{e.recomendacion ? e.recomendacion : (
                      <ModalAgregarRecomendacion observacion={e} buttonLabel="Agregar" agregarRecomendacion={this.agregarRecomendacion} />
                    )}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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