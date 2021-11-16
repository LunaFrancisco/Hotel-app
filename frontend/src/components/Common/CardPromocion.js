import React, { useState, useContext } from 'react';
import {
    Input,
    Card,
    Label,
    CardBody,
    CardTitle,
} from "reactstrap";

import { Link } from 'react-router-dom'
import classnames from 'classnames'
import SweetAlert from "react-bootstrap-sweetalert";
import Switch from 'react-switch'
import SummaryContext from '../../pages/Habitaciones/CheckOut/SummaryContext'

export default ({ inventario, active, added, addPromotions, promotion, paid }) => {
    const { setPaid } = useContext(SummaryContext)
    const [addPopup, setAddPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const { id, hours, price, description, included } = promotion
    const [beberages, setBeberages] = useState(Array(included.length).fill({}))
    const beberageChange = (idx, value) => {
        let temp = beberages
        temp[idx] = {
            id: value.target.id,
            value: inventario.find(item => item.id == value.target.value)
        }
        setBeberages(temp)
    }

    function DollarSymbol() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                <i className="ri-money-dollar-circle-line"></i>
            </div>
        );
    };

    const options = {
        1: inventario.filter(item => item.tipo_producto.tipo === 'Licores'),
        2: inventario.filter(item => item.tipo_producto.tipo === 'Bebida'),
    }

    console.log(paid)

    return <Card className={classnames("border rounded shipping-address", {
        'active': active
    })}>
        <CardBody>
            {
                !paid && <Link onClick={added ? () => setEditPopup(true) : () => setAddPopup(true)} to="#" className="float-end ms-1">
                    {
                        added ? 'Editar' : 'Añadir'
                    }
                </Link>
            }
            {
                (added && false) && <Switch
                    uncheckedIcon={<DollarSymbol />}
                    className="me-1 mb-sm-8 mb-2"
                    checkedIcon={<DollarSymbol />}
                    onColor="#38a4f8"
                    onChange={() => setPaid(id)}
                    checked={paid}
                />
            }
            <h5 className="font-size-14 mb-4">
                Promoción {hours} {hours > 1 ? `horas` : `hora`}
            </h5>

            <h5 className="font-size-14">
                ${price.toLocaleString("es-CL")}
            </h5>
            <p className="mb-1">
                {description}
            </p>
            {/* <p className="mb-0">Mo. 012-345-6789</p> */}
        </CardBody>
        {addPopup ? (
            <SweetAlert
                showCancel
                title="Escoger añadidos de la promoción"
                cancelBtnBsStyle="danger"
                confirmBtnBsStyle="success"
                confirmBtnText="Añadir"
                cancelBtnText="Cancelar"
                onConfirm={() => {
                    addPromotions({
                        ...promotion,
                        beberages
                    })
                    setAddPopup(false)
                }}
                onCancel={() => setAddPopup(false)}
            >
                {
                    included.map((item, idx) => (
                        <div className="my-2">
                            <CardTitle className="h4 mt-4">
                                Bebestible {idx + 1}
                            </CardTitle>
                            {
                                item.map(type => (
                                    <React.Fragment>
                                        <p className="card-title-desc mb-0 mt-2">
                                            {type.type}
                                        </p>
                                        <div className="mx-4">
                                            {
                                                options[type.id].map((option, sub_idx) => (
                                                    <div className="form-check">
                                                        <Input id={sub_idx} className="form-check-input" type="radio" name={`bebestible-${idx + 1}`} value={option.id} onChange={(value) => beberageChange(idx, value)} />
                                                        <Label className="form-check-label" id={sub_idx}>
                                                            {option.nombre}
                                                        </Label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    ))
                }
            </SweetAlert>
        ) : null
        }
    </Card >
}