import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import '../../views.css';
import { ServerAPI } from '../../../ServerAPI';
import SummaryDataTable from '../NodeSummary/SummaryDataTable';
import {kernelHead} from '../../../consts'

class LinuxKernel extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            kernelHead: kernelHead,
            showDelete : false,
            selectedRowIndex: [],
            displayModel: false
        }
    }

    componentDidMount() {
        ServerAPI.DefaultServer().fetchAllKernels(this.retrieveData, this);
    }

    retrieveData(instance, data) {
        if(!data) {
            alert("No data received");
        }
        else {
            instance.setState({data: data,selectedRowIndex:[]});
        }
    }


    drawHeader() {
        return (<Row className="headerRow">
            <Col sm="1" className="head-name">  </Col>
            <Col sm="4" className="head-name">Name</Col>
            <Col sm="4" className="head-name">Description</Col>
            {/* <Col sm="4" className="head-name">Applicable Type</Col> */}
        </Row>)
    }

    checkBoxClick = (rowIndex) =>{
        let { selectedRowIndex } = this.state
        let arrayIndex = selectedRowIndex.indexOf(rowIndex)
        if (arrayIndex > -1) {
            selectedRowIndex.splice(arrayIndex, 1)
        } else {
            selectedRowIndex.push(rowIndex)
        }
        if(this.state.selectedRowIndex.length > 0) {
            this.setState({showDelete : true});
        }
        else {
            this.setState({showDelete : false});
        }
    }

    
    showDeleteButton() {
        let a = [];
        if(this.state.showDelete == true) {
            a.push(<Button className="custBtn animated fadeIn" outline color="secondary" onClick={() => (this.deleteKernel())}>Delete</Button>);
            return a;
        }
        else   
            return null;
    }

    deleteKernel() {
        for( let i = 0; i < this.state.selectedRowIndex.length; i++) {
            ServerAPI.DefaultServer().deleteKernel(this.callbackDelete,this,this.state.data[this.state.selectedRowIndex[i]].label);
        }
        this.setState({showDelete: !this.state.showDelete});
    }

    callbackDelete(instance, data) {
        ServerAPI.DefaultServer().fetchAllKernels(instance.retrieveData,instance);
    }


    drawtable() {
        let { data } = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        if (data && data.length) {
            let kernel = data;
            kernel.map((linuxKernel, i) => {
                let row1 = 'headerRow2'

                if (i % 2 === 0) {
                    row1 = 'headerRow1'
                }
                if (i == kernel.length - 1) {
                    row1 = row1 + ' headerRow3 '
                }
                let row = (<Row className={row1}>
                    <Col sm="1" className="pad"><Input className="marLeft40" type="checkbox" onChange={() => (this.checkBoxClick(i))}></Input></Col>
                    <Col sm="4" className="pad">{linuxKernel.label}</Col>
                    <Col sm="4" className="pad">{linuxKernel.description}</Col>
                    {/* <Col sm="4" className="pad">{linuxKernel.value}</Col> */}
                </Row>)
                rows.push(row)
            })
        }
        return rows
    }

    renderUpgradeModelDialog() {
        if (this.state.displayModel) {
            return (
                <Modal isOpen={this.state.displayModel} size="sm" centered="true" >
                    <ModalHeader>Add Linux Kernel</ModalHeader>
                    <ModalBody>
                        Name: <Input className="marTop10" id='kernelName' /><br />
                        Description: <Input className="marTop10" id='kernelDesc' /><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={() => (this.addKernel())}>Add</Button>{'  '}
                        <Button outline color="primary" onClick={() => (this.cancel())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    cancel() {
        this.setState({ displayModel: !this.state.displayModel })
    }

    addKernel() {
        if(!document.getElementById('kernelName').value) {
            alert("Kernel Name cannot be empty");
            return;
        } 
        let a = {
            'Name': document.getElementById('kernelName').value,
            'Description': document.getElementById('kernelDesc').value
        }
        ServerAPI.DefaultServer().addKernel(this.callback, this, a);
    }

    callback(instance, data) {
        let a = instance.state.data
        if (!a) {
            a = []
        }
        a.push(data)
        instance.setState({ data: a, displayModel: !instance.state.displayModel })
    }


    render() {
        return (<div>
                <div className='marginLeft10'>
                    <Button onClick={() => (this.cancel())} className="custBtn animated fadeIn marginLeft13N" outline color="secondary">New</Button>
                    {this.showDeleteButton()}
                </div>
                <SummaryDataTable heading={this.state.kernelHead} data={this.state.data} checkBoxClick={this.checkBoxClick} selectedRowIndexes={this.state.selectedRowIndex}/>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }



}

export default LinuxKernel;