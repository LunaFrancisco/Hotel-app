import React, { Component } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

export default () => {
    const generateDummy = (length, max = 100000, min = 0) => Array(length).fill(null).map(item => Math.round((Math.random() * (max - min) + min)))
    const series = [
        {
            name: 'Caja',
            type: 'column',
            data: generateDummy(3)
        },
        {
            name: 'Ventas',
            type: 'line',
            data: generateDummy(3)
        },
        {
            name: 'Gastos',
            type: 'line',
            data: generateDummy(3)
        },
        {
            name: 'Retiros',
            type: 'line',
            data: generateDummy(3)
        },
    ]

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            }
        },
        stroke: {
            width: [0, 3, 3, 3],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
            },
        },
        dataLabels: {
            enabled: false,
        },

        legend: {
            show: true,
        },
        tooltip: {
            y: {
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    return `$ ${value.toLocaleString("es-CL")}`
                }
            }
        },
        colors: ['#5664d2', '#1cbb8c', '#ff3d60', '#fcb92c'],
        labels: ['Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    {/* <div className="float-end d-none d-md-inline-block">
                            <ButtonGroup className="mb-2">
                                <Button size="sm" color="light" type="button">Hoy</Button>
                                <Button size="sm" color="light" active type="button">Semanal</Button>
                                <Button size="sm" color="light" type="button">Mesnsual</Button>
                            </ButtonGroup>
                        </div> */}
                    <h4 className="card-title mb-4">Reporte de caja mensual</h4>
                    <div>
                        <div id="line-column-chart" className="apex-charts" dir="ltr">
                            <ReactApexChart options={options} series={series} type="line" height="280" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}