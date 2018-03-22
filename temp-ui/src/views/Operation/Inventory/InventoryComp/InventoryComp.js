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


import Variables from '../Variable/Variable';
const records = 3;
class InventoryComp extends Component {

    addEntry() {
        alert("To Add");
    }

    save() {
        alert("Saved");
    }

    showVariables(id) {
        $('#addModal').modal('show');
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                                <Card>
                                    <CardHeader align="center">
                                        <strong >Hosts</strong>
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
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"><b>Invader01</b></Button></td>
                                            <td><b>192.168.0.1</b></td>
                                        </tr>
                                        <tr>
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>Invader01</b> </Button></td>
                                            <td><b>192.168.0.1</b></td>
                                        </tr>
                                        <tr>
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>Invader01</b> </Button></td>
                                            <td><b>192.168.0.1</b></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>+</b> </Button></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card>

                    </Col>
                    <Col xs="12" sm="6">
                        <Row>
                            <Col xs="12">
                                <Variables />
                            </Col>
                            <Col xs="8">
                                <Card>
                                    <CardHeader align="center">
                                        <strong >GROUPS</strong>
                                    </CardHeader>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"><b>Group1</b></Button></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>Group2</b> </Button></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>Group3</b> </Button></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><Button onClick={() => this.showVariables()} size="bg" color="gray" id="1"> <b>+</b> </Button></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InventoryComp;
