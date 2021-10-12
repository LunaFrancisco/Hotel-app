import React, { Component, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Badge, Nav, NavItem, NavLink, TabPane, CardText, TabContent } from "reactstrap"
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'
import MiniWidgets from "../../components/Common/MiniWidgets";
import VentasTable from "./Ventas";
import GastosTable from "./Gastos";
import RetirosTable from "./Retiros";

export default () => {
    const [activeTab, setActiveTab] = useState(0)
    const breadcrumbItems = [
        { title: "Caja", link: "#" },
    ]

    const renderState = (state) => {
        const color = {
            1: 'bg-warning',
            2: 'bg-danger',
            3: 'bg-success',
        }

        const label = {
            1: 'Pendiente',
            2: 'Cancelado',
            3: 'Pagado',
        }

        return <Badge className={`${color[state]} me-1`}>{label[state]}</Badge>
    }

    const timeFormat = (number) => number > 9 ? `${number}` : `0${number}`
    const data = Array(16).fill(null).map(item => ({
        amount: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`,
        state: renderState(Math.round(Math.random() * 2) + 1), id: Math.round(Math.round(Math.random() * 5014)),
        room: Math.round(Math.round(Math.random() * 32)),
        checkin_date: `${timeFormat(Math.round(Math.round(Math.random() * 31)))}-10-2021 ${timeFormat(Math.round(Math.round(Math.random() * 23)))}:${timeFormat(Math.round(Math.round(Math.random() * 59)))}`,
        transaction_date: `${timeFormat(Math.round(Math.round(Math.random() * 31)))}-10-2021 ${timeFormat(Math.round(Math.round(Math.random() * 23)))}:${timeFormat(Math.round(Math.round(Math.random() * 59)))}`,
        obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, perferendis. Nobis voluptate, assumenda quae magni reiciendis unde asperiores enim eum.'
    }))

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'room',
            text: 'N° Habitación',
            sort: true
        },
        {
            dataField: 'checkin_date',
            text: 'Fecha de entrada',
            sort: true
        },
        {
            dataField: 'transaction_date',
            text: 'Fecha de transacción',
            sort: true
        },
        {
            dataField: 'amount',
            text: 'Monto',
            sort: true
        },
        {
            dataField: 'state',
            text: 'Estado',
            sort: true
        },
        {
            dataField: 'obs',
            text: 'Observación',
            sort: true
        },
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Caja" breadcrumbItems={breadcrumbItems} />

                    <Row>
                        <MiniWidgets
                            title="Caja"
                            value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                            // icon="ri-stack-line"
                            rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                            desc="Desde el turno anterior"
                        />
                        <MiniWidgets
                            title="Ventas"
                            value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                            // icon="ri-stack-line"
                            rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                            desc="Desde el turno anterior"
                        />
                        <MiniWidgets
                            title="Gastos"
                            value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                            // icon="ri-add-fill"
                            rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                            desc="Desde el turno anterior"
                            negative
                        />
                        <MiniWidgets
                            title="Retiros"
                            value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                            // icon=" ri-add-fill"
                            rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                            desc="Desde el turno anterior"
                            negative
                        />

                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <Nav pills className="navtab-bg nav-justified">
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === 0
                                                })}
                                                onClick={() => {
                                                    setActiveTab(0);
                                                }}
                                            >
                                                Registros
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === 1
                                                })}
                                                onClick={() => {
                                                    setActiveTab(1);
                                                }}
                                            >
                                                Ventas
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === 2
                                                })}
                                                onClick={() => {
                                                    setActiveTab(2);
                                                }}
                                            >
                                                Gastos
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === 3
                                                })}
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                Retiros
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardBody>
                            </Card>
                        </Col>

                        {
                            activeTab === 0 && <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="h4">Registros del turno</CardTitle>
                                        <p className="card-title-desc">
                                            Listado de todos los registros realizados en el turno
                                        </p>
                                        <Table
                                            data={data}
                                            columns={columns}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        }

                        {
                            activeTab === 1 && <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="h4">Ventas</CardTitle>
                                        <p className="card-title-desc">
                                            Listado de todas las ventas
                                        </p>
                                        <VentasTable />
                                    </CardBody>
                                </Card>
                            </Col>
                        }

                        {
                            activeTab === 2 && <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="h4">Gastos</CardTitle>
                                        <p className="card-title-desc">
                                            Listado de todas los gasots
                                        </p>
                                        <GastosTable />
                                    </CardBody>
                                </Card>
                            </Col>
                        }

                        {
                            activeTab === 3 && <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="h4">Retiros</CardTitle>
                                        <p className="card-title-desc">
                                            Listado de todas los retiros
                                        </p>
                                        <RetirosTable />
                                    </CardBody>
                                </Card>
                            </Col>
                        }

                    </Row>
                </div >
            </div >
        </React.Fragment >
    )
}