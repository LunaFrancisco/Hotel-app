import { useState } from 'react'
import { Row, Button } from 'reactstrap'
import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Cuadricula from "./Cuadricula";
import Tabla from "./Tabla";
import MiniWidgets from "../../components/Common/MiniWidgets";

export default () => {
    const breadcrumbItems = [
        { title: "Habitaciones", link: "#" },
    ]
    const history = useHistory();

    const [view, setView] = useState(1)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [currentFilter, setCurrentFilter] = useState(null)
    const [rerender, setRerender] = useState(false);

    const states = [
        {
            id: 1,
            state: 'Disponible'
        },
        {
            id: 2,
            state: 'Ocupado'
        },
        {
            id: 3,
            state: 'En limpieza'
        },
    ]

    const [rooms, setRooms] = useState([
        {
            id: 1,
            number: 1,
            state: 1,
            paid: true
        },
        {
            id: 2,
            number: 2,
            state: 2,
            paid: true
        },
        {
            id: 3,
            number: 3,
            state: 2,
            paid: false
        },
        {
            id: 4,
            number: 4,
            state: 3,
            paid: true
        },
    ])

    const onCheckout = (id) => {
        history.push(`/habitaciones/${id}/check-out`)
    }

    const onEnable = (id) => {
        const temp = rooms
        const idx = temp.findIndex(item => item.id === id)
        temp[idx] = {
            ...temp[idx],
            state: 1,
            paid: false,
        }
        setRooms(temp)

        setRerender(!rerender)
    }

    return <div className="page-content">
        <Container fluid>
            <Breadcrumbs
                title="Habitaciones"
                breadcrumbItems={breadcrumbItems}
            />

            <Row>
                <MiniWidgets
                    title="Disponibles"
                    value={`${Math.round(Math.random() * 32).toLocaleString("es-CL")}`}
                    icon={
                        <Button color="success" style={{ pointerEvents: 'none', height: 50, width: 50 }}></Button>
                    }
                    rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                    desc="Desde el turno anterior"
                />
                <MiniWidgets
                    title="Ocupado"
                    value={`${Math.round(Math.random() * 32).toLocaleString("es-CL")}`}
                    icon={
                        <Button color="warning" style={{ pointerEvents: 'none', height: 50, width: 50 }}></Button>
                    }
                    rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                    desc="Desde el turno anterior"
                />
                <MiniWidgets
                    title="En limpieza"
                    value={`${Math.round(Math.random() * 32).toLocaleString("es-CL")}`}
                    icon={
                        <Button color="danger" style={{ pointerEvents: 'none', height: 50, width: 50 }}></Button>
                    }
                    rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                    desc="Desde el turno anterior"
                    negative
                />
            </Row>

            <div className="position-relative" style={{ height: 50 }}>
                <Pagination aria-label="Page navigation example" className="pagination-rounded position-absolute left-0 top-0" style={{ gap: 10 }}>
                    <PaginationItem onClick={() => setView(1)} active={view === 1}><PaginationLink href="#">Tabla</PaginationLink></PaginationItem>
                    <PaginationItem onClick={() => setView(2)} active={view === 2}><PaginationLink href="#">Cuadrícula</PaginationLink></PaginationItem>
                </Pagination>
                <div aria-label="Page navigation example" className="pagination-rounded position-absolute top-0" style={{ right: 0 }}>
                    <Dropdown
                        isOpen={dropdownOpen}
                        direction="left"
                        toggle={() =>
                            setDropdownOpen(!dropdownOpen)
                        }
                    >
                        <DropdownToggle color="light" caret>
                            Filtro: {currentFilter == null ? 'Todo' : states.find(item => item.id === currentFilter).state}
                            <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => setCurrentFilter(null)}
                                active={currentFilter === null}>
                                Todo
                            </DropdownItem>
                            {
                                states.map(state => (
                                    <DropdownItem
                                        key={`dropdown-item-${state.id}`}
                                        onClick={() => setCurrentFilter(state.id)}
                                        active={state.id === currentFilter}>
                                        {state.state}
                                    </DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {
                view === 1 ?
                    <Tabla
                        rooms={rooms.filter(item => currentFilter === null || currentFilter === item.state)}
                        onCheckout={onCheckout}
                        onEnable={onEnable} />
                    : <Cuadricula
                        rooms={rooms.filter(item => currentFilter === null || currentFilter === item.state)}
                        onCheckout={onCheckout}
                        onEnable={onEnable} />
            }
        </Container>
    </div>
}