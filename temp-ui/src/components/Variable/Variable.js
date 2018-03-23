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
    this.state = { count: 1,
                   name: '',
                   pairs: [{ name: '' }],
                   data: [{key: '', value:''}]};
  }

  addEntry() {
    this.setState({count: this.state.count + 1});
    console.log(this.state.count);
    console.log(divMain)
    this.setState({ pairs: this.state.pairs.concat([{ name: '' }]) });
  }

  removeEntry(idx) {
    if(idx != 0)
    this.setState({ pairs: this.state.pairs.filter((s, sidx) => idx !== sidx) });
  }


  save() {
    for(let i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i].key+'_'+this.state.data[i].value)
    }
  }

  handleKey(event) {
    
    // console.log(event.target.id.split('@')[1])
    this.setState(this.state.data.key[event.target.id.split('@')[1]]=event.state)
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
                      <Input type="text"  onChange={this.handleKey.bind(this)}id={this.props.playBook+'_key@' + idx} placeholder={`Key #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td>
                  <FormGroup>
                      <Label></Label>
                      <Input type="text"  id={this.props.playBook+'_value_' + idx} placeholder={`Value #${idx + 1}`} required/>
                    </FormGroup>
                  </td>
                  <td align="center">
                  <Button hidden={idx==0} className="marginTop20 fontSize15" onClick={() => this.removeEntry(idx)} size="sm" color="light" ><b><strong>-</strong></b></Button>
                  </td>
                  </tr>
          
        ))}
              </tbody>
                  
         </Table>
         <CardFooter align="right">
            <Button className="floatRight"  onClick={() => this.save()} size="sm" color="secondary"><b><strong>Save</strong></b></Button>
         </CardFooter>
        </Card>
      </div>
    )
  }
}

