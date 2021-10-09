import React, { useState } from 'react'
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
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
import img1 from "../../../assets/images/product/img-1.png";
import img6 from "../../../assets/images/product/img-6.png";

import ClientInfo from './ClientInfo/index'
import ServiceInfo from './ServiceInfo/index'

export default () => {
    const { id } = useParams();

    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: "Dashboard", link: "/" },
        { title: "Habitaciones", link: "/habitaciones" },
        { title: `Chekout`, link: "/#" },
    ])

    const [orderSummary, setOrderSummary] = useState([
        {
            id: 1,
            img: img1,
            productTitle: "Full sleeve T-shirt",
            price: 240,
            qty: 2,
        },
        {
            id: 2,
            img: img6,
            productTitle: "Half sleeve T-shirt",
            price: 225,
            qty: 1,
        },
    ])

    const [activeTab, setActiveTab] = useState(1)
    const [selectedGroup, setSelectedGroup] = useState(null)

    return <React.Fragment>
        <div className="page-content">
            <Container fluid>
                {/* Render Breadcrumb */}
                <Breadcrumbs
                    title="Chekout"
                    breadcrumbItems={breadcrumbItems}
                />

                <Row>
                    <Col lg="8">
                        <Card>
                            <CardBody>
                                <div
                                    id="checkout-nav-pills-wizard"
                                    className="twitter-bs-wizard"
                                >
                                    <Nav className="twitter-bs-wizard-nav" pills justified>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: activeTab === 1,
                                                })}
                                                onClick={() => {
                                                    setActiveTab(1);
                                                }}
                                            >
                                                <span className="step-number">01</span>
                                                <span className="step-title">Información del cliente</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: activeTab === 2,
                                                })}
                                                onClick={() => {
                                                    setActiveTab(2);
                                                }}
                                            >
                                                <span className="step-number">02</span>
                                                <span className="step-title">Servicio</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: activeTab === 3,
                                                })}
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                <span className="step-number">03</span>
                                                <span className="step-title">Métodos de pago</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent
                                        activeTab={activeTab}
                                        className="twitter-bs-wizard-tab-content"
                                    >
                                        <TabPane tabId={1}>
                                            <ClientInfo />
                                        </TabPane>
                                        <TabPane
                                            tabId={2}
                                            id="v-pills-payment"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-payment-tab"
                                        >
                                            <ServiceInfo />
                                        </TabPane>
                                        <TabPane tabId={3} id="v-pills-confir" role="tabpanel">
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
                                                                />

                                                                <div className="card-radio">
                                                                    <i className="fab fa-cc-mastercard font-size-24 align-middle me-2"></i>
                                                                    <span>Credit / Debit Card</span>
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
                                                                    id="pay-methodoption2"
                                                                    className="card-radio-input"
                                                                />

                                                                <div className="card-radio">
                                                                    <i className="fab fa-cc-paypal font-size-24 align-middle me-2"></i>
                                                                    <span>Paypal</span>
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
                                                                />

                                                                <div className="card-radio">
                                                                    <i className="far fa-money-bill-alt font-size-24 align-middle me-2"></i>
                                                                    <span>Cash on Delivery</span>
                                                                </div>
                                                            </Label>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <h5 className="my-3 font-size-14">
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
                                                </div>
                                                <div className="mt-4 text-end">
                                                    <Link to="#" className="btn btn-success">
                                                        Complete order
                                                    </Link>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                                        <li className={activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { setActiveTab(activeTab - 1); }}>Previous</Link></li>
                                        <li className={activeTab === 3 ? "next disabled" : "next"}><Link to="#" onClick={() => { setActiveTab(activeTab + 1); }}>Next</Link></li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card className="checkout-order-summary">
                            <CardBody>
                                <div className="p-3 bg-light mb-4">
                                    <h5 className="font-size-14 mb-0">
                                        Order Summary{" "}
                                        <span className="float-end ms-2">#SK2356</span>
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <Table className="align-middle mb-0 table-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ width: "110px" }} scope="col">
                                                    Product
                                                </th>
                                                <th scope="col">Product Desc</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderSummary.map((orderitem, key) => (
                                                <tr key={"_orderSummary_" + key}>
                                                    <th scope="row">
                                                        <img
                                                            src={orderitem.img}
                                                            alt="product-img"
                                                            title="product-img"
                                                            className="avatar-md"
                                                        />
                                                    </th>
                                                    <td>
                                                        <h5 className="font-size-14 text-truncate">
                                                            <Link
                                                                to="/ecommerce-product-details/1"
                                                                className="text-dark"
                                                            >
                                                                {orderitem.productTitle}{" "}
                                                            </Link>
                                                        </h5>
                                                        <p className="text-muted mb-0">
                                                            $ {orderitem.price} x {orderitem.qty}
                                                        </p>
                                                    </td>
                                                    <td>$ {orderitem.price * orderitem.qty}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="2">
                                                    <h6 className="m-0 text-end">Sub Total:</h6>
                                                </td>
                                                <td>$ 705</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    <div className="bg-soft-primary p-3 rounded">
                                                        <h5 className="font-size-14 text-primary mb-0">
                                                            <i className="fas fa-shipping-fast me-2" />{" "}
                                                            Shipping{" "}
                                                            <span className="float-end">Free</span>
                                                        </h5>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <h6 className="m-0 text-end">Total:</h6>
                                                </td>
                                                <td>$ 705</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </React.Fragment>
}