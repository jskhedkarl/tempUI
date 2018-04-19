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
import Styles from '../PlaybookComp/PlayBookSummary.css';
export default class PlayBookSummary extends Component {

    constructor(props) {
        super(props);
        this.state = { status: false};
    }
    
    componentWillReceiveProps(nextVars) {
        this.setState({
            status: false,
        });
    }
    
    changeState() {
        this.setState({status : !this.state.status});
        console.log(this.state.status);
    }

    play() {
        this.props.runVerifiedPlaybook();
    }

    renderVariables() {
        let retHTML = [];
        let varCount = (this.props.playBoookVariables !== undefined)?this.props.playBoookVariables.length : 0;
        let ltKeyHeader = (varCount > 0)? "Key":"";
        let ltValHeader = (varCount > 0)? "Value":"";
        let rtKeyHeader = (varCount > 1)? "Key":"";
        let rtValHeader = (varCount > 1)? "Value":"";
        retHTML.push(
            <Row key="playbook_var_header">
                <Col><strong>{ltKeyHeader}</strong></Col>
                <Col><strong>{ltValHeader}</strong></Col>
                <Col xs="1"></Col>
                <Col><strong>{rtKeyHeader}</strong></Col>
                <Col><strong>{rtValHeader}</strong></Col>
            </Row>
        );
        for (let index = 0; index < varCount; index=index+2) {
            let rtIndex = ((index + 1) >= varCount) ? -1 : index+1;
            let keyId = "playbook_var_" + index;
            let ltKey = this.props.playBoookVariables[index].key;
            let ltVal = this.props.playBoookVariables[index].value;
            let rtKey = (rtIndex > 0)?this.props.playBoookVariables[rtIndex].key : "";
            let rtVal = (rtIndex > 0)?this.props.playBoookVariables[rtIndex].value : "";
            
            retHTML.push(
                <Row key={keyId}>
                    <Col>{ltKey}</Col>
                    <Col>{ltVal}</Col>
                    <Col xs="1"></Col>
                    <Col>{rtKey}</Col>
                    <Col>{rtVal}</Col>
                </Row>
            );
        }
        return retHTML;
    }
    
    renderPlayButton() {
        if (this.props.playedTransactionId === undefined) {
            let retHTML = [];
            retHTML.push(
                <Label className="switch switch-icon switch-secondary alignCenter">
                    <Input type="checkbox" checked={this.state.status} className="switch-input"  onClick={(event) => this.changeState(event)}></Input>
                    <span className="switch-label" data-on={'\uf087'} data-off={'\uf088'}></span>
                    <span className="switch-handle"></span>
                </Label>
            );
            if (this.state.status == false) { // disabled
                retHTML.push(
                    <Button disabled outline color="primary" size="lg" onClick={() => this.play()}> Play </Button>
                );
            } else {
                retHTML.push(
                    <Button outline color="primary" size="lg" onClick={() => this.play()}> Play </Button>
                );
            }
            return (retHTML);
        }
        return(null);
    }
    
    /*                <Button disabled={this.state.status==false} className="alignCenter width25pc" onClick={() => this.play()} size="sm" color="secondary">
                    <strong>Play</strong>
                </Button>
*/
    renderPlayedTransaction() {
        if (this.props.playedTransactionId !== undefined) {
            let retHTML = [];
            let message = this.props.playedTransactionId.message;
            let errMessage = this.props.playedTransactionId.errMessage;
            let key = this.props.playedTransactionId.Id + "_header"
            retHTML.push(
                <Row key={key}>
                    <Col xs="12" sm="6"> 
                        <div><h4>Playback Results :</h4></div>
                    </Col>
                </Row>
            );
            key = this.props.playedTransactionId.Id + "_message"
            retHTML.push(
                <Row key={key}>
                    <Col xs="12" sm="6"> 
                        <div className="Padding20">{message}</div>
                    </Col>
                </Row>
            );
            key = this.props.playedTransactionId.Id + "_err"
            retHTML.push(
                <Row key={key}>
                    <Col xs="12" sm="6"> 
                        <div className="Padding20">{errMessage}</div>
                    </Col>
                </Row>
            );
            return retHTML;
        }
        return(null);
    }

    render() {
        return (
            <div className="animated fadeIn">

                <Card>
                    <CardHeader>
                        <h2>Playbook (Run) Summary</h2>
                    </CardHeader>
                    <CardBody key="Summary_Header">
                        <div><h4>Selected Playbook : <Badge pill>{this.props.selectedPlaybookName}</Badge></h4></div>
                    </CardBody>
                    <CardBody key="Summary_Arguments">
                        <div><h4>Arguments :</h4></div>
                        {this.renderVariables()}
                    </CardBody>
                    {this.renderPlayButton()}
                    <CardBody key="Summary_Results">
                        {this.renderPlayedTransaction()}
                    </CardBody>
                    <Row>
                        <Col xs="12" sm="6"> 
                            <div className="Padding20"></div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

