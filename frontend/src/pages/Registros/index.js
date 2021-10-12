import React, { Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Badge } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'

export default () => {
    const breadcrumbItems = [
        { title: "Registros", link: "#" },
    ]

    const acciones = (id) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={'trago-' + id + '-take-button'} title="Retirar producto">
            <Button color="link" className="text-info">
                <i className="ri-close-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'trago-' + id + '-edit-button'} title="Editar producto">
            <Button color="link" className="text-warning">
                <i className="ri-pencil-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'trago-' + id + '-delete-button'} title="Eliminar producto">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

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
                    <Breadcrumbs title="Registros" breadcrumbItems={breadcrumbItems} />

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Registros</CardTitle>
                                    <p className="card-title-desc">
                                        Listado de todos los registros realizados
                                    </p>
                                    <Table
                                        data={data}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div >
            </div >
        </React.Fragment >
    )
}