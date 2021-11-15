import React, { Component, useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, Input, Label } from "reactstrap"
import Tooltip from "../../components/Common/Tooltip";
import SweetAlert from "react-bootstrap-sweetalert";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Table from '../../components/Common/InventarioTable'
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
        price: '',
    })

    const breadcrumbItems = [
        { title: "Inventario", link: "#" },
    ]

    const onAddProduct = async () => {
        const response = await get('api/bodega/getBodega')
        setBodega(response.msg)
        setAddPopup(true)
    }

    const onEdit = (item, isEdit = false) => {
        setProduct({
            ...item,
            id: item.id,
            price: item.precio,
            product: item.nombre,
            stock: item.inventario.cantidad,
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
        const response = await get('api/inventario/getInventario')

        const map_products = (item) => ({
            id: item.id,
            price: `$ ${item.precio.toLocaleString("es-CL")}`,
            product: item.nombre,
            stock: item.inventario.cantidad,
            actions: acciones(item)
        })

        setData({
            licores: response.inventario.filter(item => item.tipo_producto.tipo === 'licores').map(map_products),
            bebidas: response.inventario.filter(item => item.tipo_producto.tipo === 'bebida').map(map_products),
            comida: response.inventario.filter(item => item.tipo_producto.tipo === 'comida').map(map_products),
            ropa: response.inventario.filter(item => item.tipo_producto.tipo === 'ropa').map(map_products),
            utencilios: response.inventario.filter(item => item.tipo_producto.tipo === 'utencilios').map(map_products),
            otros: response.inventario.filter(item => item.tipo_producto.tipo === 'otros').map(map_products),
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
                            <Button onClick={onAddProduct} color="success">Traer producto de bodega</Button>
                        </div>
                    </div>
                    {addPopup ? (
                        <SweetAlert
                            showCancel
                            title="Traer producto de bodega"
                            cancelBtnBsStyle="danger"
                            confirmBtnBsStyle="success"
                            confirmBtnText="Añadir"
                            cancelBtnText="Cancelar"
                            onConfirm={async () => {
                                const response = await post('api/inventario/crearProductoInventario', {
                                    id: product.id,
                                    cantidad: product.stock
                                }, { 'Content-Type': 'application/json' })
                                if (response.ok) {
                                    setResponsePopup({
                                        title: 'Producto agregado con éxito',
                                        ok: response.ok
                                    })
                                } else {
                                    setResponsePopup({
                                        title: 'Error al agregar el producto',
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
                                        <select className="form-select" onChange={(value) => handleFormChange(value, 'id')}>
                                            <option defaultValue>Seleccion un producto</option>
                                            {bodega.map(item => <option value={item.id} selected={item.id == product.id}>{item.nombre}</option>)}
                                        </select>
                                    </div>
                                </Col>
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
                    <Row>
                        <Col className="col-6">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Licores</CardTitle>
                                    <p className="card-title-desc">
                                        licores listados para inventario.
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
                                    const response = await put('api/inventario/actualizarStockInventario', {
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