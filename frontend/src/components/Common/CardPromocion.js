import React, { useState, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Button,

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
import classnames from 'classnames'
import SweetAlert from "react-bootstrap-sweetalert";

export default ({ active, added, addPromotions, promotion, paid }) => {
    const [addPopup, setAddPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const { id, hours, price, description, included } = promotion

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
                    addPromotions(promotion)
                    setAddPopup(false)
                }
                }
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
                                                options[type.id].map(option => (
                                                    <div className="form-check">
                                                        <Input className="form-check-input" type="radio" name={`bebestible-${idx + 1}`} id="exampleRadios2" value="option2" />
                                                        <Label className="form-check-label" htmlFor="exampleRadios2">
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