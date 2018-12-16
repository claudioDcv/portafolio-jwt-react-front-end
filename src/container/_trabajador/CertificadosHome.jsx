import React, { Component } from 'react';
import { Container, Button, Table,
    FormGroup, Label, Input,
    Row, Col, Card, CardBody,
    CardHeader } from 'reactstrap';
import Select from 'react-select';
import { fechaFormateada } from '../../common/utils';

import EmpresasService from '../../http/service/EmpresaService';

class CertificadosHome extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            estado: 0,
            tipoInforme: 'ninguna',
            empresas: [],
            run: '',
            certificados: [],
            consulta: [],
            capacitacionesporhacer: [],
            empresaSeleccionada: null,
            verTabla: 'ninguna',
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
                verTabla: type,
                certificados,
            }));
        } else if (type === 'consulta') {
            EmpresasService.misExamenes(data).then(consulta => this.setState({
                verTabla: type,
                consulta,
            }));
        }else if (type === 'capacitacionesporhacer') {
            EmpresasService.misCapacitacionesPorHacer(data).then(capacitacionesporhacer => this.setState({
                verTabla: type,
                capacitacionesporhacer,
            }));
        }
    }

    handlerDownload = (asistenciaId) => () => {
        const { empresaSeleccionada, run } = this.state;
        
        const data = {
            empresaId: empresaSeleccionada.value,
            run,
            asistenciaId,
        };
        EmpresasService.descargarCertificado(data).then(certificados => this.setState({
            certificados,
        }));
    }

    handlerDownload2 = (consultaId) => () => {
        const { empresaSeleccionada, run } = this.state;
      
        const data = {
            empresaId: empresaSeleccionada.value,
            run,
            consultaId,
        };
        EmpresasService.descargarConsulta(data).then(consulta => this.setState({
            consulta,
        }));
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    render() {
        const { verTabla, empresaSeleccionada, empresas, run, consulta, certificados, capacitacionesporhacer } = this.state;
        return (
            <Container className="mt-4">
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardHeader>Documentos Trabajador</CardHeader>
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
                                        <Col md={4}>
                                            <Button
                                                block
                                                color={verTabla === 'certificados' ? 'success' : 'secondary'}
                                                className="mr-1"
                                                onClick={this.onSubmit('certificados')}
                                            >Ver mis Capaciaciones</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button
                                                block
                                                color={verTabla === 'capacitacionesporhacer' ? 'success' : 'secondary'}
                                                className="mr-1"
                                                onClick={this.onSubmit('capacitacionesporhacer')}
                                            >Capaciaciones Futuras</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button
                                                block
                                                color={verTabla === 'consulta' ? 'success' : 'secondary'}
                                                className="mr-1"
                                                onClick={this.onSubmit('consulta')}
                                            >Ver mi Ficha Medica</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{ display: verTabla === 'certificados' ? 'block' : 'none' }}>
                    <Col md={{ size: 8, offset: 2 }}>
                    <Card className="mt-4">
                        <CardHeader>
                                Mis Capacitaciones Realizadas
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre Capacitación</th>
                                            <th>Fecha de Realización</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {certificados.map(e => (
                                            <tr key={e.id}>
                                                <td>
                                                    {e.id}
                                                </td>
                                                <td>
                                                    {e.capacitacionNombre}
                                                </td>
                                                <td>
                                                    {fechaFormateada(new Date(e.fechaRealizacion))}
                                                </td>
                                                <td>
                                                    <Button block color={'info'} size="sm" onClick={this.handlerDownload(e.asistenciaId)}>Descargar Certificado</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ display: verTabla === 'consulta' ? 'block' : 'none' }}>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card className="mt-4">
                            <CardHeader>
                                Mis Consultas
                            </CardHeader>
                            <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Fecha de Realización</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consulta.map(e => (
                                        <tr key={e.id}>
                                            <td>
                                                {e.id}
                                            </td>
                                            <td>
                                                {fechaFormateada(new Date(e.fechaRealizacion))}
                                            </td>
                                            <td>
                                                <Button block color={'info'} size="sm" onClick={this.handlerDownload2(e.id)}>Descargar Consulta</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ display: verTabla === 'capacitacionesporhacer' ? 'block' : 'none' }}>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card className="mt-4">
                            <CardHeader>
                                Mis Consultas
                            </CardHeader>
                            <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                       <th>Nombre</th>
                                       <th>Fecha Agendada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {capacitacionesporhacer.map(e => (
                                        <tr key={e.capacitacionId}>
                                            <td>
                                                {e.capacitacionId}
                                            </td>
                                            <td>
                                            {e.capacitacionNombre}
                                            </td>
                                            <td>
                                                {fechaFormateada(new Date(e.fechaRealizacion))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CertificadosHome;