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
const records = 3;
class PlayBookSummary extends Component {

  constructor() {
    super();
    this.state = { status: true};
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
          <tr>
            <td />
            <td>{key}</td>
            <td>{value}</td>
          </tr>
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

  render() {
    return (
      <div className="animated fadeIn">

        <Card>
            <CardHeader>
                <strong>Selected Play Book Summary</strong>
            </CardHeader>
        <Table>
         <thead>
             <tr>   
                <th>Playbook Name: </th>
                <th><strong><b>{this.props.playBookGist}</b></strong></th>
                <th/>
            </tr>
            <tr>
              <td>Variables: </td>
              <td>Key </td>
              <td>Value </td>
            </tr>
         </thead>
         {this.renderData()}
         </Table>
            <Label className="switch switch-icon switch-secondary alignCenter">
                  <Input type="checkbox" className="switch-input" defaultChecked/>
                  <span className="switch-label" data-on={'\uf087'} data-off={'\uf088'}></span>
                  <span className="switch-handle"></span>
            </Label>
         <Button disabled={this.state.status==false} className="alignCenter width25pc"onClick={() => this.play()} size="sm" color="light" ><b><strong>Play</strong></b></Button>
        </Card>
             
      </div>
    )
  }
}

export default PlayBookSummary;
