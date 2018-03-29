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

  constructor() {
    super();
    this.state = { status: false};
  }

  addEntry() {
    alert("To Add");
  }

  save() {
    alert("Saved");
  }

  showVariables(id) {
    $('#variable').modal('show');
  }

  renderData() {
    let retHTML = [];
    let index = 0;
    for (let idx in this.props.displayData) {
        let key = this.props.displayData[idx].key;
        let value = this.props.displayData[idx].value;

        retHTML.push(
          <Row>
            <Col xs="12" sm="6"> 
            <div className="Padding20"></div>
            </Col>
            <Col xs="12" sm="6">  
              <Row>
                <Col xs="12" sm="6" md="4"><div className="Padding11">{key}</div></Col>
                <Col xs="12" sm="6" md="4"><div className="Padding11">{value}</div></Col>
              </Row>
            </Col>
          </Row>          
        );
    }
    return retHTML;
}

changeState() {
  this.setState({status : !this.state.status});  
}
play() {
  alert('Execute playbook......');
}

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <strong>Selected Play Book Summary</strong>
            </CardHeader>
        <Row>
            <Col xs="12" sm="6"> 
                <div className="Padding20"><strong>Playbook Name:</strong></div>
            </Col>
            <Col xs="12" sm="6">
            <div className="Padding20"><strong><b>{this.props.playBookGist}</b></strong></div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="6"> 
            <div className="Padding20"><strong>Variables:</strong></div>
            </Col>
            <Col xs="12" sm="6">  
            <Row>
              <Col xs="12" sm="6" md="4"> 
              <div className="Padding11"><strong>Key</strong></div>
              </Col>
              <Col xs="12" sm="6" md="4"> 
              <div className="Padding11"><strong>Value</strong></div>
              </Col>
            </Row> 
              </Col>
         </Row>
         <div className="SummaryClass">{this.renderData()}</div>
            <Label className="labelClass alignCenter">
                  <Input type="checkbox" className="size20" defaultUnchecked onClick={() => this.setState({status : !this.state.status})}/>
            </Label>
         <Button disabled={this.state.status==false} className="alignCenter playButton"onClick={() => this.play()} size="sm" color="secondary" ><b><strong>Play</strong></b></Button>
        </Card>
             
      </div>
    )
  }
}

