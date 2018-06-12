import React, { Component } from 'react';
import Styles from './Summary.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
//var SelectBox = React.createFactory(require('react-select-box'))
//import 'react-select-box';
//import Dropdown from 'react-dropdown-multiselect'

class SummaryNode extends React.Component {
    constructor(props) {
        super(props);
        //props.ModelDialogCallback((displayModel, modelTitle, modelDescription, confirmationCallback))
        //props.upgradeNodeCallback((node, updateKernel, updateISO))
        this.state = {
            node: props.nodeObj,
            upgradeInProgress: props.upgradeInProgress,
            selectedLabels:["spine", "leaf", "k8Master"],
            selectedISO: "1",
            selectedKernel: "1",
            upgradeISOTo: null,
            upgradeKernelTo: null,
            selectedSystemType: props.nodePosition%2,
            xxxx: { value: 'two', label: 'Two'},
            ISOs : [
                {label: "Debain Jessie - Platina", value: "1", description: "Standard Debian Jessie 4.13, inclues GOES, Platina Factory Defaults"},
                {label: "Centos", value: "2", description: "Standard Centos"},
                {label: "Wipe", value: "3", description: "Wipe System Clean"},
            ],
            kernel: [
                {label: "4.13.0-platina-mk1-amd64", value: "1", description: "Standard Debian + plantina-mk1-ko"},
                {label: "4.13.0-Debian", value: "2", description: "Standard debian"},
            ],
            labels: [
                {label: "spine", value: "1", description: "Interconnect all leafs"},
                {label: "leaf", value: "2", description: "Top of rack, all servers connect to leaf"},
                {label: "k8Master", value: "3", description: "Kubernetes master node"},
                {label: "k8Worker", value: "4", description: "Kubernetes worker node"},
                {label: "etcD", value: "5", description: "Hosts for etcD"},
                {label: "cache", value: "6", description: "Available for http content cache"},
            ],
            systemType: [
                {label: "PS-3001", value: "1", description: ""},
                {label: "Super Micro x", value: "2", description: ""},
            ],
            colors: "red",
        };
        this.sbKernelSelectionChanged = this.sbKernelSelectionChanged.bind(this);
        this.sbISOSelectionChanged = this.sbISOSelectionChanged.bind(this);
        this.updateKernelConfirmation = this.updateKernelConfirmation.bind(this);
        this.updateISOConfiramation = this.updateISOConfiramation.bind(this);
    }

    componentDidMount() {
        //ServerAPI.DefaultServer().fetchNodes(this.updateNodeSummary, this);
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.upgradeInProgress != nextProps.upgradeInProgress)
        {
            this.setState({
                upgradeInProgress: nextProps.upgradeInProgress,
            });
        }
    }

    updateKernelConfirmation(confirmed) {
        console.log("updateKernelConfirmation, " + confirmed);
        if (confirmed) {
            this.props.upgradeNodeCallback(this.state.node, true, this.state.upgradeKernelTo);
            this.setState({
                selectedKernel: this.state.upgradeKernelTo.value,
                upgradeInProgress: true,
            });
        }
    }

    updateISOConfiramation(confirmed) {
        console.log("updateISOConfiramation, " + confirmed);
        if (confirmed) {
            this.props.upgradeNodeCallback(this.state.node, false, this.state.upgradeISOTo);
            this.setState({
                selectedKernel: this.state.selectedISO.value,
                upgradeInProgress: true,
            });
        }
    }

    sbKernelSelectionChanged(obj) {
        console.log("Selection Changed for Kernel");
        this.state.upgradeKernelTo = obj;
        this.props.modelDialogCallback(true, "Upgrade Kernel", "Update Kernel from xxxx to yyyy.", this.updateKernelConfirmation);
    }

    sbISOSelectionChanged(obj) {
        console.log("Selection Changed for ISO");
        this.state.upgradeISOTo = obj;
        this.props.modelDialogCallback(true, "Upgrade ISO", "Update IOS from xxxx to yyyy.", this.updateISOConfiramation);
    }

    columnClassName(columnId, withSelection) {
        let active = this.state.node%2;
        let colClasses = "Col-Content " + (active? "Content-Active ": "Content-InActive ");
        colClasses += "Col-Content" + columnId;
        if (withSelection) {
            colClasses += " Selection-DropDown";
        }
        return colClasses;
    }

    renderLinuxKernel(keyId) {
        if (this.state.selectedSystemType == 0 || 
            !this.props.upgradeInProgress) {
            return(<Select
                        key={keyId}
                        id={keyId}
                        name={keyId}
                        value={this.state.selectedKernel}
                        onChange={this.sbKernelSelectionChanged}
                        options={this.state.kernel}
                    />);
        } else {
            let kernelType = this.state.kernel[parseInt(this.state.selectedKernel, 10)].label;
            return(<div>{kernelType}</div>);
        }
    }

    renderLinuxISO(keyId) {
        if (this.state.selectedSystemType == 0|| 
            !this.props.upgradeInProgress) {
            return(
                <Select
                    key={keyId}
                    id={keyId}
                    name={keyId}
                    value={this.state.selectedISO}
                    onChange={this.sbISOSelectionChanged}
                    options={this.state.ISOs}
                />
            );
        } else {
            let typeISO = this.state.ISOs[parseInt(this.state.selectedISO, 10)].label;
            return(<div>{typeISO}</div>);
        }
    }

    renderNode() {
        let keyId = "NodeId_"+this.state.node.name;
        let selectId_1 = "SelectionNodeId_" + this.state.node + "_1";
        let selectId_2 = "SelectionNodeId_" + this.state.node + "_2";
        let selectId_3 = "SelectionNodeId_" + this.state.node + "_3";
        let selectedLabels = this.state.selectedLabels.join(", ");
        let selectedSystemType = this.state.systemType[this.state.selectedSystemType].label;
        let topStyle = (this.props.nodePosition * 3) + 'px';
        let styleObj={top:topStyle};
        return (
            <div key={keyId} id={keyId} className="Row-Content" style={styleObj}>
                <div className={this.columnClassName(1, false)}>sjc01-pd1-1f01<br/>P1234567</div>
                <div className="Col-Sep Col-Sep1"></div>
                <div className={this.columnClassName(2, true)}>
                    {selectedLabels}
                </div>
                <div className="Col-Sep Col-Sep2"></div>
                <div className={this.columnClassName(3, false)}>{selectedSystemType}</div>
                <div className="Col-Sep Col-Sep3"></div>
                <div className={this.columnClassName(4, true)}>{this.renderLinuxKernel(selectId_2)}</div>
                <div className="Col-Sep Col-Sep4"></div>
                <div className={this.columnClassName(5, true)}>{this.renderLinuxISO(selectId_3)}</div>
                <div className="Col-Sep Col-Sep5"></div>
                <div className={this.columnClassName(6, false)}>32-Core / 128GB / 128GB</div>
                <div className="Col-Sep Col-Sep6"></div>
                <div className={this.columnClassName(7, false)}>www.example.com</div>
                <div className="Col-Sep Col-Sep7"></div>
                <div className={this.columnClassName(8, false)}>11.12 /<br/>11.34</div>
                <div className="Col-Sep Col-Sep8"></div>
                <div className={this.columnClassName(9, false)}>255.255.255.255</div>
                </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderNode()}
            </div>
        );
    }
}
export default SummaryNode;
