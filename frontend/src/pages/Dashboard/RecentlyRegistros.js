import { useState } from "react";
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

export default () => {
    const [menu, setMenu] = useState(false)
    const timeFormat = (number) => number > 9 ? `${number}` : `0${number}`
    const registros = Array(25).fill(null).map(() => ({
        date: `${timeFormat(Math.round(Math.round(Math.random() * 24)) + 1)}-${timeFormat(Math.round(Math.round(Math.random() * 11)) + 1)}-2021`,
        time: `${timeFormat(Math.round(Math.round(Math.random() * 23)))}:${timeFormat(Math.round(Math.round(Math.random() * 59)))}`,
        obs: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime dolore dicta, possimus quidem perspiciatis doloremque quisquam in quis sed.'
    }))

    return <Card>
        <CardBody>
            {/* <Dropdown className="float-end" isOpen={menu} toggle={() => setMenu(!menu)}>
                <DropdownToggle tag="i" className="darrow-none card-drop" aria-expanded="false">
                    <i className="mdi mdi-dots-vertical"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <DropdownItem href="">Sales Report</DropdownItem>

                    <DropdownItem href="">Export Report</DropdownItem>

                    <DropdownItem href="">Profit</DropdownItem>

                    <DropdownItem href="">Action</DropdownItem>
                </DropdownMenu>
            </Dropdown> */}

            <h4 className="card-title mb-4">Registros recientes</h4>

            <SimpleBar style={{ maxHeight: 600 }}>
                <ul className="list-unstyled activity-wid">
                    {
                        registros.map(item => (
                            <li className="activity-list">
                                <div className="activity-icon avatar-xs">
                                    <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                        <i className="ri-edit-2-fill"></i>
                                    </span>
                                </div>
                                <div>
                                    <div>
                                        <h5 className="font-size-13">{item.date} <small className="text-muted">{item.time}</small></h5>
                                    </div>

                                    <div>
                                        <p className="text-muted mb-0">{item.obs}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </SimpleBar>
        </CardBody>
    </Card>
}