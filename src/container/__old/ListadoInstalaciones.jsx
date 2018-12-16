import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Container, Row, CardHeader } from 'reactstrap';
import moment from 'moment';
import Menu from '../../components/Menu';
import DateRange from '../../components/DateRange';

import ReactTable from "react-table";
import "react-table/react-table.css";

import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import Loading from '../../components/Loading';

import EmpresaCard from '../../components/EmpresaCard';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capturedDate: {
                startDate: moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
            },
            page: 1,
            loading: true,
            informes: [],
            totalPage: 0,
            pageSize: 10,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            this.setState({ empresa })
        });
    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handlerSearch = (model) => {
        const { pageNumber, capturedDate, pageSize, loading } = this.state;

        const data = {
            pageNumber: model.page ? model.page + 1 : 1,
            pageSize: model.pageSize ? model.pageSize : pageSize,
            fromDate: moment(capturedDate.startDate).format('YYYY-MM-DD'),
            toDate: moment(capturedDate.endDate).add(1,'day').startOf('day').format('YYYY-MM-DD'),
        };

        this.setState({ loading: true }, () => {
            InformeService.getAllAdminEmpresa(data).then(informes => {
                this.setState({
                    informes: informes.list,
                    totalPage: informes.totalPage,
                    page: model.page,
                    loading: false,
                    pageSize,
                });
            });
        });
    }

    render() {
        const translations = { noDataText: 'No existen resultados', pageText: 'Página', ofText: 'de', rowsText: 'Filas', previousText: 'Anterior', nextText: 'Siguiente', loadingText: 'Cargando...' };
        const { capturedDate, informes, totalPage, loading } = this.state;
        const { empresa } = this.state;

        return empresa ? (
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/home/empresas">Empresas</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{empresa.nombre}</BreadcrumbItem>
                            </Breadcrumb>

                            <EmpresaCard empresa={empresa} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mt-4">
                            <Card>
                                <CardHeader>
                                    Informes realizados a trabajadores
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={9}>
                                            <DateRange value={capturedDate} name="capturedDate" onChange={this.handlerChange} />
                                        </Col>
                                        <Col md={3}>
                                            <Button disabled={capturedDate === null} onClick={this.handlerSearch} block color="success">Buscar</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardBody>
                                    <ReactTable
                                         {...translations}
                                        columns={[
                                            { Header: "Id", accessor: "id" },
                                            { Header: "Nombre", accessor: "nombre" },
                                            {
                                                Header: "Realizado", id: "fechaRealizacion",
                                                accessor: d => moment(d.fechaRealizacion).format('DD-MM-YYYY'),
                                            },
                                            {
                                                Header: "Trabajador", accessor: "trabajador.run"
                                            },
                                        ]}
                                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                        data={informes}
                                        pages={totalPage} // Display the total number of pages
                                        loading={loading} // Display the loading overlay when we need it
                                        onFetchData={this.handlerSearch} // Request new data when things change
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        sortable={false}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default Plant;