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

class PlaybookComp extends Component {

    constructor() {
        super();
        this.state = {
            childVisible: false, 
            playbooks : new ServiceManager().fetchAllPlaybookNames(), 
            playBookInUse: ''
        }
    }

    addEntry() {
        alert("To Add");
    }

    save() {
        alert("Saved");
    }

    showVariables(id) {
        this.setState({
            childVisible: true,
            playBookInUse: this.state.playbooks[id],
        });
    }
    
    renderPlaybooks() {
        let retHTML = [];
        let index = 0;
        for (let playbookIndex in this.state.playbooks) {
            let playbookName = this.state.playbooks[playbookIndex];
            let playbookId = playbookName.trim();
            let bgColor = playbookIndex % 2 ? 'rgb(237,237,237)': '';
            
            retHTML.push(
              <CardBody id={playbookId} style={{height:'50px', background:bgColor}} onClick={() => this.showVariables(playbookIndex)}>
                <strong>{playbookName}</strong>
              </CardBody>
            );
        }
        return retHTML;
    }
    

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong >Playbooks</strong>
                            </CardHeader>
                            <div style={{height:'300px', overflowY:'scroll'}}>
                            {this.renderPlaybooks()}
                            </div>
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
