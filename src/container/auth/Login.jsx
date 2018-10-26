import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col, Alert, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../components/Logo';

import AuthService from '../../http/service/AuthService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visible: false,
            failedMessage: null,
        };

        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handlerOnLogin = this.handlerOnLogin.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        window.localStorage.setItem('user', false);
        window.localStorage.setItem('token', false);
        window.localStorage.setItem('profile', '');
        window.localStorage.setItem('email', '');
    }

    handlerOnChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handlerOnLogin() {
        const { email, password } = this.state;
        this.setState({ visible: false, failedMessage: null });
        AuthService.login({ email, password }).then(data => {
            if (data.token) {
                window.localStorage.setItem('token', data.token);
                this.props.history.push('/home')
            } else {
                this.setState({ visible: true, failedMessage: data.message });
            }
        });

    }

    onDismiss() {
        this.setState({ visible: false });
    }

    handleChange = (profile) => {
        this.setState({ profile });
    }

    onDisabledButton() {
        const { password, email } = this.state;
        return !(password !== '' && email !== '');
    }

    render() {
        const { email, password, failedMessage } = this.state;
        return (
            <div>
                <Container className="card-login">
                    <Form>
                        <Row>
                            <Col md={{ size: 8, offset: 2 }}>
                                <Logo />
                            </Col>
                            <Col md={{ size: 8, offset: 2 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Inicio de Sesión</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="email">
                                                <FontAwesomeIcon icon="at" /> Email
                                            </Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Ingrese Email"
                                                value={email}
                                                onChange={this.handlerOnChange}
                                                maxLength="256"
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="password">
                                                <FontAwesomeIcon icon="key" /> Contraseña
                                            </Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Ingrese Contraseña"
                                                value={password}
                                                onChange={this.handlerOnChange}
                                            />
                                        </FormGroup>
                                        <Button disabled={this.onDisabledButton()} color="success" size="lg" onClick={this.handlerOnLogin} block>Ingresar</Button>
                                        <Alert className="mt-4" color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                            Usuario y/o Contraseña incorrectas<br />
                                            {failedMessage}
                                        </Alert>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Login;
