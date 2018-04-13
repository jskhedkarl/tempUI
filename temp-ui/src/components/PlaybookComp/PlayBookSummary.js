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
import Variables from '../Variable/Variable';
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
        let index = 0;
        for (let index in this.props.playBoookVariables) {
            let keyId = "playbook_var_" + index;
            retHTML.push(
                    <Row key={keyId}>
                        <Col xs="12" sm="6">  
                            <Row>
                                <Col xs="12" sm="6"> 
                                    <div className="Padding20">{this.props.playBoookVariables[index].key}</div>
                                </Col>
                                <Col xs="12" sm="6"> 
                                    <div className="Padding20">{this.props.playBoookVariables[index].value}</div>
                                </Col>
                            </Row> 
                        </Col>
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
            retHTML.push(
                <Button disabled={this.state.status==false} className="alignCenter width25pc" onClick={() => this.play()} size="sm" color="secondary">
                    <strong>Play</strong>
                </Button>
            );
            return (retHTML);
        }
        return(null);
    }
    
    renderPlayedTransaction() {
        if (this.props.playedTransactionId !== undefined) {
            let retHTML = [];
            let message = this.props.playedTransactionId.message;
            let errMessage = this.props.playedTransactionId.errMessage;
            retHTML.push(
                <Row>
                    <Col xs="12" sm="6"> 
                        <div className="Padding20">Playback Results</div>
                    </Col>
                </Row>
            );
            retHTML.push(
                <Row>
                    <Col xs="12" sm="6"> 
                        <div className="Padding20">{message}</div>
                    </Col>
                </Row>
            );
            retHTML.push(
                <Row>
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
            <strong className="fontBig">Playbook (Run) Summary</strong>
                    </CardHeader>
                    <Row>
                        <Col xs="12" sm="6"> 
                            <div className="Padding20">Selected Playbook : <strong>{this.props.selectedPlaybookName}</strong></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6"> 
                            <div className="Padding20">Variables :</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6">  
                            <Row>
                                <Col xs="12" sm="6"> 
                                    <div className="Padding20">Key </div>
                                </Col>
                                <Col xs="12" sm="6"> 
                                    <div className="Padding20">Value </div>
                                </Col>
                            </Row> 
                        </Col>
                    </Row>
                    {this.renderVariables()}
                    {this.renderPlayButton()}
                    {this.renderPlayedTransaction()}
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

