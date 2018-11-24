import React, { Component } from 'react';
import { Container, Button, Table, FormGroup, Label, Input, Row, Col, Alert, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Select from 'react-select';

import EmpresasService from '../../http/service/EmpresaService';

class CertificadosHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresas: [],
            run: '',
            certificados: [],
            empresaSeleccionada: null,
        };
    }

    componentDidMount() {
        EmpresasService.findAllPublic().then(e => this.setState({
            empresas: e.map(e => ({ value: e.id, label: e.nombre })),
        }));
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (type) => () => {
        const { empresaSeleccionada, run } = this.state;
        const data = {
            empresaId: empresaSeleccionada.value,
            run,
        };
        if (type === 'certificados') {
            EmpresasService.misCertificados(data).then(certificados => this.setState({
                certificados,
            }));
        }
    }

    handlerDownload = (asistenciaId) => () => {
        const { empresaSeleccionada, run } = this.state;
        debugger
        const data = {
            empresaId: empresaSeleccionada.value,
            run,
            asistenciaId,
        };
        EmpresasService.descargarCertificado(data).then(certificados => this.setState({
            certificados,
        }));
    }

    render() {
        const { empresaSeleccionada, empresas, run, certificados } = this.state;
        return (
            <Container className="mt-4">
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardHeader>Certificados</CardHeader>
                            <CardBody>
                                <div>
                                    <FormGroup>
                                        <Label>Rut</Label>
                                        <Input value={run} name="run" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Empresa</Label>
                                        <Select
                                            value={empresaSeleccionada}
                                            onChange={(value) => this.handleChange({ target: { value, name: 'empresaSeleccionada' } })}
                                            options={empresas}
                                        />
                                    </FormGroup>
                                    <Row>
                                        <Col md={6}>
                                            <Button
                                                color="success"
                                                block
                                                onClick={this.onSubmit('certificados')}
                                            >Ver mis certificados</Button>
                                        </Col>
                                        <Col md={6}>
                                            <Button
                                                color="success"
                                                block
                                                onClick={this.onSubmit('examenes')}
                                            >Ver mis Examenes</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificados.map(e => (
                                    <tr jey={e.id}>
                                        <td>
                                            {e.id}
                                        </td>
                                        <td>
                                            <Button size="sm" onClick={this.handlerDownload(e.asistenciaId)}>Descargar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CertificadosHome;