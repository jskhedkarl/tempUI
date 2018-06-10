import React, { Component } from 'react';
import Styles from './Summary.css';
import {Grid, Col, Row} from 'react-bootstrap';
import {HostStats, Host, ServerAPI} from '../../../ServerAPI';
import SummaryNode from './SummaryNode'

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            displayModel: false,
            modelTitle: "",
            modelDescription: "",
        };
        this.updateNodeSummary = this.updateNodeSummary.bind(this);
        this.displayModelDialog = this.displayModelDialog.bind(this);
        this.upgradeNode = this.upgradeNode.bind(this);
    }

    componentDidMount() {
        //ServerAPI.DefaultServer().fetchNodes(this.updateNodeSummary, this);
    }

    componentWillUnmount() {
        
    }

    updateNodeSummary(summaryObj) {
        
    }
    
    displayModelDialog(displayModel, modelTitle, modelDescription, confirmationCallback) {
        console.log(modelTitle+modelDescription);
    }
    
    upgradeNode(node, updateKernel, updateISO) {
        console.log(modelTitle+modelDescription);
    }

    renderNodesHeader() {
        return (
            <div key="node_header_id" className="SummaryHeaderView">
                <div className="Row">
                    <div className="Col-Header Col-Content1">Name/<br/>Serial Number</div>
                    <div className="Col-Header Col-Content2">Labels</div>
                    <div className="Col-Header Col-Content3">Type</div>
                    <div className="Col-Header Col-Content4">Linux Kernel</div>
                    <div className="Col-Header Col-Content5">Base Linux ISO</div>
                    <div className="Col-Header Col-Content6">CPU - Memory - Storage</div>
                    <div className="Col-Header Col-Content7">DNS Name</div>
                    <div className="Col-Header Col-Content8">GOES/<br/>CoreBoot<br/>Version</div>
                    <div className="Col-Header Col-Content9">BMC<br/>IP<br/>Address</div>
                </div>
            </div>
        );
    }
    
    renderNodesContent() {
        return (
            <div className="SummaryContentView">
                {this.renderNodes()}
            </div>
        );
    }
    
    renderNodes() {
        let retHTML = [];
        for (let node in this.state.nodes) {
            retHTML.push(
                <SummaryNode Node={node} ModelDialogCallback={this.displayModelDialog} upgradeNodeCallback={this.upgradeNode}/>
            );
        }
        return retHTML;
    }
    
    
    render() {
        return (
            <div>
                {this.renderNodesHeader()}
                {this.renderNodesContent()}
            </div>
        );
    }
}
export default Summary;
