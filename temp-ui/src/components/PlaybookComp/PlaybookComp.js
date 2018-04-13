import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
//import Variables from '../Variable/Variable';
import VariableComponent from '../../views/Operation/Inventory/VariableComponent';
import PlayBookSummary from './PlayBookSummary';
import Styles from './PlayBookSummary.css';
//import ServiceManager from "../../services/serviceManager";
import { ServerAPI, AnsibleVariable } from '../../ServerAPI';


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
            playbookRunTransaction: undefined,
        };
    }
    
    componentDidMount() {
        let server = ServerAPI.DefaultServer();
        server.fetchAllPlaybookNames(this.playbooksStateUpdated, this);
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
        this.setState({
            data: variables,
        });
    }
    
    playVerifiedCurrentSelection() {
        if (this.state.selectedPlaybookIndex >= 0) {
            let playbookName = this.state.playbooks[this.state.selectedPlaybookIndex];
            let args = this.state.data;
            let server = ServerAPI.DefaultServer();
            server.runAnsiblePlaybook(playbookName, args, this.playSelectedPlaybookStateUpdated, this);
        }
    }
    
    queryTransactionStatus(instance) {
        let server = ServerAPI.DefaultServer();
        server.runAnsibleTransactionStatus(instance.state.playbookRunTransaction, instance.playSelectedPlaybookStateUpdated, instance);
    }
    
    playSelectedPlaybookStateUpdated(instance, transactionObj) {
        instance.setState({
            playbookRunTransaction: transactionObj,
        });
        if (transactionObj.status > 0 && transactionObj.status < 10) { // UNCOMPLETED Transaction
            setTimeout(instance.queryTransactionStatus, 1000, instance);
        }
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
                            ?   <PlayBookSummary 
                                    selectedPlaybookName={selectedPlaybook} 
                                    playBoookVariables={this.state.data}
                                    runVerifiedPlaybook={() => this.playVerifiedCurrentSelection()}
                                    playedTransactionId={this.state.playbookRunTransaction}
                                />
                            : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PlaybookComp;
