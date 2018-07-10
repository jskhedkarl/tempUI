import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class Types extends Component {

	
	constructor(props){
        super(props)
        this.state = {
            data:[],
            displayModel: false
        }
    }

    componentDidMount(){
        ServerAPI.DefaultServer().fetchAllSystemTypes(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data});
        }
    }

    drawHeader(){
        return(<Row className="headerRow">
                    <Col sm="1" className="head-name">Name</Col>
                    <Col sm="1" className="head-name">Vendor</Col>
                    <Col sm="1" className="head-name">Rack Unit</Col>
                    <Col sm="2" className="head-name">AirFlow</Col>
                    <Col sm="1" className="head-name"># Front panel Interfaces</Col>
                    <Col sm="2" className="head-name">Speed Front Panel Interface</Col>
                    <Col sm="1" className="head-name"># Management Interfaces</Col>
                    <Col sm="1" className="head-name">Speed/Type</Col>
                    <Col sm="2" className="head-name">Notes</Col>
                </Row>)
    }

    drawtable(props=this.props){

        let {data} = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        console.log(data);
        if(data && data.length){
            let systypes = data;
            systypes.map( (systype,i) => {
               let row1 = 'headerRow2'

               if(i%2 === 0){
                   row1 = 'headerRow1'
               }
               let row  =  ( <Row className={row1}>
                    <Col sm="1" className="pad">{systype.label}</Col>
                    <Col sm="1" className="pad">{systype.vendor}</Col>
                    <Col sm="1" className="pad">{systype.rackUnit}</Col>
                    <Col sm="2" className="pad">{systype.airflow}</Col>
                    <Col sm="1" className="pad">{systype.numFrontPanelInterface}</Col>
                    <Col sm="2" className="pad">{systype.speedFrontPanelInterface}</Col>
                    <Col sm="1" className="pad">{systype.numMgmtInterface}</Col>
                    <Col sm="1" className="pad">{systype.speedMgmtInterafce}</Col>
                    <Col sm="2" className="pad"></Col>
                   </Row>)
               rows.push(row)
           } )  
       }
        return rows 
    }

    renderUpgradeModelDialog() {
        if (this.state.displayModel) {
            return (
                <Modal isOpen={this.state.displayModel} size="lg" centered="true" >
                    <ModalHeader>Add System Type</ModalHeader>
                    <ModalBody>
                        <Row>
                        <Col>Name: <Input id='label'/><br />
                        Vendor: <Input id='vendor'/><br />
                        Rack Unit: <Input id='rackUnit'/><br />
                        AirFlow: <Input id='airFlow'/><br /></Col><Col>
                        Front Panel Interface: <Input id='noFPI'/><br />
                        Speed Front Panel Interface: <Input id='SpeedFPI'/><br />
                        Management Interfaces: <Input id='noMI'/><br />
                        Speed/Type: <Input id='speedType' /><br /></Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addType())}>Add</Button>{'  '}
                        <Button outline color="secondary" onClick={()=>(this.click())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    click() {
        this.setState({displayModel : !this.state.displayModel})
    }

    addType() {
        let a = {
            'Id' : document.getElementById('label').value,
            'Vendor' : document.getElementById('vendor').value,
            'RackUnit' : document.getElementById('rackUnit').value,
            'Airflow' : document.getElementById('airFlow').value,
            'NumFrontPanelInterface' : document.getElementById('noFPI').value,
            'SpeedFrontPanelInterface' : document.getElementById('SpeedFPI').value,
            'NumMgmtInterface': document.getElementById('noMI').value,
            'SpeedMgmtInterafce': document.getElementById('speedType').value
    }
        ServerAPI.DefaultServer().addSystemTypes(this.callback,this,a);
    }

    callback(instance, data) {
        let a = instance.state.data
        if(!a) {
           a = []
        }
        a.push(data)
        instance.setState({data: a})
        instance.click();
    }
    

    render() {
      
        let table = this.drawtable()
        return (
           <div>
        
                { table}
                <br />
                <Button onClick={() => (this.click())}>New</Button>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }

    

}

export default Types;