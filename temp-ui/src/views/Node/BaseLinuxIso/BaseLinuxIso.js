import React, { Component } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import '../Summary/Summary.css';
import {ServerAPI} from '../../../ServerAPI';

class BaseLinuxIso extends Component {

	
	constructor(props){
        super(props)
        this.state = {data:{}}
    }

    componentDidMount(){
        // this.init();
        ServerAPI.DefaultServer().fetchAllNodeSetupInfo(this.retrieveData,this);
    }

    retrieveData(instance, data) {
        if(Object.keys(data).length) {
            instance.setState({data: data.allISOs});
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

export default BaseLinuxIso;