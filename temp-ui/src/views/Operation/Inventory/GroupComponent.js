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

    //generateSelectedGroups() {
    //    if (this.props.host === undefined ||
    //        this.props.host === "")
    //        return [];
    //
    //    let selectedGroups = [];
    //    let hostName = this.props.host.hName;
    //    if (hostName !== undefined) {
    //        for (let groupName in this.props.groups) {
    //            let group = this.props.groups[groupName];
    //            if (group.hosts.includes(hostName)) {
    //                selectedGroup.push(groupName);
    //            }
    //        }
    //    }
    //    return selectedGroups;
    //}

    groupSelected(event, gName, gIndex) {
        let currentTarget=event.target.parentNode.parentNode;
        let selectedGroups = this.props.selectedGroups;
        let bgColor = 'rgb(189,189,189)';
        if (selectedGroups.includes(gName)) {
            // remove it
            selectedGroups.pop(gName);
            //delete(selectedGroups, gName);
            bgColor = gIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
        } else {
            // add to group
            selectedGroups.push(gName);
        }
        currentTarget.style.background=bgColor;

        //let selGrps = this.props.selectedGroups;
        //if (selGrps.includes(gName)) {
        //  if(currentTarget.getAttribute("class")!='card'){
        //    currentTarget.style.background="white";
        //    selGrps.splice(selGrps.indexOf(gName),1);
        //  }
        //} else {
        //    if(currentTarget.getAttribute("class")!='card'){
        //      currentTarget.style.background="rgb(204,204,204)";
        //      selGrps.unshift(gName);
        //    }
        //}

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
            if (grp.gType == 0) {
                continue;
            }
            let selected = this.props.selectedGroups.includes(gName);
            let bgColor = 'rgb(189,189,189)';
            if (!selected) {
                bgColor = index % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)'; 
            }
            let styleDict = {height: '50px', background: bgColor};
            let keyId = this.props.parentId + "_" + gName;
            //let style = selected ? {backgroud: 'rgb(120,120,120)'} : {};
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
