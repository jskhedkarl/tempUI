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
        this.props.addNewVariable();
    }

    removeVariable(key){
      this.props.removeVariables(key);
    }

    removeEntry(idx) {
        this.setState({pairs: this.state.pairs.filter((s, sidx) => idx !== sidx)});
    }

    renderVariables() {
        let retHTML = [];
        retHTML.push(
            <CardHeader>
                <strong>Host</strong>
                <div className="floatRight" onClick={() => this.addVariable()} ><Button><strong>+</strong></Button></div>
            </CardHeader>);
        for (let key in this.props.hostVariables) {
            let varId = key.trim();
            retHTML.push(
                <CardBody id={varId} key={varId} style={{height:'50px'}}>
                    <Row>
                        <Col md="5"><Input  type="text" placeholder="Variable Key" required value={key}/></Col>
                        <Col md="1"><strong style={{textAlign:"center"}}>:</strong></Col>
                        <Col md="5"><Input type="text" placeholder="Variable Value" required value={this.props.hostVariables[key]}/></Col>
                        <Col md="1"><Button color="secondary" size="md" onClick={()=>(this.removeVariable(key))}>x</Button></Col>
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
                        <div style={{height:"290px",marginBottom:"20px", overflowY:'scroll'}}>
                            {this.renderVariables()}
                            <CardHeader style={{marginTop:"20px"}}><strong>Groups</strong></CardHeader>
                            <CardBody>
                                Group data will be displayed here
                            </CardBody>
                            <CardHeader style={{marginTop:"20px"}}><strong>All</strong></CardHeader>
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
