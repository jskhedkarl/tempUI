import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import VariableComponent from '../../views/Operation/Inventory/VariableComponent';
import PlayBookSummary from './PlayBookSummary';
import Styles from './PlayBookSummary.css';
import { ServerAPI, AnsibleVariable } from '../../ServerAPI';


class PlaybookComp extends Component {

    constructor(props) {
        super(props);
        let ansiVars = [];
        this.state = {
            childVisible: false, 
            playbooks : [], //new ServiceManager().fetchAllPlaybookNames(), 
            selectedPlaybookIndex: -1,
            data: [],
            playbookRunTransaction: [],
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
        let currArgs = this.state.data;
        currArgs[this.state.selectedPlaybookIndex] = variables;
        this.setState({
            data: currArgs,
        });
    }
    
    playVerifiedCurrentSelection() {
        if (this.state.selectedPlaybookIndex >= 0) {
            let playbookName = this.state.playbooks[this.state.selectedPlaybookIndex];
            let args = this.state.data[this.state.selectedPlaybookIndex];
            let server = ServerAPI.DefaultServer();
            server.runAnsiblePlaybook(playbookName, args, this.playSelectedPlaybookStateUpdated, this);
        }
    }
    
    queryTransactionStatus(instance) {
        let tran = instance.state.playbookRunTransaction[instance.state.selectedPlaybookIndex]
        let server = ServerAPI.DefaultServer();
        server.runAnsibleTransactionStatus(tran, instance.playSelectedPlaybookStateUpdated, instance);
    }
    
    playSelectedPlaybookStateUpdated(instance, transactionObj) {
        let trans = instance.state.playbookRunTransaction
        trans[instance.state.selectedPlaybookIndex] = transactionObj
        instance.setState({
            playbookRunTransaction: trans,
        });
        if (transactionObj.status > 0 && transactionObj.status < 10) { // UNCOMPLETED Transaction
            setTimeout(instance.queryTransactionStatus, 1000, instance);
        }
    }
    

    renderPlaybooks() {
//                    <div id={'@'+playbookId}>{playbookName}</div>
        let retHTML = [];
        let index = 0;
        for (let playbookIndex in this.state.playbooks) {
            let playbookName = this.state.playbooks[playbookIndex];
            let playbookId = playbookName.trim();
            let bgColor = playbookIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
            let description = "Playbook Descripton needs to be filled out and goes here.. If available.";
            
            retHTML.push(
                <CardBody pbindex={playbookIndex} id={playbookId} key={playbookId} style={{background:bgColor}} onClick={() => this.showPlaybookSelection(playbookId, playbookIndex, event)}>
                    <Row>
                        <Col><strong>{playbookName}</strong></Col>
                    </Row>
                    <Row>
                        <Col md="1"></Col>
                        <Col>{description}</Col>
                    </Row>
                </CardBody>
            );
        }
        return retHTML;
    }

    render() {
        let selectedIdx = this.state.selectedPlaybookIndex;
        let selectedPlaybook = selectedIdx > -1? this.state.playbooks[selectedIdx] : '';
        let selectedPlaybookArgs = this.state.data[selectedIdx] !== undefined? this.state.data[selectedIdx] : [];
        let transactionObj = this.state.playbookRunTransaction[selectedIdx]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong className="fontBig">Playbooks</strong>
                            </CardHeader>
                            <div style={{height:'370px', overflowY:'scroll', cursor:'pointer'}}>
                            {this.renderPlaybooks()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <VariableComponent 
                            active={this.state.childVisible}
                            playbookVariables = {selectedPlaybookArgs}
                            parentId = {selectedIdx}
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
                                    playBoookVariables={this.state.data[selectedIdx]}
                                    runVerifiedPlaybook={() => this.playVerifiedCurrentSelection()}
                                    playedTransactionId={transactionObj}
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
