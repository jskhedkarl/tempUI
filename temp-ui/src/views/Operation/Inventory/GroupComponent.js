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

import { ServerAPI, Host, Group } from '../../../ServerAPI';

export default class GroupComponent extends Component {
    constructor(props) {
        super(props);
        //let sGrps = this.generateSelectedGroups();
        this.state = {
            stateChanged: false,
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            stateChanged: !this.state.stateChanged,
        });
    }

    groupSelected(event, gName, gIndex) {
        let currentTarget=event.target.parentNode.parentNode;
        let selectedGroups = this.props.selectedGroups;
        let bgColor = 'rgb(189,189,189)';
        if (gName in selectedGroups) {
            // remove it
            delete selectedGroups[gName];
            bgColor = gIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
        } else {
            // add to group
            selectedGroups[gName] = gName;
        }
        currentTarget.style.background=bgColor;
        this.props.setSelectedGroups(selectedGroups);
    }

    renderGroups() {
        let retHTML = [];

        if (this.props.groups === undefined) {
            return [];
        }
        let index = 0;
        for (let gName in this.props.groups) {
            let grp = this.props.groups[gName];
            if (grp.gType == Host.OTHER || grp.gType == Host.UNGROUPED) {
                continue;
            }
            let selected = gName in this.props.selectedGroups;
            let bgColor = 'rgb(189,189,189)';
            if (!selected) {
                bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
            }
            let styleDict = {height: '50px', background: bgColor};
            let keyId = this.props.parentId + "_" + gName;
            retHTML.push(
                <CardBody id={keyId} key={keyId} style={styleDict} onClick={(event) => this.groupSelected(event,gName,index)}>
                    <Row>
                        <Col>{gName}</Col>
                    </Row>
                </CardBody>
            );
            index++;
        }
        return retHTML;
    }

//                    <Button className="floatRight">{this.props.selectedGroups.length}</Button>

    render() {
        if(this.props.active) {
        return (
            <Card>
                <CardHeader>
                    <strong className="fontBig">Groups</strong>
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
