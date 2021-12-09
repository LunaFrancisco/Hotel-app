import { Badge } from "reactstrap"
import React, { Component, useState, useEffect } from "react"
import { timeFormat, moneyFormat, dateFormat } from "../../../helpers/formatters";
import { get } from "../../../api";

import Table from '../../../components/Common/InventarioTable'

export default () => {
    const [data, setData] = useState([]);
    const renderState = (state) => {
        const color = {
            1: 'bg-warning',
            2: 'bg-danger',
            3: 'bg-success',
        }

        const label = {
            1: 'Pendiente',
            2: 'Cancelado',
            3: 'Pagado',
        }

        return <Badge className={`${color[state]} me-1`}>{label[state]}</Badge>
    }

    useEffect(() => {
        get('api/registros/getVentasTurno').then(res => {
            setData(res.allRegistros.map(item => ({
                ...item,
                id_habitacion: item.id_habitacion || '-',
                estado: renderState(1),
                monto: item.monto ? moneyFormat(item.monto) : '-',
                fecha: item.fecha ? dateFormat(new Date(item.fecha)) : '-',
                fecha_entrada: item.fecha_entrada ? dateFormat(new Date(item.fecha_entrada)) : '-',
                usuario: item.usuario.nombre + ' ' + item.usuario.apellido,
            })))
        })
    }, [])

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'usuario',
            text: 'Usuario',
            sort: true
        },
        {
            dataField: 'id_habitacion',
            text: 'N° Habitación',
            sort: true
        },
        {
            dataField: 'fecha_entrada',
            text: 'Fecha de entrada',
            sort: true
        },
        {
            dataField: 'fecha',
            text: 'Fecha de transacción',
            sort: true
        },
        {
            dataField: 'monto',
            text: 'Monto',
            sort: true
        },
        {
            dataField: 'observacion',
            text: 'Observación',
            sort: true
        },
    ];

    return (
        <Table
            data={data}
            columns={columns}
            order="desc"
        />
    )
}