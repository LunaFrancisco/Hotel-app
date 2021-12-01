import { Fragment, useState, useEffect } from "react"
import { Button, Row, Col, Label, Input, Card, CardBody, CardTitle } from 'reactstrap'
import Table from '../../components/Common/InventarioTable'
import Tooltip from '../../components/Common/Tooltip'
import SweetAlert from "react-bootstrap-sweetalert";
import { get, post } from '../../api'

export default () => {
    const [addPopup, setAddPopup] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [responsePopup, setResponsePopup] = useState(null)
    Array.prototype.sample = function () {
        return this[Math.floor(Math.random() * this.length)];
    }

    const [userForm, setUserForm] = useState({
        id: null,
        firstname: '',
        lastname: '',
        phone: '',
        rut: '',
        email: '',
        direccion: '',
        password: '',
        rol: ''
    })

    const [data, setData] = useState([])

    useEffect(async () => {
        setData([])
        const users = await get('api/admin/verUsuarios')
        setData(users.msg.map((item, idx) => ({
            id: item.id,
            firstname: item.nombre,
            lastname: item.apellido,
            rut: item.rut,
            phone: item.telefono,
            email: item.correo,
            rol: item.roles[0].rol,
            actions: acciones(item.id)
        })))
        console.log(data)
    }, [refresh])

    const roles = ['Administrador', 'Cajero', 'Camarera']

    const acciones = (id) => <div className="d-flex justify-content-center" style={{ width: '50px' }}>
        <Tooltip id={'user-' + id + '-edit-button'} title="Editar Usuario">
            <Button onClick={() => { onEdit(id) }} color="link" className="text-warning">
                <i className="ri-pencil-fill"></i>
            </Button>
        </Tooltip>
        <Tooltip id={'user-' + id + '-delete-button'} title="Eliminar Usuario">
            <Button color="link" className="text-danger">
                <i className="ri-delete-bin-5-fill"></i>
            </Button>
        </Tooltip>
    </div>

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
            dataField: 'email',
            text: 'Correo',
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
        console.log(data)
        const user = data.find(item => item.id == id)
        setUserForm(({
            id: user.id,
            firstname: user.nombre,
            lastname: user.apellido,
            rut: user.rut,
            phone: user.telefono,
            email: user.correo,
            rol: user.roles[0].rol,
            actions: acciones(user.id + 1)
        }))
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
                {responsePopup != null && <SweetAlert
                    title={responsePopup.ok ? 'Éxito' : 'Error'}
                    type={responsePopup.ok ? 'success' : 'error'}
                    onConfirm={() => setResponsePopup(null)}
                >
                    {responsePopup.msg}
                </SweetAlert>}
                {addPopup ? (
                    <SweetAlert
                        showCancel
                        title="Añadir un usuario"
                        cancelBtnBsStyle="danger"
                        confirmBtnBsStyle="success"
                        confirmBtnText="Añadir"
                        cancelBtnText="Cancelar"
                        onConfirm={async () => {
                            const response = await post('api/auth/new', {
                                nombre: userForm.firstname,
                                apellido: userForm.lastname,
                                rut: userForm.rut,
                                telefono: userForm.phone,
                                correo: userForm.email,
                                direccion: userForm.direccion,
                                password: userForm.password,
                                rol: userForm.rol,
                            }, { 'Content-Type': 'application/json' })
                            setResponsePopup({
                                msg: response.errors ? <>{Object.keys(response.errors).map(item => <>- {response.errors[item].msg}<br /></>)}</> : response.msg,
                                ok: response.ok
                            })
                            setUserForm({
                                id: null,
                                firstname: '',
                                lastname: '',
                                phone: '',
                                rut: '',
                                email: '',
                                rol: ''
                            })
                            setAddPopup(false)
                            setRefresh(!refresh)
                        }}
                        onCancel={() => {
                            setUserForm({
                                id: null,
                                firstname: '',
                                lastname: '',
                                phone: '',
                                rut: '',
                                email: '',
                                rol: ''
                            })
                            setAddPopup(false)
                        }}
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
                                        htmlFor="rut"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Rut
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="billing-name"
                                        name="rut"
                                        pattern="^\d{7,8}[-][0-9kK]{1}$"
                                        placeholder="Ingrese el rut del usuario"
                                        value={userForm.rut}
                                        onChange={(value) => handleFormChange(value, 'rut')}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="rut"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Contraseña
                                    </Label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        id="billing-name"
                                        name="rut"
                                        placeholder="Ingrese el rut del usuario"
                                        value={userForm.password}
                                        onChange={(value) => handleFormChange(value, 'password')}
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
                                        htmlFor="email"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingrese el correo del usuario"
                                        name="email"
                                        value={userForm.email}
                                        onChange={(value) => handleFormChange(value, 'email')}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="direccion"
                                        className="form-label w-100"
                                        style={{ textAlign: 'left' }}
                                    >
                                        Dirección
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese el correo del usuario"
                                        name="direccion"
                                        value={userForm.direccion}
                                        onChange={(value) => handleFormChange(value, 'direccion')}
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
                                            roles.map((item, idx) => <option value={idx + 1}>{item}</option>)
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