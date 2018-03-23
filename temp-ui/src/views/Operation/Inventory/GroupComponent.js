import React, {Component} from 'react';
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

export default class GroupComponent extends Component {
    render() {
        if(this.props.active) {
        return (
            <Card>
                <CardHeader align="center">
                    <strong>GROUPS</strong>
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
                        <td><Button onClick={() => this.showVariables()} size="bg" color="gray"
                                    id="1"><b>Group1</b></Button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><Button onClick={() => this.showVariables()} size="bg" color="gray"
                                    id="1"> <b>Group2</b> </Button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><Button onClick={() => this.showVariables()} size="bg" color="gray"
                                    id="1"> <b>Group3</b> </Button></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </Card>
        )}else{
            return  (<div></div>)
        }
    }
}