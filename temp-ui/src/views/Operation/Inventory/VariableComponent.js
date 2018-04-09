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
import Styles from './Inventory.css';

var total = 1;

class VariableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            name: '',
            pairs: [{name: ''}],
        };
        this.onKeyChanged = this.onKeyChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    addVariable() {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
        this.setState({pairs: this.state.pairs.concat([{name: ''}])});

        for(let i=0;i<this.state.count;i++){
          let key="Key"+this.state.count;
          this.props.hostVariables[key]="Value"+this.state.count;
        }
    }

    removeEntry(idx) {
        this.setState({pairs: this.state.pairs.filter((s, sidx) => idx !== sidx)});
    }
//                <CardBody id={varId} key={varId}>
//              </CardBody>
    
    onKeyChanged(event, keyId, valueId) {
        console.log("On Key changed :: " + keyId + " :: " + valueId);
        let allVars = this.props.hostVariables;
        let val = allVars[keyId];
        allVars[valueId] = val;
        //delete(allVars, keyId);
        this.props.setVariables(allVars);
    }
    
    onKeyFocused(event, keyId) {
        console.log("Key Focused :: " + keyId);
        console.log("Key Focused :: Event :: " + event);
    }
    
    onValueChanged(event, keyId, valueId) {
        console.log("ON VALUE changed :: " + keyId + " :: " + valueId);
        let allVars = this.props.hostVariables;
        allVars[keyId] = valueId;
        this.props.setVariables(allVars);
    }
    
    renderPlaybookVariables() {
        let retHTML = [];
        console.log(this.props.playbookVariables);
        retHTML.push(
            <CardHeader id="variables_playbook" key="variables_playbook">
                <strong>Playbook</strong>
                <div className="floatRight" onClick={() => this.addVariable()} ><strong>+</strong></div>
            </CardHeader>);
        for (let key in this.props.playbookVariables) {
            let varId = "playbook_"+key.trim();
            retHTML.push(
                    <Row key={varId} style={{height:'50px'}}>
                        <Col md="4"><Input type="text" placeholder="Variable Key" required value={key} onFocus={(e) => this.onKeyFocused(e, key)} onChange={(e) => this.onKeyChanged(e, key, e.target.value)}/></Col>
                        <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
                        <Col md="5"><Input type="text" placeholder="Variable Value" required value={this.props.playbookVariables[key]} onChange={(e) => this.onValueChanged(e, key, e.target.value)}/></Col>
                        <Col md="2">
                            <div size="md">-</div>
                        </Col>
                    </Row>
            );
        }
        return retHTML;
    }

    renderVariables() {
        let retHTML = [];
        console.log(this.props.hostVariables);
        retHTML.push(
            <CardHeader id="variables_host" key="variables_host">
                <strong>Host</strong>
                <div className="floatRight" onClick={() => this.addVariable()} ><strong>+</strong></div>
            </CardHeader>);
        for (let key in this.props.hostVariables) {
            let varId = "host_"+key.trim();
            retHTML.push(
                    <Row key={varId} style={{height:'50px'}}>
                        <Col md="4"><Input type="text" placeholder="Variable Key" required value={key} onFocus={(e) => this.onKeyFocused(e, key)} onChange={(e) => this.onKeyChanged(e, key, e.target.value)}/></Col>
                        <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
                        <Col md="5"><Input type="text" placeholder="Variable Value" required value={this.props.hostVariables[key]} onChange={(e) => this.onValueChanged(e, key, e.target.value)}/></Col>
                        <Col md="2">
                            <div size="md">-</div>
                        </Col>
                    </Row>
            );
        }
        return retHTML;
    }
    
    renderSystemVariables() {
        let retHTML = [];
        retHTML.push(
            <CardHeader id="variables_system" key="variables_system">
                <strong>System</strong>
            </CardHeader>);
        for (let key in this.props.systemVariables) {
            let varId = "all_"+key.trim();
            retHTML.push(
                <CardBody id={varId} key={varId} style={{height:'40px'}}>
                    <Row>
                        <Col md="5">{key}</Col>
                        <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
                        <Col md="5">{this.props.systemVariables[key]}</Col>
                    </Row>
              </CardBody>
            );
        }
        return retHTML;
    }

    renderGroupVariables() {
        let retHTML = [];
        retHTML.push(
            <CardHeader id="variables_groups" key="variables_groups">
                <strong>Groups</strong>
            </CardHeader>);
        //for (let key in this.props.systemVariables) {
        //    let varId = "group_"+key.trim();
        //    retHTML.push(
        //        <CardBody id={varId} key={varId} style={{height:'40px'}}>
        //            <Row>
        //                <Col md="5">{key}</Col>
        //                <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
        //                <Col md="5">{this.props.systemVariables[key]}</Col>
        //            </Row>
        //      </CardBody>
        //    );
        //}
        return retHTML;
    }
    
    render() {
        if(this.props.active) {
            return (
                <div className="animated fadeIn">
                    <Card>
                        <CardHeader id="    ">
                            <strong>Variables</strong>
                        </CardHeader>
                        <div style={{height:"350px",marginBottom:"20px", overflowY:'scroll'}}>
                            {
                                (this.props.playbookVariables !== undefined)?
                                    this.renderPlaybookVariables() :
                                    null
                            }
                            {
                                (this.props.hostVariables !== undefined)?
                                    this.renderVariables() :
                                    null
                            }
                            {
                                (this.props.groupVariables !== undefined)?
                                this.renderGroupVariables() :
                                null
                            }
                            {
                                (this.props.systemVariables !== undefined)?
                                this.renderSystemVariables() :
                                null
                            }
                        </div>
                    </Card>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}
export default VariableComponent;
