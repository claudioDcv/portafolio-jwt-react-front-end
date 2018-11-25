import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Row, Col, Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactTable from "react-table";
import "react-table/react-table.css";

import EmpresasService from '../../http/service/EmpresaService';

import Menu from '../../components/Menu';
import EmpresaCard from '../../components/EmpresaCard';


class ListadoInformesAsignado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            this.setState({
                empresa,
            })
        });
    }

    render() {
        const { empresa } = this.state;
        return empresa? (
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
                </Container>
            </div>
        ) : (<div />);
    }
}

export default ListadoInformesAsignado;