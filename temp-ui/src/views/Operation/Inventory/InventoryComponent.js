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
            selectedHost: "",
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

    showDetails(event,hostName) {
        console.log("HOST SLEECTED:::" + hostName);
        let host = this.state.hosts[hostName];
        this.setState({
            selectedHost: host,
            active: true,
            bgColor: 'white',
        });
        this.highlightSelectedHost(event);
        this.handleToggleClick();
    }

    highlightSelectedHost(event){
      let cardDiv;

      switch(event.target.getAttribute('class')){
        case 'card-body' : cardDiv=event.target.parentNode.childNodes;
              break;
        case 'row' : cardDiv=event.target.parentNode.parentNode.childNodes;
              break;
        case 'col col-md-11' : cardDiv=event.target.parentNode.parentNode.parentNode.childNodes;
              break;
        default : cardDiv=event.target.parentNode.parentNode.parentNode.parentNode.childNodes;
      }

      for(let i=0;i<cardDiv.length;i++){
        cardDiv[i].style.background="white";
      }

      switch(event.target.getAttribute('class')){
        case 'card-body' : event.target.style.background="rgb(204,204,204)";
              break;
        case 'row' : event.target.style.background="rgb(204,204,204)";
              break;
        case 'col col-md-11' : cardDiv=event.target.parentNode.parentNode.style.background="rgb(204,204,204)";
              break;
        default : event.target.parentNode.parentNode.parentNode.style.background="rgb(204,204,204)";
      }

    }

    addHost() {
        alert("Placeholder for addHost()");
    }

    removeHost(event,hostName) {
        event.stopPropagation();
        alert("removed host : "+hostName);
    }

    renderHosts() {
        let retHTML = [];
        let index = 0;
        for (let hostName in this.state.hosts) {
            let host = this.state.hosts[hostName];
            let hostId = hostName.trim() + "_" + host.IPAddress.trim();
            if (host.type > 0) { //Host.OTHER
                //let bgColor = index % 2 ? 'rgb(237,237,237)' : '';
                retHTML.push(
                    <CardBody id={hostId} key={hostId} style={{ height: '50px' }} onClick={(event) => this.showDetails(event,hostName)}>
                        <Row>
                            <Col md="11">
                                <div><strong>{hostName}</strong> : {host.IPAddress}</div>
                            </Col>
                            <Col md="1">
                                <button onClick={(event) => this.removeHost(event,hostName)}>-</button>
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
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Hosts</strong>
                                <div  className="floatRight" onClick={() => this.addHost()} ><strong>+</strong></div>
                            </CardHeader>
                            <div style={{ height: '300px', overflowY: 'scroll', cursor:'pointer' }}>
                                {this.renderHosts()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <VariableComponent active={this.state.active} hostVariables={hostVariables} />
                        <GroupComponent active={this.state.active} host={this.state.selectedHost} groups={this.state.groups} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default InventoryComponent;
