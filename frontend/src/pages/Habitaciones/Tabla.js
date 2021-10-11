import React from 'react'
import {
    Row,
    Col,
    Table,
    Card,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap'
import img1 from "../../assets/images/small/img-1.jpg";
import Tooltip from '../../components/Common/Tooltip'
import CardHabitacion from '../../components/Common/CardHabitacion'

export default ({ rooms, onCheckout, onEnable }) => {
    const states = {
        1: 'Disponible',
        2: 'Ocupado',
        3: 'En limpieza'
    }
    return <Card>
        <CardBody>
            <CardTitle className="h4 mb-4">
                Listado de habitaciones
            </CardTitle>
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th data-priority="1">Estado</th>
                        <th data-priority="1">Pagado</th>
                        <th data-priority="1">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.length == 0 ? <tr>
                            <th colspan="3" className="text-center">No se han agregado habitaciones</th>
                        </tr> : rooms.map((room, idx) => <tr key={'room-' + idx}>
                            <th>{room.number}</th>
                            <td>{states[room.state]}</td>
                            <td>{room.state == 2 ? (room.paid ? 'Pagado' : 'No pagado') : 'N/A'}</td>
                            <td className="d-flex justify-content-center">
                                {
                                    room.state == 1 && <Tooltip id={'room-' + idx + '-add-button'} title="Reservar habitación">
                                        <Button type="button" onClick={() => onCheckout(room.id)} color="link" className="text-success">
                                            <i className="ri-add-fill"></i>
                                        </Button>
                                    </Tooltip>
                                }
                                {
                                    room.state == 2 && <React.Fragment>
                                        <Tooltip id={'room-' + idx + '-edit-button'} title="Editar reserva">
                                            <Button color="link" className="text-warning">
                                                <i className="ri-pencil-fill"></i>
                                            </Button>
                                        </Tooltip>

                                        <Tooltip id={'room-' + idx + '-cancel-button'} title="Cancelar Reserva">
                                            <Button color="link" className="text-danger">
                                                <i className="ri-delete-bin-5-fill"></i>
                                            </Button>
                                        </Tooltip>
                                    </React.Fragment>
                                }
                                {
                                    room.state == 3 && <React.Fragment>
                                        <Tooltip id={'room-' + idx + '-enable-button'} title="Habilitar habitación">
                                            <Button onClick={() => onEnable(room.id)} color="link" className="text-success">
                                                <i className="ri-refresh-fill"></i>
                                            </Button>
                                        </Tooltip>
                                    </React.Fragment>
                                }
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </CardBody>
    </Card>

}