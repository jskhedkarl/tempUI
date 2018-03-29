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
var selectedHost2;
var addHost;

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
            hostIP: "",
            variableCount: 1,
            hostCount : 1
        };
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.removeVariables = this.removeVariables.bind(this);
        this.addNewVariable=this.addNewVariable.bind(this);
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
        let host = this.state.hosts[hostName];
        selectedHost2=host;
        this.setState({
            selectedHost: host,
            active: true,
            bgColor: 'white',
        });
        this.highlightSelectedHost(event);
        this.handleToggleClick();
    }

    addNewVariable(){
      let key='key'+this.state.variableCount;
      let value='value'+this.state.variableCount;
      selectedHost2.variables[key]=value
      this.setState({
        variableCount: this.state.variableCount+1,
        selectedHost: selectedHost2
      });
    }

    removeVariables(key){
      delete selectedHost2.variables[key];
      this.setState({
        selectedHost:selectedHost2
      })
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

    renderHosts() {
        let retHTML = [];
        let index = 0;
        for (let hostName in this.state.hosts) {
            let host = this.state.hosts[hostName];

            let hostId = hostName.trim() + "_" + host.IPAddress.trim();
            if (host.type > 0) {
                retHTML.push(
                    <CardBody id={hostId} key={hostId} style={{ height: '50px' }} onClick={(event) => this.showDetails(event,hostName)}>
                        <Row>
                            <Col md="11">
                                <div><strong>{hostName}</strong> : {host.IPAddress}</div>
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
        let hostVariables = (selectedHost2 !== undefined) ? selectedHost2.variables : null;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Hosts</strong>
                                <div  className="floatRight" onClick={() => this.addHost()} ></div>
                            </CardHeader>
                            <div style={{ height: '300px', overflowY: 'scroll', cursor:'pointer' }}>
                                {this.renderHosts()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <VariableComponent active={this.state.active} hostVariables={hostVariables} removeVariables={this.removeVariables} addNewVariable={this.addNewVariable}/>
                        <GroupComponent active={this.state.active} host={this.state.selectedHost} groups={this.state.groups} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default InventoryComponent;
