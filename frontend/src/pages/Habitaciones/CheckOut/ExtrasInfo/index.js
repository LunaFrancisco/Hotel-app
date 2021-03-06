import { useState, useContext, useEffect } from 'react';
import {
    Button,
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
import { Link } from 'react-router-dom'
import CardPromocion from '../../../../components/Common/CardPromocion'
import Select from "react-select";
import SummaryContext from '../SummaryContext'
import { get } from '../../../../api'

export default ({ inventario }) => {
    const { orderSummary, setOrderSummary } = useContext(SummaryContext)
    const selectValue = null
    const [extras, setExtras] = useState([])

    useEffect(async () => {
        const map_products = (item) => ({
            id: item.id,
            price: item.precio,
            nombre: item.nombre,
            label: `${item.nombre} ($${item.precio})`,
            // label: `${item.nombre} ($${item.precio}) - ${item.inventario.cantidad} unidad${item.inventario.cantidad == 1 ? '' : 'es'} en inventario`,
            stock: item.inventario.cantidad,
        })

        setExtras([
            {
                label: 'Licores',
                options: inventario.filter(item => item.tipo_producto.tipo === 'Licores').map(map_products)
            },
            {
                label: 'Bebida',
                options: inventario.filter(item => item.tipo_producto.tipo === 'Bebida').map(map_products)
            },
            {
                label: 'Comida',
                options: inventario.filter(item => item.tipo_producto.tipo === 'Comida').map(map_products)
            },
            {
                label: 'Otros',
                options: inventario.filter(item => item.tipo_producto.tipo === 'Otros').map(map_products)
            },
        ])
    }, [inventario])

    const addExtra = (value) => {
        if (value) {
            setOrderSummary({
                ...orderSummary,
                extras: [...orderSummary.extras, value]
            })
        }
    }

    const removeExtra = (value) => {
        setOrderSummary({
            ...orderSummary,
            extras: orderSummary.extras.filter((item, idx) => idx != value)
        })
    }

    return <div>
        <CardTitle className="h4">
            A??adir extras
        </CardTitle>
        <p className="card-title-desc">
            Estas son los extras para a??adir
        </p>
        <Row>
            <Col lg="12">
                <div className="mb-4">
                    {/* <Label className="form-label">Seleccione un extra</Label> */}
                    <Select
                        value={selectValue}
                        onChange={(value) => addExtra(value)}
                        options={extras}
                        placeholder="Seleccione un extra"
                        classNamePrefix="select2-selection"
                    />

                </div>
            </Col>
        </Row>

        <CardTitle className="h4">
            Extras a??adidos
        </CardTitle>
        <p className="card-title-desc">
            Estas son los extras que el cliente ya ha a??adido
        </p>
        <Table id="tech-companies-1" striped bordered responsive>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th data-priority="1">Precio</th>
                    <th data-priority="1" width="20px">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderSummary.extras.length == 0 ? <tr>
                        <th colspan="3" className="text-center">No se han agregado productos extras</th>
                    </tr> : orderSummary.extras.map((product, idx) => <tr key={'extra-' + idx}>
                        <th>{product.label}</th>
                        <td>$ {product.price.toLocaleString('es-CL')}</td>
                        <td className="d-flex justify-content-center">
                            <Button className="text-danger" color="link" onClick={() => removeExtra(idx)}>
                                <i className="ri-delete-bin-5-fill"></i>
                            </Button>
                        </td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>
}