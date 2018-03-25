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
import {ServerAPI, Host, Group} from '../../../ServerAPI'

/*
class Host {
    constructor(hName, hType) {
        this.hName = hName;
        this.IPAddress = "";
        this.invaderPort = "";
        this.type = hType;
        this.variables = {};

*/
class InventoryComp extends Component {
    constructor(props) {
        super(props);
        let server = ServerAPI.DefaultServer();

        this.state = {
            childVisible: false,
            active: false,
            hosts: server.allHosts,
            groups: server.allGroups,
            selectedHost: "",
        };
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

    showDetails(hostName) {
        console.log("HOST SLEECTED:::" + hostName);
        let host = this.state.hosts[hostName];
        this.setState({
            selectedHost: host,
            active: true,
        });
        this.handleToggleClick();
    }
    
    renderHosts() {
        let retHTML = [];
        let index = 0;
        for (let hostName in this.state.hosts) {
            let host = this.state.hosts[hostName];
            let hostId = hostName.trim() + "_" + host.IPAddress.trim();
            if (host.type > 0) { //Host.OTHER
                let bgColor = index % 2 ? 'rgb(237,237,237)': '';
                retHTML.push(
                  <CardBody id={hostId} style={{height:'50px', background:bgColor}} onClick={() => this.showDetails(hostName)}>
                    <strong>{hostName}</strong> : {host.IPAddress}
                  </CardBody>
                );
                index++;
            } 
        }
        return retHTML;
    }

    render() {
        let hostVariables = (this.state.selectedHost !== undefined) ? this.state.selectedHost.variables : null;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Hosts</strong>
                            </CardHeader>
                            <div style={{height:'300px', overflowY:'scroll'}}>
                            {this.renderHosts()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Variables active={this.state.active} hostVariables={hostVariables}/>
                        <GroupComponent active={this.state.active} host={this.state.selectedHost} groups={this.state.groups}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

/*
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
*/

export default InventoryComp;
