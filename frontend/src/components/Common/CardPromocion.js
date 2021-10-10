import React, { useState, useContext, useEffect } from 'react';
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

export default ({ active, added, addPromotions, promotion, paid }) => {
    const [addPopup, setAddPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const { id, hours, price, description, included } = promotion
    const [beberages, setBeberages] = useState(Array(included.length).fill({}))
    const beberageChange = (idx, value) => {
        console.log(idx, value)
        let temp = beberages
        temp[idx] = {
            id: value.target.id,
            value: value.target.value
        }
        setBeberages(temp)
        console.log(temp)
    }

    const options = {
        1: [
            'Ron Cola',
            'Piscola',
            'Pisco Sour',
            'Gin Con Gin',
            'Primavera',
            'Martini',
            'Whisky',
        ],
        2: [
            'Coca Cola',
            'Fanta',
            'Sprite',
            'Ginger Ale',
        ]
    }

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
                                                        <Input id={sub_idx} className="form-check-input" type="radio" name={`bebestible-${idx + 1}`} value={option} onChange={(value) => beberageChange(idx, value)} />
                                                        <Label className="form-check-label" id={sub_idx}>
                                                            {option}
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