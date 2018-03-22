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
const records = 3;
class PlaybookComp extends Component {

  constructor() {
    super();
    this.state = {
      childVisible: false
    }
  }

  addEntry() {
    alert("To Add");
  }

  save() {
    alert("Saved");
  }

  showVariables(id) {
    this.setState({childVisible: !this.state.childVisible});
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
                  <tr>
                    <td><Button onClick={() => this.showVariables(this)} size="bg" color="light" id="1"> <b>frr_isis_basic_reset.yml</b></Button></td>
                  </tr>
                  <tr>
                    <td><Button onClick={() => this.showVariables(this)} size="bg" color="light" id="2"> <b>10g_cr_fec_cl74_autoeng_off_lanes_1_count_4.yml</b></Button></td>
                  </tr>
                  <tr>
                    <td><Button onClick={() => this.showVariables(this)} size="bg" color="light" id="3"> <b>quagga-peering-abgp.yml</b></Button></td>
                  </tr>
                  <tr>
                    <td><Button onClick={() => this.showVariables(this)} size="bg" color="light" id="4"> <b>25g_cr_fec_none_autoeng_off.yml</b></Button></td>
                  </tr>
                  <tr>
                    <td><Button onClick={() => this.showVariables(this)} size="bg" color="light" id="5"> <b>40g_cr_fec_none_autoeng_off_lanes_4_count_1.yml</b></Button></td>
                  </tr>
                  </tbody>
         </Table>
        </Card>
        </Col>
        <Col xs="12" sm="6">
        {
          this.state.childVisible
            ? <Variables />
            : null
        }
        </Col>
        </Row>
        <Row>
          <Col >
          {
          this.state.childVisible
            ? <PlayBookSummary />
            : null
        }
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlaybookComp;
