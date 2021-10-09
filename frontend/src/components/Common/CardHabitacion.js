import React from 'react'
import {
    CardBody,
    Card,
    CardTitle,
    CardImg,
    CardText,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

export default ({ img, room: { paid, state, number, id }, onCheckout }) => {
    const states = {
        1: 'bg-color-success',
        2: 'bg-color-warning',
        3: 'bg-color-danger'
    }

    const innerStates = state != 2 ? states[state].replace('bg', 'border') : (paid ? 'border-color-success' : 'border-color-danger')

    const ButtonHabitacion = ({ children, color, onClick }) => {
        return <Button
            style={{
                // height: 20,
                // width: 40,
            }}
            color={color}
            onClick={onClick}
            className="waves-effect waves-light me-1 my-2"
        >
            {children}
        </Button>
    }

    return <Card style={{ height: 200 }} className={states[state]}>
        <CardBody>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'middle', paddingBottom: 66, height: '100%' }}>
                <div className={innerStates} style={{
                    height: 95,
                    width: 95,
                    borderRadius: '100%',
                    borderWidth: 10,
                    borderStyle: 'solid',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <h2 style={{ alignSelf: 'center' }}>
                        {number}
                    </h2>
                </div>
            </div>
            <div style={{
                borderBottomLeftRadius: '0.25rem',
                borderBottomRightRadius: '0.25rem',
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 65,
                backgroundColor: 'white',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}>
                {
                    state == 1 && <ButtonHabitacion onClick={() => onCheckout(id)} color="success">
                        <i className="ri-add-fill"></i>
                    </ButtonHabitacion>
                }
                {
                    state == 2 && <React.Fragment>
                        <ButtonHabitacion color="warning">
                            <i className="ri-pencil-fill"></i>
                        </ButtonHabitacion>

                        <ButtonHabitacion color="danger">
                            <i className="ri-delete-bin-5-fill"></i>
                        </ButtonHabitacion>
                    </React.Fragment>
                }
                {
                    state == 3 && <React.Fragment>
                        <ButtonHabitacion color="success">
                            <i className="ri-refresh-fill"></i>
                        </ButtonHabitacion>
                    </React.Fragment>
                }
            </div>
        </CardBody>
    </Card>
}