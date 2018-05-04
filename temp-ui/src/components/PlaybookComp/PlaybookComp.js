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
        //server.fetchAllPlaybookNames(this.playbooksStateUpdated, this);
        server.fetchAllActions(this.playbooksStateUpdated, this);
    }

    playbooksStateUpdated(instance, playbooksArray) {
        instance.setState({
            playbooks: playbooksArray,
        });
    }
    
    showActionSelection(actionId, index, event) {
        let selElement = document.getElementById(actionId);
        if (!this.state.childVisible) { // No Previous Selection
            selElement.setAttribute("style", "background-color:rgb(189,189,189)");
            this.setState({
                childVisible: true,
                selectedPlaybookIndex: index,
            });
        } else {
            let prevAction = this.state.playbooks[this.state.selectedPlaybookIndex];
            let prevSelElement = document.getElementById(prevAction.actionId);
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
    
    playVerifiedCurrentAction() {
        if (this.state.selectedPlaybookIndex >= 0) {
            let action = this.state.playbooks[this.state.selectedPlaybookIndex];
            let args = this.state.data[this.state.selectedPlaybookIndex];
            let server = ServerAPI.DefaultServer();
            server.runAnsiblePlaybook(action, this.playSelectedPlaybookStateUpdated, this);
        }
    }
    
    //playVerifiedCurrentSelection() {
    //    if (this.state.selectedPlaybookIndex >= 0) {
    //        let playbookName = this.state.playbooks[this.state.selectedPlaybookIndex];
    //        let args = this.state.data[this.state.selectedPlaybookIndex];
    //        let server = ServerAPI.DefaultServer();
    //        server.runAnsiblePlaybook(playbookName, args, this.playSelectedPlaybookStateUpdated, this);
    //    }
    //}
    
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
    
/*
export class Action {
    constructor(jsonObj) {
        this.actionId = jsonObj["id"];
        this.actionName = jsonObj["aName"];
        this.description = jsonObj["description"];
        this.keyValues = KeyValueStore.keyValuesFromJson(jsonObj["keyValues"]);
    }
    
export class KeyValueStore {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    
*/
    renderActions() {
//                    <div id={'@'+playbookId}>{playbookName}</div>
        let retHTML = [];
        let index = 0;
        for (let actionIndex in this.state.playbooks) {
            let actionObj = this.state.playbooks[actionIndex];
            let actionDisplayName = actionObj.actionName;
            let actionDescription = actionObj.description;
            let actionId = actionObj.actionId;
            let bgColor = actionIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
            let description = "";
            
            retHTML.push(
                <CardBody pbindex={actionIndex} id={actionId} key={actionId} style={{background:bgColor}} onClick={() => this.showActionSelection(actionId, actionIndex, event)}>
                    <Row>
                        <Col><h5>{actionDisplayName}</h5></Col>
                    </Row>
                    <Row>
                        <Col md="1"></Col>
                        <Col>{actionDescription}</Col>
                    </Row>
                </CardBody>
            );
        }
        return retHTML;
    }
    
//    renderPlaybooks() {
////                    <div id={'@'+playbookId}>{playbookName}</div>
//        let retHTML = [];
//        let index = 0;
//        for (let playbookIndex in this.state.playbooks) {
//            let playbookName = this.state.playbooks[playbookIndex];
//            let playbookDisplayName = playbookName.split(".yml")[0];
//            let playbookId = playbookName.trim();
//            let bgColor = playbookIndex % 2 ? 'rgb(255,255,255)': 'rgb(227,227,227)';
//            //let description = "Playbook Descripton needs to be filled out and goes here.. If available.";
//            let description = "";
//            
//            retHTML.push(
//                <CardBody pbindex={playbookIndex} id={playbookId} key={playbookId} style={{background:bgColor}} onClick={() => this.showPlaybookSelection(playbookId, playbookIndex, event)}>
//                    <Row>
//                        <Col><h5>{playbookDisplayName}</h5></Col>
//                    </Row>
//                    <Row>
//                        <Col md="1"></Col>
//                        <Col>{playbookName}</Col>
//                    </Row>
//                    <Row>
//                        <Col md="1"></Col>
//                        <Col>{description}</Col>
//                    </Row>
//                </CardBody>
//            );
//        }
//        return retHTML;
//    }

    render() {
        let selectedIdx = this.state.selectedPlaybookIndex;
        let selectedAction = selectedIdx > -1? this.state.playbooks[selectedIdx] : undefined;
        let selectedActionArgs = selectedAction !== undefined? selectedAction.keyValues : [];
        let transactionObj = this.state.playbookRunTransaction[selectedIdx]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <h2>Actions</h2>
                            </CardHeader>
                            <div style={{height:'370px', overflowY:'scroll', cursor:'pointer'}}>
                            {this.renderActions()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <VariableComponent 
                            active={this.state.childVisible}
                            playbookVariables = {selectedActionArgs}
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
                                    selectedPlaybookName={selectedAction.actionName} 
                                    playBoookVariables={selectedActionArgs}
                                    runVerifiedPlaybook={() => this.playVerifiedCurrentAction()}
                                    playedTransactionId={transactionObj}
                                />
                            : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }

    //render() {
    //    let selectedIdx = this.state.selectedPlaybookIndex;
    //    let selectedPlaybook = selectedIdx > -1? this.state.playbooks[selectedIdx] : '';
    //    let selectedPlaybookArgs = this.state.data[selectedIdx] !== undefined? this.state.data[selectedIdx] : [];
    //    let transactionObj = this.state.playbookRunTransaction[selectedIdx]
    //    return (
    //        <div className="animated fadeIn">
    //            <Row>
    //                <Col xs="12" sm="6">
    //                    <Card>
    //                        <CardHeader>
    //                            <h2>Actions</h2>
    //                        </CardHeader>
    //                        <div style={{height:'370px', overflowY:'scroll', cursor:'pointer'}}>
    //                        {this.renderActions()}
    //                        </div>
    //                    </Card>
    //                </Col>
    //                <Col xs="12" sm="6">
    //                    <VariableComponent 
    //                        active={this.state.childVisible}
    //                        playbookVariables = {selectedPlaybookArgs}
    //                        parentId = {selectedIdx}
    //                        setVariables={(variables) => this.handleSetVariables(variables)}
    //                    />
    //                </Col>
    //            </Row>
    //            <Row>
    //                <Col >
    //                    {
    //                        this.state.childVisible
    //                        ?   <PlayBookSummary 
    //                                selectedPlaybookName={selectedPlaybook} 
    //                                playBoookVariables={this.state.data[selectedIdx]}
    //                                runVerifiedPlaybook={() => this.playVerifiedCurrentSelection()}
    //                                playedTransactionId={transactionObj}
    //                            />
    //                        : null
    //                    }
    //                </Col>
    //            </Row>
    //        </div>
    //    );
    //}
}

export default PlaybookComp;
