import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
//import Variables from '../Variable/Variable';
import VariableComponent from '../../views/Operation/Inventory/VariableComponent';
import PlayBookSummary from './PlayBookSummary';
import Styles from './PlayBookSummary.css';
//import ServiceManager from "../../services/serviceManager";
import { ServerAPI, AnsibleVariable } from '../../ServerAPI';


/*const listPlaybook = {
    'playbookName': [{'key': 'value'}]
}*/
const listPlaybook = {}

class PlaybookComp extends Component {

    constructor(props) {
        super(props);
        let aVar = new AnsibleVariable("", "");
        let ansiVars = [];
        this.state = {
            childVisible: false, 
            playbooks : [], //new ServiceManager().fetchAllPlaybookNames(), 
            selectedPlaybookIndex: -1,
            data: ansiVars,
            listPlaybook : listPlaybook,
        }
    }
    
    componentDidMount() {
        let server = ServerAPI.DefaultServer();
        server.fetchAllPlaybookNames(this.playbooksStateUpdated, this);
    }

    addEntry() {
        alert("To Add");
    }

    save() {
        alert("Saved");
    }
    
    playbooksStateUpdated(instance, playbooksObj) {
        instance.setState({
            playbooks: playbooksObj,
        });
    }

    showPlaybookSelection(playbookId, index, event) {
        let selElement = document.getElementById(playbookId);
        if (!this.state.childVisible) { // No Previous Selection
            selElement.setAttribute("style", "background-color:rgb(189,189,189)");
            this.setState({
                childVisible: true,
                selectedPlaybookIndex: index,
            });
        } else {
            let prevName = this.state.playbooks[this.state.selectedPlaybookIndex];
            let prevSelElement = document.getElementById(prevName.trim());
            let selIndex = parseInt(prevSelElement.getAttribute("pbindex"))
            let bgColor = "background-color:" + ((selIndex % 2) ? 'rgb(255,255,255)': 'rgb(227,227,227)');
            prevSelElement.setAttribute("style", bgColor);
            
            if (this.state.selectedPlaybookIndex === index) { // Same selection or DE-SELECTION is make
                this.setState({
                    childVisible: false,
                    selectedPlaybookIndex: -1,
                });
            } else {  // New Selection is made
                selElement.setAttribute("style", "background-color:rgb(189,189,189)");
                this.setState({
                    childVisible: true,
                    selectedPlaybookIndex: index,
                });
            }
        }
    }
    
    handleSetVariables(variables) {
    }
    

    renderPlaybooks() {
        let retHTML = [];
        let index = 0;
        for (let playbookIndex in this.state.playbooks) {
            let playbookName = this.state.playbooks[playbookIndex];
            let playbookId = playbookName.trim();
            let bgColor = playbookIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
            
            retHTML.push(
              <CardBody pbindex={playbookIndex} id={playbookId} key={playbookId} style={{height:'50px', background:bgColor}} onClick={() => this.showPlaybookSelection(playbookId, playbookIndex, event)}>
                <div id={'@'+playbookId}>{playbookName}</div>
              </CardBody>
            );
        }
        return retHTML;
    }

/*
                        {
                          this.state.childVisible
                            ? <Variables onChange={() => this.render} playBook={selectedPlaybook}
                                         data={this.state.listPlaybook} 
                              />
                            : null
                        }
*/

    render() {
        let selectedIdx = this.state.selectedPlaybookIndex;
        let selectedPlaybook = selectedIdx > -1? this.state.playbooks[selectedIdx] : '';
        
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong className="fontBig">Playbooks</strong>
                            </CardHeader>
                            <div style={{height:'300px', overflowY:'scroll', cursor:'pointer'}}>
                            {this.renderPlaybooks()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                    <VariableComponent 
                            active={this.state.childVisible}
                            playbookVariables = {this.state.data}
                            setVariables={(variables) => this.handleSetVariables(variables)}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col >
                      {
                      this.state.childVisible
                        ? <PlayBookSummary playBookGist={selectedPlaybook} displayData={listPlaybook[selectedPlaybook]}/>
                        : null
                    }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PlaybookComp;
