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
    Modal,
    Table
} from 'reactstrap';


import VariableComponent from './VariableComponent';
import GroupComponent from "./GroupComponent";
import { ServerAPI, Host, Group } from '../../../ServerAPI';

class InventoryComponent extends Component {
    constructor(props) {
        super(props);
        let server = ServerAPI.DefaultServer();

        this.state = {
            childVisible: false,
            active: false,
            hosts: server.allHosts,
            groups: server.allGroups,
            selectedGroups: {},
            selectedHost: "",
            selectedHostDivId: "",
            show: false,
            isOpen: false,
            hostName: "",
            hostIP: ""
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
    
    calculateSelectedGroups(host) {
        if (host === undefined ||
            host === "")
            return {};

        let selectedGroups = {};
        let hostName = host.hName;
        if (hostName !== undefined) {
            for (let groupName in this.state.groups) {
                let group = this.state.groups[groupName];
                if (hostName in group.hosts) {
                    selectedGroups[groupName] = groupName;
                }
            }
        }
        return selectedGroups;
    }

    showDetails(event, hostName) {
        let host = this.state.hosts[hostName];
        let selElement = event.currentTarget;
        let selGroups = this.calculateSelectedGroups(host);
        if (!this.state.active) {  // No previous Selection
            selElement.setAttribute("style", "background-color:rgb(189,189,189)");
            this.setState({
                selectedHost: host,
                selectedHostDivId: selElement.id,
                active: true, 
                selectedGroups: selGroups,
            });
        } else {
            let prevName = this.state.selectedHostDivId;
            let prevSelElement = document.getElementById(prevName);
            let selIndex = parseInt(prevSelElement.getAttribute("pbindex"));
            let bgColor = "background-color:" + ((selIndex % 2) ? 'rgb(255,255,255)': 'rgb(227,227,227)');
            prevSelElement.setAttribute("style", bgColor);
            if (this.state.selectedHost.hName === hostName) {   // Same host selected as prev.. Or de-selected
                this.setState({
                    selectedHost: "",
                    selectedHostDivId: "",
                    active: false,
                    selectedGroups: {},
                });
            } else {
                selElement.setAttribute("style", "background-color:rgb(189,189,189)");
                this.setState({
                    selectedHost: host,
                    selectedHostDivId: selElement.id,
                    active: true, 
                    selectedGroups: selGroups,
                });
            }
        }
    }

    addHost() {
        alert("Placeholder for addHost()");
    }

    removeHost(event,hostName) {
        event.stopPropagation();
        alert("removed host : "+hostName);
    }
    
    // Callback function where Child (VariableComponent) Changes a varible,
    // then makes a callback to parent to update new variables.
    handleSetVariables(variables) {
        this.state.selectedHost.variables = variables;

        let server = ServerAPI.DefaultServer();
        server.updateHostVariables(this.updateHostEntries, this, this.state.selectedHost, variables, this.state.selectedGroups);
    }
    
    handleSelectedGroups(groups) {
        this.state.selectedGroups = groups;
        
        let server = ServerAPI.DefaultServer();
        server.updateHostVariables(this.updateHostEntries, this, this.state.selectedHost, this.state.selectedHost.variables, groups);
    }
    
    updateHostEntries(instance, allGroups) {
        instance.setState({
            groups: allGroups,
        });
    }

    renderHosts() {
        let retHTML = [];
        let index = 0;
        for (let hostName in this.state.hosts) {
            let host = this.state.hosts[hostName];
            let hostId = hostName.trim() + "_" + host.IPAddress.trim();
            if (host.type > 0) { //Host.OTHER
                let bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
                retHTML.push(
                    <CardBody pbindex={index} id={hostId} key={hostId} style={{ height: '50px', background:bgColor}} onClick={(event) => this.showDetails(event,hostName)}>
                        <Row>
                            <Col md="11">
                                <div><strong>{hostName}</strong> : {host.IPAddress}</div>
                            </Col>
                            <Col md="1">
                                <div style={{fontSize: '18px' }} onClick={(event) => this.removeHost(event,hostName)} >-</div>
                            </Col>
                        </Row>
                    </CardBody>
                );
                index++;
            }
        }
        return retHTML;
    }

    render() {
        let hostVariables = (this.state.selectedHost !== undefined) ? this.state.selectedHost.variables : null;
        let groupVariables = "";
        let systemVariables = this.state.groups[Group.SYSTEM_VARIABLES];
        if (systemVariables !== undefined) {
            systemVariables = systemVariables.variables;
        } else {
            systemVariables = "";
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong className="fontBig">Hosts</strong>
                                <div  className="floatRight" onClick={() => this.addHost()} ><strong>+</strong></div>
                            </CardHeader>
                            <div style={{ height: '300px', overflowY: 'scroll', cursor:'pointer' }}>
                                {this.renderHosts()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <VariableComponent 
                            active={this.state.active} 
                            hostVariables={hostVariables} 
                            parentId={this.state.selectedHost.hName}
                            groupVariables={groupVariables} 
                            systemVariables={systemVariables}
                            setVariables={(variables) => this.handleSetVariables(variables)}
                        />
                        <GroupComponent 
                            active={this.state.active}
                            host={this.state.selectedHost}
                            parentId={this.state.selectedHost.hName}
                            groups={this.state.groups}
                            selectedGroups={this.state.selectedGroups}
                            setSelectedGroups={(groups) => this.handleSelectedGroups(groups)}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default InventoryComponent;
