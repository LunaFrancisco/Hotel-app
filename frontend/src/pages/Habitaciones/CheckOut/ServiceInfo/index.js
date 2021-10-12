import { useState, useContext } from 'react';
import {
    Row,
    Col,
    CardTitle,
} from "reactstrap";
import CardPromocion from '../../../../components/Common/CardPromocion'
import SummaryContext from '../SummaryContext'

export default () => {
    const { orderSummary, setOrderSummary } = useContext(SummaryContext)
    const [promotions, setPromotions] = useState([
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
            price: 3750,
            hours: 2,
            description: 'Esta promoción no incluye nada, POBRE!',
            included: []
        },
    ])

    const addPromotions = (promotion) => setOrderSummary({
        ...orderSummary,
        promotions: [...orderSummary.promotions, promotion]
    })

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
                orderSummary.promotions.map((promotion) => (<Col lg={4} sm={6}>
                    <CardPromocion
                        promotion={promotion}
                        addPromotions={addPromotions}
                        added={true}
                        active={true} />
                </Col>))
            }
        </Row>

        <CardTitle className="h4">
            Promociones pagadas
        </CardTitle>
        <p className="card-title-desc">
            Estas son las promociones que el cliente ya pagó
        </p>
        <Row>
            {
                [].map((promotion) => (<Col lg={4} sm={6}>
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