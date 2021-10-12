import { Fragment, useState } from "react"
import { Button, Row, Col, Label, Input } from 'reactstrap'
import Table from '../../../components/Common/InventarioTable'
import SweetAlert from "react-bootstrap-sweetalert";

export default () => {
    const [addPopup, setAddPopup] = useState(false)

    const timeFormat = (number) => number > 9 ? `${number}` : `0${number}`

    const data = Array(15).fill(null).map(item => ({
        amount: `$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`, id: Math.round(Math.round(Math.random() * 5014)),
        room: Math.round(Math.round(Math.random() * 32)),
        checkin_date: `${timeFormat(Math.round(Math.round(Math.random() * 31)))}-10-2021 ${timeFormat(Math.round(Math.round(Math.random() * 23)))}:${timeFormat(Math.round(Math.round(Math.random() * 59)))}`,
        transaction_date: `${timeFormat(Math.round(Math.round(Math.random() * 31)))}-10-2021 ${timeFormat(Math.round(Math.round(Math.random() * 23)))}:${timeFormat(Math.round(Math.round(Math.random() * 59)))}`,
        obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, perferendis. Nobis voluptate, assumenda quae magni reiciendis unde asperiores enim eum.'
    }))

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        // {
        //     dataField: 'room',
        //     text: 'N° Habitación',
        //     sort: true
        // },
        {
            dataField: 'checkin_date',
            text: 'Fecha de gasto',
            sort: true
        },
        // {
        //     dataField: 'transaction_date',
        //     text: 'Fecha de transacción',
        //     sort: true
        // },
        {
            dataField: 'amount',
            text: 'Monto',
            sort: true
        },
        {
            dataField: 'obs',
            text: 'Observación',
            sort: true
        },
    ];

    return (
        <Fragment>
            <div aria-label="Page navigation example" className="pagination-rounded position-absolute top-0 m-3" style={{ right: 0 }}>
                <Button onClick={() => setAddPopup(true)} color="success">Agregar gasto</Button>
            </div>
            <Table
                data={data}
                columns={columns}
            />
            {addPopup ? (
                <SweetAlert
                    showCancel
                    title="Añadir un gasto"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    confirmBtnText="Añadir"
                    cancelBtnText="Cancelar"
                    onConfirm={() => {

                    }}
                    onCancel={() => setAddPopup(false)}
                >
                    <Row>
                        <Col lg={12}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="fecha"
                                    className="form-label w-100"
                                    style={{ textAlign: 'left' }}
                                >
                                    Fecha
                                </Label>
                                <Input
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Ingrese la fecha del gasto"
                                />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-name"
                                    className="form-label w-100"
                                    style={{ textAlign: 'left' }}
                                >
                                    Monto
                                </Label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Ingrese el monto del gasto"
                                />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="billing-email-address"
                                    className="form-label w-100"
                                    style={{ textAlign: 'left' }}
                                >
                                    Observación
                                </Label>
                                <Input
                                    type="textarea"
                                    className="form-control"
                                    id="billing-email-address"
                                    placeholder="Ingrese una observación del gasto"
                                />
                            </div>
                        </Col>
                    </Row>
                </SweetAlert>
            ) : null
            }
        </Fragment>
    )
}