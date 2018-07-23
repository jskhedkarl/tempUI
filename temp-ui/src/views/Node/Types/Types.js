import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert} from 'reactstrap';
import '../../views.css';
import {ServerAPI} from '../../../ServerAPI';
import SummaryDataTable from '../NodeSummary/SummaryDataTable';
import {typeHead} from '../../../consts'

class Types extends Component {

	
	constructor(props){
        super(props)
        this.state = {
            data:[],
            typeHead: typeHead,
            showDelete : false,
            selectedRowIndex: [],
            displayModel: false,
            visible: false,
            errorMsg: ''
        }
    }

    componentDidMount(){
        ServerAPI.DefaultServer().fetchAllSystemTypes(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(!data) {
            alert("No data received");
        }
        else {
            instance.setState({data: data,selectedRowIndex:[]});
        }
    }

    drawHeader(){
        return(<Row className="headerRow">
                <Col sm="1" className="head-name"></Col>
                <Col sm="11" className="pad" >
                        <Row>
                        <Col sm="2" className="head-name">Name</Col>
                        <Col sm="1" className="head-name">Vendor</Col>
                        <Col sm="1" className="head-name">Rack Unit</Col>
                        <Col sm="1" className="head-name">AirFlow</Col>
                        <Col sm="2" className="head-name">Front panel Interfaces</Col>
                        <Col sm="2" className="head-name">Speed Front Panel Interface</Col>
                        <Col sm="1" className="head-name">Management Interfaces</Col>
                        <Col sm="1" className="head-name">Speed/Type</Col>
                        <Col sm="1" className="head-name">Notes</Col>
                        </Row>
                    </Col>
                    </Row>)
    }

    drawtable(props=this.props){

        let {data} = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        if(data && data.length){
            let systypes = data;
            systypes.map( (systype,i) => {
               let row1 = 'headerRow2'

               if(i%2 === 0){
                   row1 = 'headerRow1'
               }
               if (i == systypes.length - 1) {
                row1 =  row1 +' headerRow3 '
                }
               let row  =  ( <Row className={row1}>
                <Col sm="1" className="pad"><Input className="marLeft40" type="checkbox" onChange={() => (this.checkBoxClick(i))}></Input></Col>
                <Col sm="11" className="pad" style={{ cursor: 'pointer' }} >
                    <Row>
                        <Col sm="2" className="pad">{systype.label}</Col>
                        <Col sm="1" className="pad">{systype.vendor}</Col>
                        <Col sm="1" className="pad">{systype.rackUnit}</Col>
                        <Col sm="1" className="pad">{systype.airflow}</Col>
                        <Col sm="2" className="pad">{systype.numFrontPanelInterface}</Col>
                        <Col sm="2" className="pad">{systype.speedFrontPanelInterface}</Col>
                        <Col sm="1" className="pad">{systype.numMgmtInterface}</Col>
                        <Col sm="1" className="pad">{systype.speedMgmtInterafce}</Col>
                        <Col sm="1" className="pad"></Col>
                    </Row>
                </Col>
               </Row>)
               rows.push(row)
           } )  
       }
        return rows 
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

    onDismiss() {
        this.setState({visible: false})
    }

    renderUpgradeModelDialog() {
        if (this.state.displayModel) {
            return (
                <Modal isOpen={this.state.displayModel} toggle={() => this.click()} size="lg" centered="true" >
                    <ModalHeader toggle={() => this.click()}>Add System Type</ModalHeader>
                    <ModalBody>
                    <Alert color="danger" isOpen={this.state.visible} toggle={() => this.onDismiss()}>{this.state.errorMsg}</Alert>
                        <Row>
                        <Col>Name: <Input className="marTop10" id='label' required={true}/><br />
                        Vendor: <Input className="marTop10" id='vendor'/><br />
                        Rack Unit: <Input className="marTop10" id='rackUnit'/><br />
                        AirFlow: <Input className="marTop10" id='airFlow'/><br /></Col><Col>
                        Front Panel Interface: <Input className="marTop10" type="number" min={1} max={32} id='noFPI'/><br />
                        Speed Front Panel Interface: <Input className="marTop10" id='SpeedFPI'/><br />
                        Management Interfaces: <Input className="marTop10" type="number" id='noMI'/><br />
                        Speed/Type: <Input className="marTop10" id='speedType' /><br /></Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addType())}>Add</Button>{'  '}
                        <Button outline color="primary" onClick={()=>(this.click())}>Cancel</Button>
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
            'NumFrontPanelInterface' : parseInt(document.getElementById('noFPI').value),
            'SpeedFrontPanelInterface' : document.getElementById('SpeedFPI').value,
            'NumMgmtInterface': parseInt(document.getElementById('noMI').value),
            'SpeedMgmtInterafce': document.getElementById('speedType').value
    }
    if(!a.Id) {
        this.setState({visible: true, errorMsg: 'Please enter the System Name'});
        return;
    }

    if(a.NumFrontPanelInterface > 32 || a.NumFrontPanelInterface < 1 || isNaN(a.NumFrontPanelInterface)) {
        this.setState({visible: true, errorMsg: 'Please enter a valid Front Panel Interface (between 1 and 32)'});
        return;
    }
    if(a.NumMgmtInterface > 32 || a.NumMgmtInterface < 1 || isNaN(a.NumMgmtInterface)) {
        this.setState({visible: true, errorMsg: 'Please enter a valid Management Interface'});
        return;
    }
        this.setState({visible: false})
        ServerAPI.DefaultServer().addSystemTypes(this.callback,this,a);
    }

    callback(instance, data) {
        let a = instance.state.data
        if(!a) {
           a = []
        }
        a.push(data)
        instance.setState({data: a, displayModel : !instance.state.displayModel})
    }

    showDeleteButton() {
        let a = [];
        if(this.state.showDelete == true) {
            a.push(<Button className="custBtn animated fadeIn" outline color="secondary" onClick={() => (this.deleteTypes())}>Delete</Button>);
            return a;
        }
        else   
            return null;
    }

    deleteTypes() {
        for( let i = 0; i < this.state.selectedRowIndex.length; i++) {
            ServerAPI.DefaultServer().deleteSystemType(this.callbackDelete,this,this.state.data[this.state.selectedRowIndex[i]].label);
        }
        this.setState({showDelete: !this.state.showDelete});
    }

    callbackDelete= (instance) => {
        ServerAPI.DefaultServer().fetchAllSystemTypes(this.retrieveData,this);
    }
    

    render() {
      
        let table = this.drawtable()
        return (
           <div>
                <div className='marginLeft10'>
                    <Button onClick={() => (this.click())} className="custBtn marginLeft13N" outline color="secondary">New</Button>
                    {this.showDeleteButton()}
                </div>
                <SummaryDataTable heading={this.state.typeHead} data={this.state.data} checkBoxClick={this.checkBoxClick} selectedRowIndexes={this.state.selectedRowIndex}/>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }

    

}

export default Types;