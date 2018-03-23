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

  addEntry() {
    alert("To Add");
  }

  save() {
    alert("Saved");
  }

  showVariables(id) {
    $('#variable').modal('show');
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
                <th>Play Book</th>
                <th>Key</th>
                <th>Value</th>
            </tr>
            <tr>
              <td>
                <strong><b>{this.props.playBookGist}</b></strong>
              </td>
            </tr>
         </thead>
         </Table>
            <Label className="switch switch-3d switch-primary alignCenter">
                  <Input type="checkbox" className="switch-input" defaultChecked/>
                  <span className="switch-label"></span>
                  <span className="switch-handle"></span>
            </Label>
         <Button className="alignCenter width25pc"onClick={() => this.play()} size="sm" color="light" ><b><strong>Play</strong></b></Button>
        </Card>
             
      </div>
    )
  }
}

export default PlayBookSummary;
