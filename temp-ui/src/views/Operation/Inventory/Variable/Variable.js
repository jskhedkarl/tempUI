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


var total = 1;
class Variables extends Component {

  addEntry() {
      this.total++;
  }

  save() {
    alert("Saved");
  }

  showVariables() {

  }

  render() {
    return (
      <div className="animated fadeIn" >
        <Row>
        <Col>
        <Card>
         <CardHeader align="center">
                <strong >Variables</strong>
         </CardHeader>
         <Table>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr ng-repeat="x in total track by $index">
                    <td>
                      <FormGroup>
                        <Label htmlFor="name"></Label>
                        <Input type="text" id="name" placeholder="Enter the key" required/>
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Label htmlFor="name"></Label>
                          <Input type="text" id="name" placeholder="Enter the Value" required/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td align="left">
                      <Button onClick={() => this.addEntry()} size="sm" color="gray"> + </Button><br/><br/>
                    </td>
                  </tr>
                  </tbody>
         </Table>
        </Card>
        </Col>
        </Row>
      </div>
    )
  }
}

export default Variables;
