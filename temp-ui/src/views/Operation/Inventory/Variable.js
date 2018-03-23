import React, {Component} from 'react';
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
import Styles from './Variables.css';

var total = 1;

class Variables extends Component {
    constructor() {
        super();
        this.state = {
            count: 1,
            name: '',
            pairs: [{name: ''}],
        };
    }

    addEntry() {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
        this.setState({pairs: this.state.pairs.concat([{name: ''}])});
    }

    removeEntry(idx) {
        this.setState({pairs: this.state.pairs.filter((s, sidx) => idx !== sidx)});
    }

    showVariables() {
    }

    render() {
        console.log(this.props.active)        
        if(this.props.active) {
            return (         
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader align="center">
                                    <strong>Variables</strong>
                                    <Button className="floatRight" onClick={() => this.addEntry()} size="sm"
                                            color="secondary"><b><strong>+</strong></b></Button>
                                </CardHeader>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.pairs.map((pairs, idx) => (
                                        <tr>
                                            <td className="borderBottom">
                                                <FormGroup>
                                                    <Label></Label>
                                                    <Input type="text" placeholder={`Key #${idx + 1}`} required/>
                                                </FormGroup>
                                            </td>
                                            <td className="borderBottom">
                                                <FormGroup>
                                                    <Label></Label>
                                                    <Input type="text" placeholder={`Value #${idx + 1}`} required/>
                                                </FormGroup>
                                            </td>

                                            <td align="center" className="borderBottom">
                                                <Button className="marginTop20 fontSize15"
                                                        onClick={() => this.removeEntry(idx)} size="sm"
                                                        color="light"><b><strong>-</strong></b></Button>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td className='borderNone paddingTopBottom0'>
                                            <FormGroup className='marginBottom0'>
                                                <Label htmlFor="name">ALL</Label>
                                                <Input type="text" id="name" disabled placeholder="key1" required/>
                                            </FormGroup>
                                        </td>
                                        <td className='borderNone paddingTopBottom0'>
                                            <FormGroup className='marginBottom0'>
                                                <Label htmlFor="name">&nbsp;</Label>
                                                <Input type="text" id="name" disabled placeholder="Value1" required/>
                                            </FormGroup>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='borderNone paddingTopBottom0'>
                                            <FormGroup className='marginBottom0'>
                                                <Label htmlFor="name">Groups</Label>
                                                <Input type="text" id="name" disabled placeholder="key2" required/>
                                            </FormGroup>
                                        </td>
                                        <td className='borderNone paddingTopBottom0'>
                                            <FormGroup className='marginBottom0'>
                                                <Label htmlFor="name">&nbsp;</Label>
                                                <Input type="text" id="name" disabled placeholder="value2" required/>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}

export default Variables;
