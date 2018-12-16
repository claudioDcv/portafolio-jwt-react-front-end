import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Col, Row, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../../components/Menu';
import { userExtras } from '../../config/const';
import { hasProfile, profileList } from '../../common/utils';

const Home = () => (
    <div>
        <Menu />
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            Home
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <h2>Home</h2>
                </Col>
                <Col md="12">

                    {hasProfile([profileList.ADMIN_EMPRESA]) && (<Link to={`/home/evaluaciones/${userExtras().empresaFk}`}> 
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="file-alt" /> Lista Instalaciones
                        </Button>
                    </Link>)}
                    {hasProfile([profileList.ADMIN_EMPRESA]) && (<Link to={`/home/capacitaciones/${userExtras().empresaFk}`}>
                        <Button className={"mx-2"} size="lg" color="primary">
                            <FontAwesomeIcon icon="graduation-cap" /> Lista Capacitaciones
                        </Button>
                    </Link>)}
                    {hasProfile([profileList.ADMIN_EMPRESA]) && (<Link to={`/home/visitasprogramadas/${userExtras().empresaFk}`}>
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="notes-medical" /> Lista Visitas Medicas Programadas
                        </Button>
                    </Link>)}

                    {hasProfile([profileList.ADMIN_EMPRESA]) && (<Link to={`/home/informes/trabajadores/${userExtras().empresaFk}`}>
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="file-alt" /> Informes Trabajadores
                        </Button>
                    </Link>)}

                    {hasProfile([profileList.ADMIN_EMPRESA]) && (<Link to={`/home/informes/instalaciones/${userExtras().empresaFk}`}>
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="file-alt" /> Informes Instalaciones
                        </Button>
                    </Link>)}


                    {hasProfile(profileList.SAFE_ADMIN_SUPERVISOR) && (<Link to="/usuarios">
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="users" /> Usuarios
                        </Button>
                    </Link>)}
                    {hasProfile(profileList.SAFE) && (<Link to="/home/empresas" className="ml-2">
                        <Button size="lg" color="primary">
                            <FontAwesomeIcon icon="building" /> Empresas
                        </Button>
                    </Link>)}
                </Col>
            </Row>
        </Container>
    </div >
);

export default Home;
