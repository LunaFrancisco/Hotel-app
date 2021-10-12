import React, { Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'

export default () => {
    const breadcrumbItems = [
        { title: "Bodega", link: "#" },
    ]

    const acciones = (id) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={'trago-' + id + '-take-button'} title="Editar stock">
            <Button color="link" className="text-info">
                <i className="ri-close-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'trago-' + id + '-delete-button'} title="Eliminar producto">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

    const licores = [
        { id: 1, product: 'Ron', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(1) },
        { id: 2, product: 'Pisco', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(2) },
        { id: 3, product: 'Gin', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(3) },
        { id: 4, product: 'Sour', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(4) },
        { id: 5, product: 'Cherry', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(5) },
    ];

    const bebidas = [
        { id: 8, product: 'Coca Cola', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(8) },
        { id: 9, product: 'Fanta', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(9) },
        { id: 10, product: 'Sprite', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(10) },
        { id: 11, product: 'Ginger Ale', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(1) },
    ];

    const comida = [
        { id: 12, product: 'Papas Fritas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(12) },
        { id: 13, product: 'Doritos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(13) },
        { id: 13, product: 'Chicles', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(13) },
    ];

    const ropa = [
        { id: 14, product: 'Sabanas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(14) },
        { id: 15, product: 'Toallas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(15) },
    ];

    const utencilios = [
        { id: 16, product: 'Vasos grandes', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(16) },
        { id: 17, product: 'Vasos chicos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(17) },
        { id: 18, product: 'Bandejas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(18) },
    ];

    const otros = [
        { id: 19, product: 'Espumas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(19) },
        { id: 20, product: 'Shampoo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(20) },
        { id: 21, product: 'Bálsamo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(21) },
        { id: 22, product: 'Prestobarba', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(22) },
        { id: 23, product: 'Peinetas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(23) },
        { id: 24, product: 'Preservativos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, actions: acciones(24) },
    ];

    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            sort: true,
        },
        {
            dataField: 'product',
            text: 'Producto',
            sort: true
        },
        {
            dataField: 'stock',
            text: 'Stock',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Acciones',
            sort: true
        }
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Bodega" breadcrumbItems={breadcrumbItems} />

                    <Row>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Botellas</CardTitle>
                                    <p className="card-title-desc">
                                        Botellas listados para inventario.
                                    </p>
                                    <Table
                                        data={licores}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Bebidas</CardTitle>
                                    <p className="card-title-desc">
                                        Bebidas listados para inventario.
                                    </p>
                                    <Table
                                        data={bebidas}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Comidas</CardTitle>
                                    <p className="card-title-desc">
                                        Comidas listados para inventario.
                                    </p>
                                    <Table
                                        data={comida}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Ropa</CardTitle>
                                    <p className="card-title-desc">
                                        Ropa listados para inventario.
                                    </p>
                                    <Table
                                        data={ropa}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Utencilios</CardTitle>
                                    <p className="card-title-desc">
                                        Utencilios listados para inventario.
                                    </p>
                                    <Table
                                        data={utencilios}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Otros</CardTitle>
                                    <p className="card-title-desc">
                                        Otros productos listados para inventario.
                                    </p>
                                    <Table
                                        data={otros}
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