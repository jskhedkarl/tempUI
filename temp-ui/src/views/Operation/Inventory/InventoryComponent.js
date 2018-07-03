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
    ModalHeader,
    ModalBody,
    ModalFooter,
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
            nodes: [],
            selectedNode: "",
            selectedNodeDivId: "",
            //hosts: {},
            groups: server.allLabels,
            selectedGroups: {},
            //selectedHost: "",
            //selectedHostDivId: "",
            show: false,
            isOpen: false,
            hostName: "",
            hostIP: "",
            showAddHost: false,
            createdHost: "",
            createHostValidated: false,
        };
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.toggleCreateHost = this.toggleCreateHost.bind(this);
        this.createNewHost = this.createNewHost.bind(this);
        this.onHostNameChange = this.onHostNameChange.bind(this);
        this.onIPAddressChange = this.onIPAddressChange.bind(this);
        //this.inventoryCallback = this.inventoryCallback.bind(this);
        this.updateHostEntries = this.updateHostEntries.bind(this);
        this.updateNodeSummary = this.updateNodeSummary.bind(this);
    }
    
    componentDidMount() {
        this.updateInventory();
    }
    
    updateInventory() {
        let server = ServerAPI.DefaultServer();
        //server.setupInventory(this.inventoryCallback, this);
        server.fetchAllServerNodes(this.updateNodeSummary, this);
    }
    
    updateNodeSummary(instance, nodes) {
        instance.setState({
            nodes: nodes,
        });
    }
    //inventoryCallback(instance) {
    //    let server = ServerAPI.DefaultServer();
    //    instance.setState({
    //        hosts : server.allHosts,
    //        groups: server.allGroups,
    //    });
    //}
    

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.active
        }));
    }
    
    toggleCreateHost() {
        let toggled = !this.state.showAddHost;
        let host = "";
        if (toggled) {
            host = new Host("", ""); 
        }
        this.setState({
            showAddHost: toggled,
            createdHost: host,
            createHostValidated: false,
        })
    }
    
    createNewHost() {
        let host = this.state.createdHost;

        if (host.hName.length > 0 && host.IPAddress.length > 0 && host.invaderPort.length > 0) {
            let server = ServerAPI.DefaultServer();
            let vars = host.variables;
            let serverGrp = {};
            for (let grpId in this.state.groups) {
                let grp = this.state.groups[grpId];
                if (grp.gType === Host.SERVER) {
                    serverGrp[grpId] = grpId;
                }
            }
            server.updateHostVariables(this.updateHostEntries, this, host, vars, serverGrp);
            this.toggleCreateHost();
        }
    }
    
    onHostNameChange(event) {
        let valid = false;
        let host = this.state.createdHost;
        host.hName = event.target.value;

        if (host.hName.length > 0 && host.IPAddress.length > 0 && host.invaderPort.length > 0) {
            valid = true;
        }
        this.setState({
            createHostValidated: valid,
            createdHost: host,
        });
    }
    
    onIPAddressChange(event) {
        let valid = false;
        let host = this.state.createdHost;
        host.IPAddress = event.target.value;
        if (host.hName.length > 0 && host.IPAddress.length > 0 && host.invaderPort.length > 0) {
            valid = true;
        }
        this.setState({
            createHostValidated: valid,
            createdHost: host,
        });
    }
    
    onPlatinaPortChange(event) {
        let valid = false;
        let host = this.state.createdHost;
        host.invaderPort = event.target.value;
        if (host.hName.length > 0 && host.IPAddress.length > 0 && host.invaderPort.length > 0) {
            valid = true;
        }
        this.setState({
            createHostValidated: valid,
            createdHost: host,
        });
    }

    showVariables(id) {
        this.setState({ childVisible: !this.state.childVisible });
    }

    showGroups() {
        this.setState({ childVisible: !this.state.childVisible });
    }
    
    //calculateSelectedGroups(host) {
    //    if (host === undefined ||
    //        host === "")
    //        return {};
    //
    //    let selectedGroups = {};
    //    let hostName = host.hName;
    //    if (hostName !== undefined) {
    //        for (let groupName in this.state.groups) {
    //            let group = this.state.groups[groupName];
    //            if (hostName in group.hosts) {
    //                selectedGroups[groupName] = groupName;
    //            }
    //        }
    //    }
    //    return selectedGroups;
    //}

    //showDetails(event, hostName) {
    //    let host = this.state.hosts[hostName];
    //    
    //    let selElement = event.currentTarget;
    //    let selGroups = this.calculateSelectedGroups(host);
    //    if (!this.state.active) {  // No previous Selection
    //        selElement.setAttribute("style", "background-color:rgb(189,189,189)");
    //        this.setState({
    //            selectedHost: host,
    //            selectedHostDivId: selElement.id,
    //            active: true, 
    //            selectedGroups: selGroups,
    //        });
    //    } else {
    //        let prevName = this.state.selectedHostDivId;
    //        let prevSelElement = document.getElementById(prevName);
    //        let selIndex = parseInt(prevSelElement.getAttribute("pbindex"));
    //        let bgColor = "background-color:" + ((selIndex % 2) ? 'rgb(255,255,255)': 'rgb(227,227,227)');
    //        prevSelElement.setAttribute("style", bgColor);
    //        if (this.state.selectedHost.hName === hostName) {   // Same host selected as prev.. Or de-selected
    //            this.setState({
    //                selectedHost: "",
    //                selectedHostDivId: "",
    //                active: false,
    //                selectedGroups: {},
    //            });
    //        } else {
    //            selElement.setAttribute("style", "background-color:rgb(189,189,189)");
    //            this.setState({
    //                selectedHost: host,
    //                selectedHostDivId: selElement.id,
    //                active: true, 
    //                selectedGroups: selGroups,
    //            });
    //        }
    //    }
    //}
    
    showDetails(event, node) {
        let selElement = event.currentTarget;
        if (!this.state.active) {
            selElement.setAttribute("style", "background-color:rgb(189,189,189)")
            this.setState({
                selectedNode: node,
                selectedNodeDivId: selElement.id,
                active: true,
                selectedGroups: node.labels,
            });
        } else {
            let prevName = this.state.selectedNodeDivId;
            let prevSelElement = document.getElementById(prevName);
            let selIndex = parseInt(prevSelElement.getAttribute("pbindex"));
            let bgColor = "background-color:" + ((selIndex %2) ? 'rgb(255,255,255)': 'rgb(227,227,227)');
            prevSelElement.setAttribute("style", bgColor);
            if (this.state.selectedNode.name === node.name) {
                this.setState({
                    selectedNode: "",
                    selectedNodeDivId: "",
                    active: false,
                    selectedGroups: [],
                });
            } else {
                selElement.setAttribute("style", "background-color:rgb(189,189,189)");
                this.setState({
                    selectedNode: node,
                    selectedNodeDivId: selElement.id,
                    active: true, 
                    selectedGroups: node.labels,
                });
            }
        }
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
        instance.updateInventory();
        //instance.setState({
        //    groups: allGroups,
        //});
    }
    
    renderAddHostModel() {
        console.log("Adding host model");
        let className="Create_Host_Dialog";
        return (
            <Modal isOpen={this.state.showAddHost} size="sm" centered="true" className={className}>
                <ModalHeader toggle={this.toggleCreateHost}>New Host</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="5"><Input type="text" style={{width:'250px'}} placeholder="Host Name" required defaultValue={this.state.createdHost.hName} onChange={(event) => this.onHostNameChange(event)}/></Col>
                    </Row>
                    <Row><Col mn="5" style={{height:'10px'}}></Col></Row>
                    <Row>
                        <Col md="5"><Input type="text" style={{width:'250px'}} placeholder="Host IP" required defaultValue={this.state.createdHost.IPAddress} onChange={(event) => this.onIPAddressChange(event)}/></Col>
                    </Row>
                    <Row><Col mn="5" style={{height:'10px'}}></Col></Row>
                    <Row>
                        <Col md="5"><Input type="text" style={{width:'250px'}} placeholder="Platina Port #" required defaultValue={this.state.createdHost.invaderPort} onChange={(event) => this.onPlatinaPortChange(event)}/></Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button outline disabled={!this.state.createHostValidated} color="primary" onClick={this.createNewHost}>Create</Button>{' '}
                    <Button outline color="secondary" onClick={this.toggleCreateHost}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

//                                <div style={{fontSize: '18px' }} onClick={(event) => this.removeHost(event,hostName)} >-</div>

    //renderHosts() {
    //    let retHTML = [];
    //    let index = 0;
    //    for (let hostName in this.state.hosts) {
    //        let host = this.state.hosts[hostName];
    //        let hostId = hostName.trim() + "_" + host.IPAddress.trim();
    //        if (host.type > 0) { //Host.OTHER
    //            let bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
    //            retHTML.push(
    //                <CardBody pbindex={index} id={hostId} key={hostId} style={{ background:bgColor}} onClick={(event) => this.showDetails(event,hostName)}>
    //                    <Row>
    //                        <Col md="11">
    //                            <Row>
    //                                <Col><strong>{hostName}</strong></Col>
    //                            </Row>
    //                            <Row>
    //                                <Col md="1"></Col>
    //                                <Col md="4">IP Address: </Col>
    //                                <Col md="5"><strong>{host.IPAddress}</strong></Col>
    //                            </Row>
    //                            <Row>
    //                                <Col md="1"></Col>
    //                                <Col md="4">Platina Port: </Col>
    //                                <Col md="5"><strong>{host.invaderPort}</strong></Col>
    //                            </Row>
    //                        </Col>
    //                        <Col md="1">
    //                            <Button className="floatRight" color="link" size="lg" onClick={(event) => this.removeHost(event,hostName)}> - </Button>
    //                        </Col>
    //                    </Row>
    //                </CardBody>
    //            );
    //            index++;
    //        }
    //    }
    //    return retHTML;
    //}
    
    renderNode(node, index) {
        let bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
        //onClick={(event) => this.showDetails(event,hostName)}
        /*
                    <Col md="1">
                        <Button className="floatRight" color="link" size="lg" onClick={(event) => this.removeHost(event,hostName)}> - </Button>
                    </Col>
        */
        return (
            <CardBody pbindex={index} id={node.name} 
                key={node.name} style={{ background:bgColor}} 
                onClick={(event) => this.showDetails(event, node)}>
                <Row>
                    <Col md="11">
                        <Row>
                            <Col><strong>{node.name}</strong></Col>
                        </Row>
                        <Row>
                            <Col md="1"></Col>
                            <Col md="4">IP Address: </Col>
                            <Col md="5"><strong>{node.hostNameIP}</strong></Col>
                        </Row>
                        <Row>
                            <Col md="1"></Col>
                            <Col md="4"> BMC IP: </Col>
                            <Col md="5"><strong>{node.bmcAddressIP}</strong></Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        );
    }
    
    renderNodes() {
        let retHTML = [];
        for (let ctr in this.state.nodes) {
            let node = this.state.nodes[ctr];
            retHTML.push(this.renderNode(node, ctr));
        }
        return retHTML;
    }
    
    render() {
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader id="host_header" key="host_header">
                                <Row>
                                    <Col>
                                        <h2>Hosts</h2>
                                    </Col>
                                    <Col>
                                        <Button className="floatRight" color="link" size="lg" onClick={this.toggleCreateHost}> + </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <div style={{ height: '600px', overflowY: 'scroll', cursor:'pointer' }}>
                                {this.renderNodes()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <GroupComponent 
                            active={this.state.active}
                            host={this.state.selectedNode}
                            parentId={this.state.selectedNode.name}
                            groups={this.state.groups}
                            selectedGroups={this.state.selectedGroups}
                            setSelectedGroups={(groups) => this.handleSelectedGroups(groups)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    //render() {
    //    let hostVariables = (this.state.selectedHost !== undefined) ? this.state.selectedHost.variables : null;
    //    let groupVariables = "";
    //    let systemVariables = this.state.groups[Group.SYSTEM_VARIABLES];
    //    if (systemVariables !== undefined) {
    //        systemVariables = systemVariables.variables;
    //    } else {
    //        systemVariables = "";
    //    }
    //    //                                <div className="floatRight" onClick={() => this.toggleCreateHost()} ><strong>+</strong></div>
    //
    //    return (
    //        <div className="animated fadeIn">
    //            {this.renderAddHostModel()}
    //            <Row>
    //                <Col xs="12" sm="6">
    //                    <Card>
    //                        <CardHeader id="host_header" key="host_header">
    //                            <Row>
    //                                <Col>
    //                                    <h2>Hosts</h2>
    //                                </Col>
    //                                <Col>
    //                                    <Button className="floatRight" color="link" size="lg" onClick={this.toggleCreateHost}> + </Button>
    //                                </Col>
    //                            </Row>
    //                        </CardHeader>
    //                        <div style={{ height: '600px', overflowY: 'scroll', cursor:'pointer' }}>
    //                            {this.renderHosts()}
    //                        </div>
    //                    </Card>
    //                </Col>
    //                <Col xs="12" sm="6">
    //                    <VariableComponent 
    //                        active={this.state.active} 
    //                        hostVariables={hostVariables} 
    //                        parentId={this.state.selectedHost.hName}
    //                        groupVariables={groupVariables} 
    //                        systemVariables={systemVariables}
    //                        setVariables={(variables) => this.handleSetVariables(variables)}
    //                    />
    //                    <GroupComponent 
    //                        active={this.state.active}
    //                        host={this.state.selectedHost}
    //                        parentId={this.state.selectedHost.hName}
    //                        groups={this.state.groups}
    //                        selectedGroups={this.state.selectedGroups}
    //                        setSelectedGroups={(groups) => this.handleSelectedGroups(groups)}
    //                    />
    //                </Col>
    //            </Row>
    //        </div>
    //    );
    //}
}
export default InventoryComponent;
