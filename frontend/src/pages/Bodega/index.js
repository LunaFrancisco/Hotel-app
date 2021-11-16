import React, { Component, useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Label, Input } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'
import SweetAlert from "react-bootstrap-sweetalert";
import { get, put, del, post } from '../../api'

export default () => {
    const [addPopup, setAddPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [responsePopup, setResponsePopup] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [tipos, setTipos] = useState([])
    const [bodega, setBodega] = useState([])
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({
        licores: [],
        bebidas: [],
        comida: [],
        ropa: [],
        utencilios: [],
        otros: [],
    })
    const [product, setProduct] = useState({
        id: '',
        stock: '',
        product: '',
        category: '',
        cantidad: '',
        cantidad_minima: '',
        price: '',
    })

    const breadcrumbItems = [
        { title: "Bodega", link: "#" },
    ]

    const onAddProduct = async () => {
        setAddPopup(true)
    }

    const onEdit = (item, isEdit = false) => {
        setProduct({
            ...item,
            id: item.id,
            price: item.precio,
            product: item.nombre,
            stock: item.bodega.cantidad,
            category: tipos.find(tipo => tipo.tipo == item.tipo_producto.tipo)?.id,
            actions: acciones(item)
        })
        setEdit(isEdit)
        setEditPopup(true)
    };

    const onDelete = (item) => {
        setProduct(item)
        setDeletePopup(true)
    };

    const handleFormChange = (value, attr) => {
        setProduct({
            ...product,
            [attr]: value.target.value
        })
    }

    const acciones = (item) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={item.category + '-' + item.id + '-take-button'} title="Editar stock">
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
            <Button onClick={() => onDelete(item)} color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

    useEffect(async () => {
        const response = await get('api/products/obtenerTiposProducto')
        setTipos(response.msg)
    }, [])

    useEffect(async () => {
        const response = await get('api/bodega/getBodega')

        const map_products = (item) => ({
            id: item.id,
            price: `$ ${item.precio.toLocaleString("es-CL")}`,
            product: item.nombre,
            stock: item.bodega.cantidad,
            actions: acciones(item)
        })

        setData({
            licores: response.msg.filter(item => item.tipo_producto.tipo === 'Licores').map(map_products),
            bebidas: response.msg.filter(item => item.tipo_producto.tipo === 'Bebida').map(map_products),
            comida: response.msg.filter(item => item.tipo_producto.tipo === 'Comida').map(map_products),
            ropa: response.msg.filter(item => item.tipo_producto.tipo === 'Ropa').map(map_products),
            utencilios: response.msg.filter(item => item.tipo_producto.tipo === 'Utencilios').map(map_products),
            otros: response.msg.filter(item => item.tipo_producto.tipo === 'Otros').map(map_products),
        })
    }, [refresh, tipos])

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
                    <div className="position-relative" style={{ height: 50 }}>
                        <div aria-label="Page navigation example" className="pagination-rounded position-absolute top-0" style={{ right: 0 }}>
                            <Button onClick={onAddProduct} color="success">Añadir un producto</Button>
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
                            onConfirm={async () => {
                                const response = await post('api/bodega/crearProductoBodega', {
                                    nombre: product.product,
                                    precio: product.price,
                                    id_tipo: product.category,
                                    cantidad: product.cantidad,
                                    cantidad_minima: product.cantidad_minima
                                }, { 'Content-Type': 'application/json' })
                                if (response.ok) {
                                    setResponsePopup({
                                        title: 'Producto creado con éxito',
                                        ok: response.ok
                                    })
                                } else {
                                    setResponsePopup({
                                        title: 'Error al crear producto',
                                        ok: response.ok
                                    })
                                }
                                setProduct({})
                                setRefresh(!refresh)
                                setAddPopup(false)
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
                                        <select className="form-select" onChange={(value) => handleFormChange(value, 'category')}>
                                            <option defaultValue>Seleccion una categoría</option>
                                            {tipos.map(tipo => <option value={tipo.id} selected={tipo.id == product.category}>{tipo.tipo}</option>)}
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
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="cantidad"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Cantidad
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            id="billing-name"
                                            placeholder="Ingrese el precio del producto"
                                            value={product.cantidad}
                                            onChange={(value) => handleFormChange(value, 'cantidad')}
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="cantidad_minima"
                                            className="form-label w-100"
                                            style={{ textAlign: 'left' }}
                                        >
                                            Cantidad mínima
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            id="billing-name"
                                            placeholder="Ingrese el precio del producto"
                                            value={product.cantidad_minima}
                                            onChange={(value) => handleFormChange(value, 'cantidad_minima')}
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
                                        Licores listados para inventario.
                                    </p>
                                    <Table
                                        data={data.licores}
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
                                        data={data.bebidas}
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
                                        data={data.comida}
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
                                        data={data.ropa}
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
                                        data={data.utencilios}
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
                                        data={data.otros}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {responsePopup != null && <SweetAlert
                        title={responsePopup.title}
                        type={responsePopup.ok ? 'success' : 'error'}
                        onConfirm={() => setResponsePopup(null)}
                    >
                    </SweetAlert>}
                    {deletePopup && <SweetAlert
                        showCancel
                        type="info"
                        title="Está seguro que desea elminiar este producto"
                        cancelBtnBsStyle="danger"
                        confirmBtnBsStyle="success"
                        confirmBtnText="Aceptar"
                        cancelBtnText="Cancelar"
                        onConfirm={async () => {
                            const response = await del('api/products/eliminarProducto', {
                                id_producto: product.id,
                            }, { 'Content-Type': 'application/json' })
                            if (response.ok) {
                                setResponsePopup({
                                    title: 'Producto eliminado con éxito',
                                    ok: response.ok
                                })
                            } else {
                                setResponsePopup({
                                    title: 'Error al eliminar el stock',
                                    ok: response.ok
                                })
                            }
                            setProduct({})
                            setRefresh(!refresh)
                            setDeletePopup(false)
                        }}
                        onCancel={() => setDeletePopup(false)}
                    />}
                    {editPopup ? (
                        <SweetAlert
                            showCancel
                            title={edit ? 'Editar producto' : `Editar stock de ${product.product}`}
                            cancelBtnBsStyle="danger"
                            confirmBtnBsStyle="success"
                            confirmBtnText="Aceptar"
                            cancelBtnText="Cancelar"
                            onConfirm={async () => {
                                if (edit) {
                                    const response = await put('api/products/editarProducto', {
                                        id: product.id,
                                        nombre: product.product,
                                        precio: product.price,
                                        id_tipo: product.category
                                    }, { 'Content-Type': 'application/json' })
                                    if (response.ok) {
                                        setResponsePopup({
                                            title: 'El producto se ha actualizado con éxito',
                                            ok: response.ok
                                        })
                                    } else {
                                        setResponsePopup({
                                            title: 'Error al actualizar el producto',
                                            ok: response.ok
                                        })
                                    }
                                } else {
                                    const response = await put('api/bodega/actualizarStockBodega', {
                                        id_producto: product.id,
                                        stock: product.stock
                                    }, { 'Content-Type': 'application/json' })
                                    if (response.ok) {
                                        setResponsePopup({
                                            title: 'Stock actualizado con éxito',
                                            ok: response.ok
                                        })
                                    } else {
                                        setResponsePopup({
                                            title: 'Error al actualizar el stock',
                                            ok: response.ok
                                        })
                                    }
                                }
                                setEditPopup(false)
                                setRefresh(!refresh)
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
                                                <select className="form-select" onChange={(value) => handleFormChange(value, 'category')}>
                                                    <option defaultValue>Seleccion una categoría</option>
                                                    {tipos.map(tipo => <option value={tipo.id} selected={tipo.id == product.category}>{tipo.tipo}</option>)}
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