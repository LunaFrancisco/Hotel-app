import React from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap'
import Tooltip from '../../components/Common/Tooltip'
import Table from '../../components/Common/InventarioTable'

export default ({ rooms, onCheckout, onEnable }) => {
    const states = {
        1: 'Disponible',
        2: 'Ocupado',
        3: 'En limpieza'
    }

    const renderActions = (room, idx) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        {
            room.state === 1 && <Tooltip id={'room-' + idx + '-add-button'} title="Reservar habitación">
                <Button type="button" onClick={() => onCheckout(room.id)} color="link" className="text-success">
                    <i className="ri-add-fill"></i>
                </Button>
            </Tooltip>
        }
        {
            room.state === 2 && <React.Fragment>
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
            room.state === 3 && <React.Fragment>
                <Tooltip id={'room-' + idx + '-enable-button'} title="Habilitar habitación">
                    <Button onClick={() => onEnable(room.id)} color="link" className="text-success">
                        <i className="ri-refresh-fill"></i>
                    </Button>
                </Tooltip>
            </React.Fragment>
        }
    </div>

    const data = rooms.map((item, idx) => ({
        ...item,
        checkin_time: `${Math.round(Math.round(Math.random() * 31))}-10-2021 ${Math.round(Math.round(Math.random() * 23))}:${Math.round(Math.round(Math.random() * 59))}`,
        checkout_time: `${Math.round(Math.round(Math.random() * 31))}-10-2021 ${Math.round(Math.round(Math.random() * 23))}:${Math.round(Math.round(Math.random() * 59))}`,
        actions: renderActions(item, idx)
    }))

    const columns = [
        {
            dataField: 'number',
            text: 'Número',
            sort: true,
        },
        {
            dataField: 'state',
            text: 'Estado',
            sort: true
        },
        {
            dataField: 'paid',
            text: 'Pagado',
            sort: true
        },
        {
            dataField: 'checkin_time',
            text: 'Hora de entrada',
            sort: true
        },
        {
            dataField: 'checkout_time',
            text: 'Hora de salida',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Acciones',
            sort: true
        }
    ];

    return <Card>
        <CardBody>
            <CardTitle className="h4 mb-4">
                Listado de habitaciones
            </CardTitle>
            <p className="card-title-desc">
                Listado de todas las habitaciones.
            </p>
            <Table
                data={data}
                columns={columns}
            />
        </CardBody>
    </Card>

}