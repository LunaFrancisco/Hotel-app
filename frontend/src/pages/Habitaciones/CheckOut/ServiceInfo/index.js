import React, { useState } from 'react';
import {
    Container,
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

export default () => {
    const [promotions, setPromotions] = useState([
        {
            price: 5500,
            hours: 5,
            description: 'Esta promoción include 2 bebidas',
            included: [
                [
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ],
                [
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ]
            ]
        },
        {
            price: 8500,
            hours: 6,
            description: 'Esta promoción include 2 tragos',
            included: [
                [
                    {
                        id: 1,
                        type: 'Trago',
                    },
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ],
                [
                    {
                        id: 1,
                        type: 'Trago',
                    },
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ]
            ]
        },
        {
            price: 10000,
            hours: 10,
            description: 'Esta promoción include 2 tragos y es de 10 horas, así que afirmate cabrito!',
            included: [
                [
                    {
                        id: 1,
                        type: 'Trago',
                    },
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ],
                [
                    {
                        id: 1,
                        type: 'Trago',
                    },
                    {
                        id: 2,
                        type: 'Bebida',
                    }
                ]
            ]
        },
        {
            price: 3750,
            hours: 2,
            description: 'Esta promoción no incluye nada, POBRE!',
            included: []
        },
    ])

    const [addedPromotions, setAddedPromotions] = useState([])

    const addPromotions = (promotion) => setAddedPromotions([...addedPromotions, promotion])

    return <div>
        <CardTitle className="h4">
            Añadir promociones
        </CardTitle>
        <p className="card-title-desc">
            Estas son las promociones disponibles para añadir
        </p>
        <Row>
            {
                promotions.map((promotion) => (<Col lg={4} sm={6}>
                    <CardPromocion
                        promotion={promotion}
                        added={false}
                        addPromotions={addPromotions}
                        active={false} />
                </Col>))
            }
        </Row>

        <CardTitle className="h4">
            Promociones añadidas
        </CardTitle>
        <p className="card-title-desc">
            Estas son las promociones que el cliente ya ha añadido
        </p>
        <Row>
            {
                addedPromotions.map((promotion) => (<Col lg={4} sm={6}>
                    <CardPromocion
                        promotion={promotion}
                        addPromotions={addPromotions}
                        added={true}
                        active={true} />
                </Col>))
            }
        </Row>
    </div>
}