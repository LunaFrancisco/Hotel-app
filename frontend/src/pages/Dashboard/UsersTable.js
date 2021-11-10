import { Fragment, useState } from "react"
import { Button, Row, Col, Label, Input, Card, CardBody, CardTitle } from 'reactstrap'
import Table from '../../components/Common/InventarioTable'
import Tooltip from '../../components/Common/Tooltip'
import SweetAlert from "react-bootstrap-sweetalert";

export default () => {
    const [addPopup, setAddPopup] = useState(false)
    Array.prototype.sample = function () {
        return this[Math.floor(Math.random() * this.length)];
    }

    const [userForm, setUserForm] = useState({
        id: null,
        firstname: '',
        lastname: '',
        phone: '',
        rol: ''
    })

    const roles = ['Administrador', 'Cajero', 'Camarera']

    const acciones = (id) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={'user-' + id + '-edit-button'} title="Editar Usuario">
            <Button onClick={() => onEdit(id)} color="link" className="text-warning">
                <i className="ri-pencil-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'user-' + id + '-delete-button'} title="Eliminar Usuario">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

    const data = Array(12).fill(null).map((item, idx) => ({
        id: idx + 1,
        firstname: ['Fulano', 'Mengano', 'Juanito', 'Marcela', 'Marisol', 'Jose', 'Alberto'].sample(),
        lastname: ['DeTal', 'Rodriguez', 'Matamala', 'Oliveira', 'Castañeda', 'Araya'].sample(),
        phone: Array(8).fill(null).map(item => Math.round(Math.round(Math.random() * 9))).join(''),
        rol: roles.sample(),
        actions: acciones(idx + 1)
    }))

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'firstname',
            text: 'Nombre',
            sort: true
        },
        {
            dataField: 'lastname',
            text: 'Apellido',
            sort: true
        },
        {
            dataField: 'phone',
            text: 'Teléfono',
            sort: true
        },
        {
            dataField: 'rol',
            text: 'Rol',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Acciones',
            sort: true
        },
    ];

    const onEdit = (id) => {
        const user = data.find(item => item.id === id)
        setUserForm(user)
        setAddPopup(true)
    }

    const handleFormChange = (value, attr) => {
        setUserForm({
            ...userForm,
            [attr]: value.target.value
        })
    }

    return (
        <Card>
            <CardBody>
                <CardTitle className="h4">Usuarios</CardTitle>
                <p className="card-title-desc">
                    Listado de todas los usuarios registrados en la plataforma
                </p>
                <div aria-label="Page navigation example" className="pagination-rounded position-absolute top-0 m-3" style={{ right: 0 }}>
                    <Button onClick={() => setAddPopup(true)} color="success">Agregar usuario</Button>
                </div>
                <Table
                    data={data}
                    columns={columns}
                />
                {addPopup ? (
                    <SweetAlert
                        showCancel
                        title="Añadir un usuario"
                        cancelBtnBsStyle="danger"
                        confirmBtnBsStyle="success"
                        confirmBtnText="Añadir"
                        cancelBtnText="Cancelar"
                        onConfirm={() => {
                            setUserForm({
                                id: null,
                                firstname: '',
                                lastname: '',
                                phone: '',
                                rol: ''
                            })
                        }}
                        onCancel={() => setAddPopup(false)}
                    >
                        <Row>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="firstname"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Nombre
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del usuario"
                                        name="firstname"
                                        value={userForm.firstname}
                                        onChange={(value) => handleFormChange(value, 'firstname')}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="lastname"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Apellido
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="billing-name"
                                        name="lastname"
                                        placeholder="Ingrese el apellido del usuario"
                                        value={userForm.lastname}
                                        onChange={(value) => handleFormChange(value, 'lastname')}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="phone"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Teléfono
                                    </Label>
                                    <Input
                                        type="phone"
                                        className="form-control"
                                        placeholder="Ingrese el teléfono del usuario"
                                        name="phone"
                                        value={userForm.phone}
                                        onChange={(value) => handleFormChange(value, 'phone')}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="phone"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Rol
                                    </Label>
                                    <select className="form-select" name="rol" value={userForm.rol} onChange={(value) => handleFormChange(value, 'rol')}>
                                        <option defaultValue>Seleccion un rol</option>
                                        {
                                            roles.map(item => <option value={item}>{item}</option>)
                                        }
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </SweetAlert>
                ) : null
                }
            </CardBody>
        </Card>
    )
}