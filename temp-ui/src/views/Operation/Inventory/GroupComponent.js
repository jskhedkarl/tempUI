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
            selectedGroups: {},
            stateChanged: false,
        };
    }
    
    componentWillReceiveProps(nextProps) {
        let selectedGrpDict = {};
        for (let grpIndex in nextProps.selectedGroups) {
            let labelStr = nextProps.selectedGroups[grpIndex];
            selectedGrpDict[labelStr] = labelStr;
        }
        this.setState({
            stateChanged: !this.state.stateChanged,
            selectedGroups: selectedGrpDict,
        });
    }

    groupSelected(event, labelObj, gIndex) {
        let currentTarget=event.target.parentNode.parentNode;
        let selectedGroups = this.state.selectedGroups;
        let bgColor = 'rgb(189,189,189)';
        if (labelObj.label in selectedGroups) {
            // remove it
            delete selectedGroups[labelObj.label];
            bgColor = gIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
        } else {
            // add to group
            selectedGroups[labelObj.label] = labelObj.label;
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
        for (let labelCtr in this.props.groups) {
            let labelObj = this.props.groups[labelCtr];
            //if (grp.gType == Host.OTHER || grp.gType == Host.UNGROUPED) {
            //    continue;
            //}
            let selected = labelObj.label in this.state.selectedGroups;
            let bgColor = 'rgb(189,189,189)';
            if (!selected) {
                bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
            }
            let styleDict = {height: '50px', background: bgColor};
            let keyId = this.props.parentId + "_" + labelObj.label;
            retHTML.push(
                <CardBody id={keyId} key={keyId} style={styleDict} onClick={(event) => this.groupSelected(event,labelObj,index)}>
                    <Row>
                        <Col>{labelObj.label}</Col>
                    </Row>
                </CardBody>
            );
            index++;
        }
        return retHTML;
    }
    //renderGroups() {
    //    let retHTML = [];
    //
    //    if (this.props.groups === undefined) {
    //        return [];
    //    }
    //    let index = 0;
    //    for (let gName in this.props.groups) {
    //        let grp = this.props.groups[gName];
    //        if (grp.gType == Host.OTHER || grp.gType == Host.UNGROUPED) {
    //            continue;
    //        }
    //        let selected = gName in this.props.selectedGroups;
    //        let bgColor = 'rgb(189,189,189)';
    //        if (!selected) {
    //            bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
    //        }
    //        let styleDict = {height: '50px', background: bgColor};
    //        let keyId = this.props.parentId + "_" + gName;
    //        retHTML.push(
    //            <CardBody id={keyId} key={keyId} style={styleDict} onClick={(event) => this.groupSelected(event,gName,index)}>
    //                <Row>
    //                    <Col>{gName}</Col>
    //                </Row>
    //            </CardBody>
    //        );
    //        index++;
    //    }
    //    return retHTML;
    //}

//                    <Button className="floatRight">{this.props.selectedGroups.length}</Button>

    render() {
        if(this.props.active) {
            let selGrpCount = Object.keys(this.props.selectedGroups).length;
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <h2>Groups</h2>
                        </Col>
                        <Col md="1">
                            <Badge pill>{selGrpCount}</Badge>
                        </Col>
                    </Row>
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
