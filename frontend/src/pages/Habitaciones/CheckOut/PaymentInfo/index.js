import { Fragment, useContext } from "react"
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
import SummaryContext from "../SummaryContext";

export default () => {
    const { payment, setPayment } = useContext(SummaryContext)
    const onChange = (el) => {
        setPayment(el.target.value)
    }


    return <Fragment>
        <CardTitle className="h5">Payment information</CardTitle>
        <p className="card-title-desc">It will be as simple as occidental in fact</p>
        <div>
            <h5 className="font-size-14">Payment method :</h5>

            <Row>
                <Col lg={4} sm={6}>
                    <div>
                        <Label className="form-label card-radio-label mb-3">
                            <Input
                                type="radio"
                                name="pay-method"
                                id="pay-methodoption1"
                                className="card-radio-input"
                                value="Efectivo"
                                onChange={onChange}
                            />

                            <div className="card-radio">
                                <i className="far fa-money-bill-alt font-size-24 align-middle me-2"></i>
                                <span>Efectivo</span>
                            </div>
                        </Label>
                    </div>
                </Col>

                <Col lg={4} sm={6}>
                    <div>
                        <Label className="form-label card-radio-label mb-3">
                            <Input
                                type="radio"
                                name="pay-method"
                                id="pay-methodoption3"
                                className="card-radio-input"
                                value="Tarjeta de Crédito / Débito"
                                onChange={onChange}
                            />

                            <div className="card-radio">
                                <i className="fab fa-cc-mastercard font-size-24 align-middle me-2"></i>
                                <span>Tarjeta de Crédito / Débito</span>
                            </div>
                        </Label>
                    </div>
                </Col>

                {/* <Col lg={4} sm={6}>
                    <div>
                        <Label className="form-label card-radio-label mb-3">
                            <Input
                                type="radio"
                                name="pay-method"
                                id="pay-methodoption2"
                                className="card-radio-input"
                            />

                            <div className="card-radio">
                                <i className="fab fa-cc-paypal font-size-24 align-middle me-2"></i>
                                <span>Paypal</span>
                            </div>
                        </Label>
                    </div>
                </Col> */}
            </Row>

            {/* <h5 className="my-3 font-size-14">
                For card Payment
            </h5>
            <div className="p-4 border">
                <form>
                    <div className="mb-3">
                        <Label
                            className="form-label"
                            for="cardnameInput"
                        >
                            Name on card
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cardnameInput"
                            placeholder="Name on Card"
                        />
                    </div>

                    <div className="row">
                        <Col lg={4} sm={6}>
                            <div className="mb-3 mb-lg-0">
                                <Label
                                    className="form-label"
                                    for="cardnumberInput"
                                >
                                    Card Number
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="cardnumberInput"
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>
                        </Col>
                        <Col lg={4} sm={6}>
                            <div className="mb-3 mb-lg-0">
                                <Label
                                    className="form-label"
                                    for="expirydateInput"
                                >
                                    Expiry date
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="expirydateInput"
                                    placeholder="MM/YY"
                                />
                            </div>
                        </Col>
                        <Col lg={4} sm={6}>
                            <div className="mb-3 mb-lg-0">
                                <Label
                                    className="form-label"
                                    for="cvvcodeInput"
                                >
                                    CVV Code
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="cvvcodeInput"
                                    placeholder="Enter CVV Code"
                                />
                            </div>
                        </Col>
                    </div>
                </form>
            </div> */}
            <div className="mt-4 text-end">
                <Link to="#" className="btn btn-success">
                    Completar reserva
                </Link>
            </div>
        </div>
    </Fragment>
}