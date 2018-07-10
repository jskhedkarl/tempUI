import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class BaseLinuxIso extends Component {

	
	constructor(props){
        super(props)
        this.state = {
            data:[],
            displayModel: false,
        }
    }

    componentDidMount(){
        // this.init();
        ServerAPI.DefaultServer().fetchAllIso(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data});
        }
    }


    drawHeader(){
        return(<Row className="headerRow">
                    <Col sm="3" className="head-name">Name</Col>
                    <Col sm="9" className="head-name">Description</Col>
                </Row>)
    }

    drawtable(){
        let {data} = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        if(data && data.length){
             let iso = data;
             iso.map( (baseLinuxIso,index) => {
                let head = ''
                if(index % 2 == 0) 
                   head = 'headerRow2'
                else   
                   head = 'headerRow1'
                let row  =  ( <Row className={head}>
                     <Col sm="3" className="pad">{baseLinuxIso.label}</Col>
                     <Col sm="9" className="pad">{baseLinuxIso.description}</Col>
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
                    <ModalHeader>Add Base Linux ISO</ModalHeader>
                    <ModalBody>
                        Name: <Input id='isoName'/><br />
                        Description: <Input id='isoDesc' /><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addRole())}>Add</Button>{'  '}
                        <Button outline color="secondary" onClick={()=>(this.cancel())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    cancel() {
        this.setState({displayModel : !this.state.displayModel})
    }

    addRole() {
        let a = {
            'Name' : document.getElementById('isoName').value,
            'Description': document.getElementById('isoDesc').value
    }
        ServerAPI.DefaultServer().addIso(this.callback,this,a);
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

export default BaseLinuxIso;