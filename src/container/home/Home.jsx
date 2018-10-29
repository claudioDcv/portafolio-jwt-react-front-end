import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Col, Row, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../../components/Menu';
import { hasProfile, profileList, notProfile } from '../../common/utils';

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
