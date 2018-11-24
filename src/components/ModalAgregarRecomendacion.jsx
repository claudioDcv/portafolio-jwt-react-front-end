import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Table, Input, FormGroup } from 'reactstrap';

class ModalAgregarRecomendacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          recomendacion: '',
        };
    
        this.save = this.save.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      save() {
          const observacion = this.props.observacion;
          const setState = this.setState.bind(this);
          this.props.agregarRecomendacion({
              recomendacion: this.state.recomendacion,
              id: observacion.id,
          }, () => {
              setState({ recomendacion: '', modal: !this.state.modal });
          });
      }

      handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }
    
      render() {
        const { recomendacion } = this.state;
        return (
          <div>
            <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                <FormGroup>
                    <Label>Recomendación</Label>
                    <Input name="recomendacion" value={recomendacion} onChange={this.handleChange}/>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.save}>Guardar</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
    }
export default ModalAgregarRecomendacion;