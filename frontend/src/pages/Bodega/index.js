import React, { Component, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Label, Input } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'
import SweetAlert from "react-bootstrap-sweetalert";

export default () => {
    const [addPopup, setAddPopup] = useState(false)
    const [product, setProduct] = useState({
        id: '',
        stock: '',
        product: ''

    })
    const breadcrumbItems = [
        { title: "Bodega", link: "#" },
    ]

    const onEdit = (item) => {
        setProduct(item)
        setAddPopup(true)
    }

    const handleFormChange = (value, attr) => {
        setProduct({
            ...product,
            [attr]: value.target.value
        })
    }

    const acciones = (item) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={'trago-' + item.id + '-take-button'} title="Editar stock">
            <Button onClick={() => onEdit(item)} color="link" className="text-info">
                <i className="ri-close-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'trago-' + item.id + '-delete-button'} title="Eliminar producto">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

    let licores = [
        { id: 1, product: 'Ron', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 2, product: 'Pisco', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 3, product: 'Gin', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 4, product: 'Sour', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 5, product: 'Cherry', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    licores = licores.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let bebidas = [
        { id: 8, product: 'Coca Cola', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 9, product: 'Fanta', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 10, product: 'Sprite', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 11, product: 'Ginger Ale', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    bebidas = bebidas.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let comida = [
        { id: 12, product: 'Papas Fritas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 13, product: 'Doritos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 13, product: 'Chicles', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    comida = comida.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let ropa = [
        { id: 14, product: 'Sabanas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 15, product: 'Toallas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    ropa = ropa.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let utencilios = [
        { id: 16, product: 'Vasos grandes', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 17, product: 'Vasos chicos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 18, product: 'Bandejas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    utencilios = utencilios.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let otros = [
        { id: 19, product: 'Espumas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 20, product: 'Shampoo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 21, product: 'Bálsamo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 22, product: 'Prestobarba', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 23, product: 'Peinetas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
        { id: 24, product: 'Preservativos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}` },
    ];

    otros = otros.map(item => ({
        ...item,
        actions: acciones(item)
    }))

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
                    {addPopup ? (
                        <SweetAlert
                            showCancel
                            title={`Editar stock de ${product.product}`}
                            cancelBtnBsStyle="danger"
                            confirmBtnBsStyle="success"
                            confirmBtnText="Aceptar"
                            cancelBtnText="Cancelar"
                            onConfirm={() => {
                                setProduct({})
                            }}
                            onCancel={() => setAddPopup(false)}
                        >
                            <Row>
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="firstname"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Stock
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ingrese la cantidad de stock"
                                            value={product.stock}
                                            onChange={(value) => handleFormChange(value, 'stock')}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </SweetAlert>
                    ) : null
                    }
                </div >
            </div >
        </React.Fragment >
    )
}