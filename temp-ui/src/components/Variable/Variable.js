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
let listVariables = {}
import Variable from '../Variable/Variable.css';

export default class Variables extends Component {
  constructor() {
    super();
    this.state = { name: '',
                   data: [{key:'', value:''}],
                   temp: ''};
  }

  addEntry() {
    this.setState({ data: this.state.data.concat([{key:'', value: ''}]) });
  }

  removeEntry(idx) {
    if(idx != 0)
    this.setState({ data: this.state.data.filter((s, sidx) => idx !== sidx) });
  }


  save() {
    for(let i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i].key+'_'+this.state.data[i].value)
    }
  }

  handleKey(event) {
   console.log(event.target.value)
   console.log(event.target.id)
    this.state.data[event.target.id.split('@')[1]].key = event.target.value;
  }

  handleValue(event) {
    this.state.data[event.target.id.split('@')[1]].value = event.target.value;
    // for( let i = 0; i < this.state.data.length; i++) {
    //   this.props.data[i].key.push(this.state.data[i].key);
    //   this.props.data[i].value.push(this.state.data[i].value);
    // }
    Object.assign(this.props.data,this.state.data);
   }

  render() {
    return (

      <div className="animated fadeIn" id="variable" >
        <Card>
         <CardHeader align="left">
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

                {this.state.data.map((data, idx) => (
                  <tr>
                  <td>
                    <FormGroup>
                      <Label></Label>
                      <Input type="text"  onBlur={this.handleKey.bind(this)} id={this.props.playBook+'$key@' + idx} placeholder={`Key #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td>
                  <FormGroup>
                      <Label></Label>
                      <Input type="text"  onBlur={this.handleValue.bind(this)} id={this.props.playBook+'$value@' + idx} placeholder={`Value #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td align="center">
                  <Button hidden={idx==0} className="marginTop20 fontSize15" onClick={() => this.removeEntry(idx)} size="sm" color="light" ><b><strong>-</strong></b></Button>
                  </td>
                  </tr>
          
        ))}
              </tbody>
                  
         </Table>
         {/* <CardFooter align="right">
            <Button className="floatRight"  onClick={() => this.save()} size="sm" color="secondary"><b><strong>Save</strong></b></Button>
         </CardFooter> */}
        </Card>
      </div>
    )
  }
}

