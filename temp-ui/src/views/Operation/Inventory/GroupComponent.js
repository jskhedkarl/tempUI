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
    constructor(props) {
        super(props);
        let sGrps = this.generateSelectedGroups();
        this.state = {
            selectedGroups: sGrps,
        };
    }
    
    generateSelectedGroups() {
        if (this.props.host === undefined)
            return [];
        
        let selectedGroups = [];
        let hostName = this.props.host.hName;
        if (hostName !== undefined) {
            for (let groupName in this.props.groups) {
                let group = this.props.groups[groupName];
                if (group.hosts.includes(hostName)) {
                    selectedGroup.push(groupName);
                }
            }
        }
        return selectedGroups;
    }
    
    groupSelected(gName) {
        let selGrps = this.state.selectedGroups;
        if (selGrps.includes(gName)) {
            selGrps.pop(gName);
        } else {
            selGrps.push(gName);
        }
        //MN:: TODO Update Server call goes here... Async call is good enough
        this.setState({
            selectedGroups: selGrps,
        });
    }
    
    renderGroups() {
        let retHTML = [];
        if (this.props.groups === undefined) {
            return [];
        }
        for (let gName in this.props.groups) {
            let grp = this.props.groups[gName];
            if (grp.gType == 0) {
                continue;
            }
            let selected = this.state.selectedGroups.includes(gName);
            let style = selected ? {backgroud: 'rgb(120,120,120)'} : {};
            retHTML.push(
                <CardBody id={gName} style={{height: '50px'}}>
                    <Row style={style} onClick={() => this.groupSelected(gName)}>
                        <Col>{gName}</Col>
                    </Row>
                </CardBody>
            );
        }
        return retHTML;
    }
    
    render() {
        if(this.props.active) {
        return (
            <Card>
                <CardHeader>
                    <strong>Groups</strong>
                </CardHeader>

                <div style={{height:'300px', overflowY:'scroll'}}>
                    {this.renderGroups()}
                </div>
            </Card>
        )}else{
            return  (<div></div>)
        }
    }
}

