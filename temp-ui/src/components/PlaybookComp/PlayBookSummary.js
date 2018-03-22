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
         <CardHeader align="center">
                <strong >Playbook Summary</strong>
         </CardHeader>
         <Table>
         <thead>
             <tr>   
                <th>Playbook</th>
                <th>Key</th>
                <th>Value</th>
            </tr>
         </thead>
         </Table>
        </Card>
             
      </div>
    )
  }
}

export default PlayBookSummary;
