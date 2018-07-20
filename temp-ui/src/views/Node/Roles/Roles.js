import React, { Component } from 'react';
import {  Row, Col, Button,  Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert} from 'reactstrap';
import '../../views.css';
import {ServerAPI} from '../../../ServerAPI';
import SummaryDataTable from '../NodeSummary/SummaryDataTable';
import {roleHead} from '../../../consts'

class Roles extends Component {

	constructor(props){
        super(props)
        this.state = {
            data:[],
            roleHead: roleHead,
            displayModel: false,
            selectedRowIndex: [],
            selectedRows: [],
            showDelete: false,
            visible: false
        }
    }

    componentDidMount(){
        ServerAPI.DefaultServer().fetchAllRoles(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(data === undefined) {
            alert("No data received");
        }
        else {
                instance.setState({data: data,selectedRowIndex:[]});
        }
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
            a.push(<Button className="custBtn animated fadeIn" outline color="secondary" onClick={() => (this.deleteRole())}>Delete</Button>);
            return a;
        }
        else   
            return null;
    }

    renderUpgradeModelDialog() {
        if (this.state.displayModel) {
            return (
                <Modal isOpen={this.state.displayModel} size="sm" centered="true" >
                    <ModalHeader>Add Role</ModalHeader>
                    <ModalBody>
                    <Alert color="danger" isOpen={this.state.visible} toggle={() => this.onDismiss()} >Role Name cannot be empty</Alert>
                        Name: <Input className="marTop10" id='roleName'/><br />
                        Description: <Input className="marTop10" id='roleDesc' /><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addRole())}>Add</Button>{'  '}
                        <Button outline color="primary" onClick={()=>(this.click())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    click() {
        this.setState({displayModel : !this.state.displayModel})
    }
    onDismiss() {
        this.setState({visible : false});
    }
    

    addRole() {
        if(!document.getElementById('roleName').value) {
            this.setState({visible : true});
                return;
        }            
        let a = {
            'Name' : document.getElementById('roleName').value,
            'Description': document.getElementById('roleDesc').value
    }
        ServerAPI.DefaultServer().addRole(this.callback,this,a);
    }

    callback(instance, data) {
        let a = instance.state.data
        if(!a) {
           a = []
        }
        a.push(data)
        instance.setState({data: a, displayModel: !instance.state.displayModel})
    }

    deleteRole() {
        for( let i = 0; i < this.state.selectedRowIndex.length; i++) {
            ServerAPI.DefaultServer().deleteRole(this.callbackDelete,this,this.state.data[this.state.selectedRowIndex[i]].label);
        }
        this.setState({showDelete: !this.state.showDelete});
    }

    callbackDelete = (instance) => {
        ServerAPI.DefaultServer().fetchAllRoles(this.retrieveData,this);
    }

    render() { 
        let self = this;
        return (
           <div>
               <Row >
                    <Button className="custBtn animated fadeIn" id="add" outline color="secondary" onClick={() => (this.click())}>New</Button>
                    {this.showDeleteButton()}
               </Row>
               <SummaryDataTable heading={this.state.roleHead} data={this.state.data} checkBoxClick={this.checkBoxClick} selectedRowIndexes={this.state.selectedRowIndex}/>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }

    

}

export default Roles;