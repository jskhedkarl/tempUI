import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class LinuxKernel extends Component {

	
	constructor(props){
        super(props)
        this.state = { 
            data:[],
            displayModel: false
        }
    }

    componentDidMount(){
        // this.init();
        ServerAPI.DefaultServer().fetchAllKernels(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data});
        }
    }


    drawHeader(){
        return(<Row className="headerRow">
                    <Col sm="4" className="head-name">Name</Col>
                    <Col sm="4" className="head-name">Description</Col>
                    {/* <Col sm="4" className="head-name">Applicable Type</Col> */}
                </Row>)
    }

    drawtable(){
        let {data} = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        if(data && data.length){
             let kernel = data;
             kernel.map( (linuxKernel,index) => {
                 let head = ''
                 if(index % 2 == 0) 
                    head = 'headerRow2'
                 else   
                    head = 'headerRow1'
                let row  =  ( <Row className={head}>
                     <Col sm="4" className="pad">{linuxKernel.label}</Col>
                     <Col sm="4" className="pad">{linuxKernel.description}</Col>
                     {/* <Col sm="4" className="pad">{linuxKernel.value}</Col> */}
                    </Row>)
                rows.push(row)
            } )  
        }
        return rows 
    }

    renderUpgradeModelDialog() {
        if (this.state.displayModel) {
            return (
                <Modal isOpen={this.state.displayModel} size="sm" centered="true" >
                    <ModalHeader>Add Linux Kernel</ModalHeader>
                    <ModalBody>
                        Name: <Input id='kernelName'/><br />
                        Description: <Input id='kernelDesc' /><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addKernel())}>Add</Button>{'  '}
                        <Button outline color="secondary" onClick={()=>(this.cancel())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    cancel() {
        this.setState({displayModel : !this.state.displayModel})
    }

    addKernel() {
        let a = {
            'Name' : document.getElementById('kernelName').value,
            'Description': document.getElementById('kernelDesc').value
    }
        ServerAPI.DefaultServer().addKernel(this.callback,this,a);
    }

    callback(instance, data) {
        let a = instance.state.data
        if(!a) {
           a = []
        }
        a.push(data)
        instance.setState({data: a})
        instance.cancel();
    }


    render() {
        let table = this.drawtable()
        return (
           <div>
                { table}
                <br />
                <Button onClick={() => (this.cancel())}>New</Button>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }

    

}

export default LinuxKernel;