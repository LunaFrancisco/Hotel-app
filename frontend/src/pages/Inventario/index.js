import React, { Component, useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Input, Label } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";
import SweetAlert from "react-bootstrap-sweetalert";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'
import { get, post } from '../../api'

export default () => {
    const [addPopup, setAddPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const [edit, setEdit] = useState(false)
    const [product, setProduct] = useState({
        id: '',
        stock: '',
        product: '',
        category: '',
        price: '',

    })
    const breadcrumbItems = [
        { title: "Inventario", link: "#" },
    ]

    const onEdit = (item, isEdit = false) => {
        console.log(item)
        setProduct({
            ...item,
            price: parseFloat(item.price.replaceAll('$ ', '').replaceAll('.', '').replaceAll(',', '.'))
        })
        setEdit(isEdit)
        setEditPopup(true)
    }

    const handleFormChange = (value, attr) => {
        setProduct({
            ...product,
            [attr]: value.target.value
        })
    }

    const acciones = (item) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={item.category + '-' + item.id + '-take-button'} title="Retirar producto">
            <Button onClick={() => onEdit(item)} color="link" className="text-info">
                <i className="ri-close-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={item.category + '-' + item.id + '-edit-button'} title="Editar producto">
            <Button onClick={() => onEdit(item, true)} color="link" className="text-warning">
                <i className="ri-pencil-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={item.category + '-' + item.id + '-delete-button'} title="Eliminar producto">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

    useEffect(async () => {
        const data = await get('api/inventario/getInventario')
        console.log(data)
    }, [])

    let licores = [
        { id: 1, product: 'Ron', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Licores' },
        { id: 2, product: 'Pisco', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Licores' },
        { id: 3, product: 'Gin', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Licores' },
        { id: 4, product: 'Sour', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Licores' },
        { id: 5, product: 'Cherry', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Licores' },
    ];

    licores = licores.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let bebidas = [
        { id: 8, product: 'Coca Cola', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Bebidas' },
        { id: 9, product: 'Fanta', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Bebidas' },
        { id: 10, product: 'Sprite', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Bebidas' },
        { id: 11, product: 'Ginger Ale', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Bebidas' },
    ]

    bebidas = bebidas.map(item => ({
        ...item,
        actions: acciones(item)
    }))


    let comida = [
        { id: 12, product: 'Papas Fritas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Comidas' },
        { id: 13, product: 'Doritos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Comidas' },
        { id: 13, product: 'Chicles', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Comidas' },
    ];

    comida = comida.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let ropa = [
        { id: 14, product: 'Sabanas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Ropa' },
        { id: 15, product: 'Toallas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Ropa' },
    ];

    ropa = ropa.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let utencilios = [
        { id: 16, product: 'Vasos grandes', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Utencilios' },
        { id: 17, product: 'Vasos chicos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Utencilios' },
        { id: 18, product: 'Bandejas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Utencilios' },
    ];

    utencilios = utencilios.map(item => ({
        ...item,
        actions: acciones(item)
    }))

    let otros = [
        { id: 19, product: 'Espumas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
        { id: 20, product: 'Shampoo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
        { id: 21, product: 'Bálsamo', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
        { id: 22, product: 'Prestobarba', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
        { id: 23, product: 'Peinetas', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
        { id: 24, product: 'Preservativos', stock: Math.round(Math.round(Math.random() * 30)), price: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, category: 'Otros' },
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
            dataField: 'price',
            text: 'Precio',
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
                    <Breadcrumbs title="Inventario" breadcrumbItems={breadcrumbItems} />
                    <div className="position-relative" style={{ height: 50 }}>
                        <div aria-label="Page navigation example" className="pagination-rounded position-absolute top-0" style={{ right: 0 }}>
                            <Button onClick={() => setAddPopup(true)} color="success">Agregar Producto</Button>
                        </div>
                    </div>
                    {addPopup ? (
                        <SweetAlert
                            showCancel
                            title="Añadir un producto"
                            cancelBtnBsStyle="danger"
                            confirmBtnBsStyle="success"
                            confirmBtnText="Añadir"
                            cancelBtnText="Cancelar"
                            onConfirm={() => {

                            }}
                            onCancel={() => setAddPopup(false)}
                        >
                            <Row>
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="product"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Producto
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese el nombre del producto"
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="categoria"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Categoría
                                        </Label>
                                        <select className="form-select">
                                            <option defaultValue>Seleccion una categoría</option>
                                            <option value="1">Tragos</option>
                                            <option value="2">Bebidas</option>
                                            <option value="3">Comidas</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="precio"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Precio
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            id="billing-name"
                                            placeholder="Ingrese el precio del producto"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </SweetAlert>
                    ) : null
                    }
                    <Row>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Licores</CardTitle>
                                    <p className="card-title-desc">
                                        licores listados para inventario.
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
                    {editPopup ? (
                        <SweetAlert
                            showCancel
                            title={edit ? 'Editar producto' : `Editar stock de ${product.product}`}
                            cancelBtnBsStyle="danger"
                            confirmBtnBsStyle="success"
                            confirmBtnText="Aceptar"
                            cancelBtnText="Cancelar"
                            onConfirm={() => {
                                setProduct({})
                            }}
                            onCancel={() => setEditPopup(false)}
                        >
                            <Row>
                                {
                                    edit ? <Row>
                                        <Col lg={12}>
                                            <div className="mb-4">
                                                <Label
                                                    htmlFor="product"
                                                    className="form-label w-100"
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    Producto
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ingrese el nombre del producto"
                                                    value={product.product}
                                                    onChange={(value) => handleFormChange(value, 'product')}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="mb-4">
                                                <Label
                                                    htmlFor="categoria"
                                                    className="form-label w-100"
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    Categoría
                                                </Label>
                                                <select className="form-select" value={product.category} onChange={(value) => handleFormChange(value, 'category')}>
                                                    <option defaultValue>Seleccion una categoría</option>
                                                    <option value="Licores">Licores</option>
                                                    <option value="Bebidas">Bebidas</option>
                                                    <option value="Comidas">Comidas</option>
                                                    <option value="Ropa">Ropa</option>
                                                    <option value="Utencilios">Utencilios</option>
                                                    <option value="Otros">Otros</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="mb-4">
                                                <Label
                                                    htmlFor="precio"
                                                    className="form-label w-100"
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    Precio
                                                </Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    id="billing-name"
                                                    placeholder="Ingrese el precio del producto"
                                                    value={product.price}
                                                    onChange={(value) => handleFormChange(value, 'price')}
                                                />
                                            </div>
                                        </Col>
                                    </Row> : <Col lg={12}>
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
                                }
                            </Row>
                        </SweetAlert>
                    ) : null
                    }
                </div >
            </div >
        </React.Fragment >
    )
}