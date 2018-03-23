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
import PlayBookSummary from './PlayBookSummary';
import ServiceManager from "../../services/serviceManager";
const records = 3;
class PlaybookComp extends Component {

  constructor() {
    super();
    this.state = {
      childVisible: false, playbooks : new ServiceManager().fetchAllPlaybookNames(), playBookInUse: ''
    }
  }

  addEntry() {
    alert("To Add");
  }

  save() {
    alert("Saved");
  }

  showVariables(id) {
    this.setState({childVisible: false});
    this.setState({childVisible: true});
    this.setState({playBookInUse: this.state.playbooks[id]})
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" sm="6">
        <Card>
         <CardHeader align="center">
                <strong >Playbooks</strong>
         </CardHeader>
         <Table>
                  <tbody align="left">

                  { this.state.playbooks.map((playbook,index) => (
                      <tr>
                        <td><Button onClick={() => this.showVariables(index)} size="bg" color="light" id={index}> <b>{playbook}</b></Button></td>
                      </tr>
                  ))
                  }

                  </tbody>
         </Table>
        </Card>
        </Col>
        <Col xs="12" sm="6">
        {
          this.state.childVisible
            ? <Variables playBook={this.state.playBookInUse}/>
            : null
        }
        </Col>
        </Row>
        <Row>
          <Col >
          {
          this.state.childVisible
            ? <PlayBookSummary playBookGist={this.state.playBookInUse}/>
            : null
        }
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlaybookComp;
