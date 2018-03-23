import React, { Component } from 'react';
import {
    Row,
    Col,
    Badge,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Table
} from 'reactstrap';


import Variables from './Variable';
import GroupComponent from "./GroupComponent";
import Styles from './GroupComponent.css'

class InventoryComp extends Component {
    constructor() {
        super();
        this.state = {
            childVisible: false,
            active: false
        }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.active
        }));
    }

    addEntry() {
        alert("To Add");
    }

    save() {
        alert("Saved");
    }

    showVariables(id) {
        this.setState({ childVisible: !this.state.childVisible });
    }

    showGroups() {
        this.setState({ childVisible: !this.state.childVisible });
    }

    showDetails() {
        this.state.active = true;
        console.log(this.state.active)
        this.handleToggleClick();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader align="center">
                                <strong>HOSTS</strong>
                            </CardHeader>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Button onClick={() => this.showDetails(this)} size="bg" color="gray" id="1"><b>Invader01</b></Button></td>
                                        <td><b>192.168.0.1</b></td>
                                    </tr>
                                    <tr>
                                        <td><Button onClick={() => this.showDetails(this)} size="bg" color="gray" id="2"> <b>Invader02</b> </Button></td>
                                        <td><b>192.168.0.2</b></td>
                                    </tr>
                                    <tr>
                                        <td><Button onClick={() => this.showDetails(this)} size="bg" color="gray" id="3"> <b>Invader03</b> </Button></td>
                                        <td><b>192.168.0.3</b></td>
                                    </tr>
                                    <tr align="center">
                                        <td colspan="2">
                                            <Button className="marginLeft10" onClick={() => this.showDetails()} size="bg" color="gray" id="1"> <b>+</b> </Button>
                                            <Button className="marginRight10" onClick={() => this.showDetails()} size="bg" color="gray" id="1"> <b>-</b> </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Variables active={this.state.active} />
                        <GroupComponent active={this.state.active} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InventoryComp;
