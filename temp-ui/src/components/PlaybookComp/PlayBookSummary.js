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
                <Col xs="12" sm="6"><div className="Padding20">{key}</div></Col>
                <Col xs="12" sm="6"><div className="Padding20">{value}</div></Col>
              </Row>
            </Col>
          </Row>
          // <CardBody id={playbookId} style={{height:'50px', background:bgColor}} onClick={() => this.showVariables(playbookIndex)}>
          //   <strong>{playbookName}</strong>
          // </CardBody>
        );
    }
    return retHTML;
}

changeState() {

  this.setState({status : !this.state.status});
  console.log(this.state.status);
}
play() {
  alert('The playbook is playing');
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
                <div className="Padding20">Playbook Name:</div>
            </Col>
            <Col xs="12" sm="6">
            <div className="Padding20"><strong><b>{this.props.playBookGist}</b></strong></div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="6"> 
            <div className="Padding20">Variables:</div>
            </Col>
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
         {this.renderData()}
            <Label className="switch switch-icon switch-secondary alignCenter">
                  <Input type="checkbox" className="switch-input" defaultUnchecked onClick={() => this.setState({status : !this.state.status})}/>
                  <span className="switch-label" data-on={'\uf087'} data-off={'\uf088'}></span>
                  <span className="switch-handle"></span>
            </Label>
         <Button disabled={this.state.status==false} className="alignCenter width25pc"onClick={() => this.play()} size="sm" color="secondary" ><b><strong>Play</strong></b></Button>
        </Card>
             
      </div>
    )
  }
}

