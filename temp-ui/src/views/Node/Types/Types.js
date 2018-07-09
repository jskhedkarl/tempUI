import React, { Component } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class Types extends Component {

	
	constructor(props){
        super(props)
        this.state = {data:{}}
    }

    componentDidMount(){
        ServerAPI.DefaultServer().fetchAllNodeSetupInfo(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data.allSystemTypes});
        }
    }

    drawHeader(){
        return(<Row className="headerRow">
                    <Col sm="1" className="head-name">Name</Col>
                    <Col sm="1" className="head-name">Vendor</Col>
                    <Col sm="1" className="head-name">Rack Unit</Col>
                    <Col sm="2" className="head-name">AirFlow</Col>
                    <Col sm="1" className="head-name"># Front panel Interfaces</Col>
                    <Col sm="2" className="head-name">Speed/Type</Col>
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

export default Types;