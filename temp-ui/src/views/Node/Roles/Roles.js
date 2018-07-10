import React, { Component } from 'react';
import { Container, Row, Col, Button,  Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap';
import '../Roles/Roles.css';
import {ServerAPI} from '../../../ServerAPI';

   
    

class Roles extends Component {

	
	constructor(props){
        super(props)
        this.state = {
            data:[],
            displayModel: false,
        }
    }

    componentDidMount(){
        ServerAPI.DefaultServer().fetchAllRoles(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(!data) {
            alert("No data received");
        }
        else {
            if(Object.keys(data).length) {
                instance.setState({data: data});
            }
        }
        
    }

    drawHeader(){
        return(
        <Row className="headerRow">
            <Col sm="3" className="head-name">Name</Col>
            <Col sm="9" className="head-name">Description</Col>
        </Row>
        )
    }

    drawtable(){
        let {data} = this.state
        let rows = []
        let header = this.drawHeader()
        rows.push(header)
        if(data && data.length){
             let roles = data;
             roles.map( (role,i) => {
                let row1 = 'headerRow1'

                if(i%2 === 0){
                    row1 = 'headerRow2'
                }
                let row  =  ( <Row className={row1}>
                     <Col sm="3" className="pad">{role.label}</Col>
                     <Col sm="9" className="pad">{role.description}</Col>
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
                    <ModalHeader>Add Role</ModalHeader>
                    <ModalBody>
                        Name: <Input id='roleName'/><br />
                        Description: <Input id='roleDesc' /><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={()=>(this.addRole())}>Add</Button>{'  '}
                        <Button outline color="secondary" onClick={()=>(this.click())}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    click() {
        this.setState({displayModel : !this.state.displayModel})
    }

    addRole() {
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
        instance.setState({data: a})
        instance.click();
    }



    render() { 
        let table = this.drawtable()
        return (
           <div>
                {table}
                <br />
                <Button className="overflow" onClick={() => (this.click())}>New</Button>
                {this.renderUpgradeModelDialog()}
            </div> 
        );
    }

    

}

export default Roles;