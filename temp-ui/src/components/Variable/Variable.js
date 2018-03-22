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
import Variable from '../Variable/Variable.css';
const division = 
<tr>
<td>
  <FormGroup>
    <Label htmlFor="name"></Label>
    <Input type="text" id="name" placeholder="Enter the key" required/>
  </FormGroup>
</td>
<td>
<FormGroup>
    <Label htmlFor="name"></Label>
    <Input type="text" id="name" placeholder="Enter the value" required/>
  </FormGroup>
</td>
</tr>
export default class Variables extends Component {
  constructor() {
    super();
    this.state = { count: 1,
                   name: '',
                   pairs: [{ name: '' }],};
  }

  addEntry() {
    this.setState({count: this.state.count + 1});
    console.log(this.state.count);
    console.log(divMain)
    this.setState({ pairs: this.state.pairs.concat([{ name: '' }]) });
  }

  removeEntry(idx) {
    this.setState({ pairs: this.state.pairs.filter((s, sidx) => idx !== sidx) });
  }


  save() {
    alert("Saved");
  }

  showVariables() {

  }

  render() {
    return (
      
      <div className="animated fadeIn" id="variable" >
        <Card>
         <CardHeader align="center">
                <strong >Variables</strong>
                <Button className="floatRight" onClick={() => this.addEntry()} size="sm" color="secondary" ><b><strong>+</strong></b></Button>
         </CardHeader>
         <Table>
              <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th></th>
              </tr>
              </thead>
              <tbody id="divMain">
     
                {this.state.pairs.map((pairs, idx) => (
                  <tr>
                  <td>
                    <FormGroup>
                      <Label></Label>
                      <Input type="text" placeholder={`Key #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td>
                  <FormGroup>
                      <Label></Label>
                      <Input type="text" placeholder={`Value #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td align="center">
                  <Button className="marginTop20 fontSize15" onClick={() => this.removeEntry(idx)} size="sm" color="light" ><b><strong>-</strong></b></Button>
                  </td>
                  </tr>
          
        ))}
              </tbody>
                  
         </Table>
        </Card>
      </div>
    )
  }
}

