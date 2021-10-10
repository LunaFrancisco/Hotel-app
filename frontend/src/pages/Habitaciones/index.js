import { useState } from 'react'
import {
    Button,
    Col,
    CardBody,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    Input,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Card,
    CardTitle,
    CardImg,
    CardText,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardHabitacion from "../../components/Common/CardHabitacion";
import Cuadricula from "./Cuadricula";
import Tabla from "./Tabla";

export default () => {
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: "Dashboard", link: "/" },
        { title: "Habitaciones", link: "#" },
    ])
    const history = useHistory();

    const [view, setView] = useState(1)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [currentFilter, setCurrentFilter] = useState(null)
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

    return <div className="page-content">
        <Container fluid>
            <Breadcrumbs
                title="Habitaciones"
                breadcrumbItems={breadcrumbItems}
            />
            <div className="position-relative" style={{ height: 50 }}>
                <Pagination aria-label="Page navigation example" className="pagination-rounded position-absolute left-0 top-0" style={{ gap: 10 }}>
                    <PaginationItem onClick={() => setView(1)} active={view == 1}><PaginationLink href="#">Cuadrícula</PaginationLink></PaginationItem>
                    <PaginationItem onClick={() => setView(2)} active={view == 2}><PaginationLink href="#">Tabla</PaginationLink></PaginationItem>
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
                            Filtrar{" "}
                            <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => setCurrentFilter(null)}
                                active={currentFilter == null}>
                                Todo
                            </DropdownItem>
                            {
                                states.map(state => (
                                    <DropdownItem
                                        onClick={() => setCurrentFilter(state.id)}
                                        active={state.id == currentFilter}>
                                        {state.state}
                                    </DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {
                view == 1 ?
                    <Cuadricula rooms={rooms.filter(item => currentFilter == null || currentFilter == item.state)} onCheckout={onCheckout} />
                    : <Tabla rooms={rooms.filter(item => currentFilter == null || currentFilter == item.state)} onCheckout={onCheckout} />
            }
        </Container>
    </div>
}