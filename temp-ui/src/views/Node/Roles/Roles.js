import React, { Component } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class Roles extends Component {

	
	constructor(props){
        super(props)
        this.state = {data:{}}
    }

 /*    init(){
        let self = this
        const dataUrl = "http://172.17.146.60:8080/node/setup_info";
        fetch(dataUrl,{
            method: 'get',
        }).then(function(response) {
             if (response.status !== 200)
            return
        return response.json()
        }).then((items)=>{
            self.setState({data:items})
        }).catch(function(err) {
          console.log(err)
        });
        
    } */

    componentDidMount(){
        // this.init();
        ServerAPI.DefaultServer().fetchAllNodeSetupInfo(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data.allLabels});
        }
        console.log(data);
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

    render() { 
        let table = this.drawtable()
        return (
           <div>
                { table}
                <br />
                <Button>New</Button>
            </div> 
        );
    }

    

}

export default Roles;