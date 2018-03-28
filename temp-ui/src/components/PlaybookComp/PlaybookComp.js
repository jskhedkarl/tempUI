import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import Variables from '../Variable/Variable';
import PlayBookSummary from './PlayBookSummary';
import Styles from './PlayBookSummary.css';
import ServiceManager from "../../services/serviceManager";


/*const listPlaybook = {
    'playbookName': [{'key': 'value'}]
}*/
const listPlaybook = {}

class PlaybookComp extends Component {

    constructor() {
        super();
        this.state = {
            childVisible: false, 
            playbooks : new ServiceManager().fetchAllPlaybookNames(), 
            playBookInUse: '',
            data: [{key: '', value: ''}],
            listPlaybook : listPlaybook,
        }
    }

    addEntry() {
        alert("To Add");
    }

    save() {
        alert("Saved");
    }

    showVariables(playbooks,id,event) {
      this.setState({
            childVisible: true,
            playBookInUse: this.state.playbooks[id],
        });

        for (let i = 0; i < playbooks.length; i ++) {
          
        }


        //listPlaybook[this.state.playBookInUse]
    }

    change(id) {
      for(let i = 0 ; i < this.state.playbooks.length; i++){
      document.getElementById(this.state.playbooks[i]).setAttribute("style", "background-color:white");
        // document.getElementById("@"+this.state.playbooks[i]).setAttribute("style", "background-color:rgb(255,255,255)");
        }
      document.getElementById(id).setAttribute("style", "background-color:rgb(189,189,189)");
    }

    
    renderPlaybooks() {
        let retHTML = [];
        let index = 0;
        for (let playbookIndex in this.state.playbooks) {
            let playbookName = this.state.playbooks[playbookIndex];
            let playbookId = playbookName.trim();
            let bgColor = playbookIndex % 2 ? 'rgb(255,255,255)': '';
            
            retHTML.push(
              <CardBody id={playbookId} style={{height:'50px', background:bgColor}} onClick={() => this.showVariables(this.state.playbooks,playbookIndex,event)}>
                <div id={'@'+playbookId} onClick={() => this.change(playbookId)}><strong>{playbookName}</strong></div>
              </CardBody>
            );
        }
        return retHTML;
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong className="fontBig">Playbooks</strong>
                            </CardHeader>
                            <div style={{height:'300px', overflowY:'scroll', cursor:'pointer'}}>
                            {this.renderPlaybooks()}
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        {
                          this.state.childVisible
                            ? <Variables onChange={() => this.render} playBook={this.state.playBookInUse}
                                         data={this.state.listPlaybook} 
                              />
                            : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col >
                      {
                      this.state.childVisible
                        ? <PlayBookSummary playBookGist={this.state.playBookInUse} displayData={listPlaybook[this.state.playBookInUse]}/>
                        : null
                    }
                    </Col>
                </Row>
                {console.log(listPlaybook)}
            </div>
        )
    }
}

export default PlaybookComp;
