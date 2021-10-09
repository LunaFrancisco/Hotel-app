import React from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    Form,
    Label,
    CardBody,
    CardTitle,
} from "reactstrap";

export default () => {

    return <React.Fragment>
        <CardTitle className="h5">
            Información del cliente
        </CardTitle>
        <p className="card-title-desc">
            Aquí va información algo, nose caca
        </p>
        <Form>
            <div>
                <div>
                    <CardTitle className="h2">
                        Cliente 1
                    </CardTitle>
                    <Row>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-name"
                                    className="form-label"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Ingrese el nombre del cliente"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-name"
                                    className="form-label"
                                >
                                    Apellido
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Ingrese el apellido del cliente"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-email-address"
                                    className="form-label"
                                >
                                    Rut
                                </Label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    id="billing-email-address"
                                    placeholder="Rut"
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <CardTitle className="h2">
                        Cliente 2
                    </CardTitle>
                    <Row>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-name"
                                    className="form-label"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Ingrese el nombre del cliente"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-name"
                                    className="form-label"
                                >
                                    Apellido
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Ingrese el apellido del cliente"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-email-address"
                                    className="form-label"
                                >
                                    Rut
                                </Label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    id="billing-email-address"
                                    placeholder="Rut"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Form>
    </React.Fragment>
}