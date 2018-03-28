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
import Styles from './Inventory.css';

var total = 1;

class VariableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            name: '',
            pairs: [{name: ''}],
        };
    }

    addVariable() {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
        this.setState({pairs: this.state.pairs.concat([{name: ''}])});

        for(let i=0;i<this.state.count;i++){
          let key="Key"+this.state.count;
          this.props.hostVariables[key]="Value"+this.state.count;
        }
    }

    removeEntry(idx) {
        this.setState({pairs: this.state.pairs.filter((s, sidx) => idx !== sidx)});
    }

    renderVariables() {
        let retHTML = [];
        console.log(this.props.hostVariables);
        retHTML.push(
            <CardHeader>
                <strong>Host</strong>
                <div className="floatRight" onClick={() => this.addVariable()} ><strong>+</strong></div>
            </CardHeader>);
        for (let key in this.props.hostVariables) {
            let varId = key.trim();
            retHTML.push(
                <CardBody id={varId} key={varId} style={{height:'50px'}}>
                    <Row>
                        <Col md="5"><Input  type="text" placeholder="Variable Key" required value={key}/></Col>
                        <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
                        <Col md="5"><Input type="text" placeholder="Variable Value" required value={this.props.hostVariables[key]}/></Col>
                        <Col md="1"><Button color="secondary" size="md">x</Button></Col>
                    </Row>
              </CardBody>
            );
        }
        return retHTML;
    }

    render() {
        if(this.props.active) {
            return (
                <div className="animated fadeIn">
                    <Card>
                        <CardHeader>
                            <strong>Variables</strong>
                        </CardHeader>
                        <div style={{height:"350px",marginBottom:"20px", overflowY:'scroll'}}>
                            {this.renderVariables()}
                            <CardHeader><strong>Groups</strong></CardHeader>
                            <CardBody>
                                Group data will be displayed here
                            </CardBody>
                            <CardHeader><strong>All</strong></CardHeader>
                            <CardBody>
                                All data will be displayed here
                            </CardBody>
                        </div>
                    </Card>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}
export default VariableComponent;
