import React, {Component} from 'react';
import {Button, Card, CardHeader, FormGroup, Input, Label, Table, Col, Row} from 'reactstrap';
import Styles from'../Variable/Variable.css';

let listVariables = {}

export default class Variables extends Component {
  constructor() {
    super();
    this.count = 0;
    this.state = { name: '',
                   data: [{key:'', value:''}],
                   key : '',
                   value : '',
    };
  }

  addEntry(q) {     
      if(!this.props.data[this.props.playBook]){
          this.count = 0    
          this.props.data[this.props.playBook] = [{}]
      }
      this.props.data[this.props.playBook][this.count] = {key:'', value: ''}
      this.count++
      this.setState({ data: this.state.data.concat([{key:'', value: ''}])})
  }

  removeEntry(idx) {
    if(idx != 0){
        this.setState({ data: this.state.data.filter((s, sidx) => idx !== sidx) });
    }
    this.props.data[this.props.playBook][idx] = {};
    this.props.data[this.props.playBook].splice(idx,1)
    this.count--;
  }


    handleChange(index,type,value){
        if(!this.props.data[this.props.playBook]){
            this.props.data[this.props.playBook] = [{}]
        }else if (!this.props.data[this.props.playBook][index]){
            this.props.data[this.props.playBook][index] = {};
        }
        if('key' == type){
            this.props.data[this.props.playBook][index]['key'] = value;
        }if('value' == type) {
            this.props.data[this.props.playBook][index]['value'] = value;
        }

    }

    renderData() {
        let retHTML = [];
        let index = 0;
        let displayData = this.props.data[this.props.playBook]            
            for (let idx in displayData) {                
                let key = displayData[idx].key;
                let value = displayData[idx].value;                
                retHTML.push(
                  <Row>
                    <Col xs="12" sm="5">
                    <div className="PaddingLeft10"><FormGroup>
                                <Input type="text" placeholder = { displayData[idx].key } onBlur={(e) => this.handleChange(idx, 'key', e.target.value)}/>
                                         
                            </FormGroup>
                          </div>
                      </Col>
                      <Col xs="12" sm="5">
                            <FormGroup>
                                <Input type="text" placeholder = { displayData[idx].value } onBlur={(e) => this.handleChange(idx, 'value', e.target.value)} />                                        
                            </FormGroup>
                      </Col>
                      <Col xs="12" sm="2">     
                            <Button hidden={idx==0} align="center" className="fontSize15" onClick={() => this.removeEntry(idx)} size="sm" color="light" ><b><strong>-</strong></b></Button>
                      </Col>
                    </Row>
                );
            }
        return retHTML;
    }

    render() {
    return (

      <div className="animated fadeIn" id="variable" >
        <Card>
         <CardHeader align="left">
                <strong className="fontBig">Variables</strong>
                <Button className="floatRight" onClick={() => this.addEntry(this.props.playBook)} size="sm" color="secondary" ><b><strong>+</strong></b></Button>
         </CardHeader>
         <div style={{height:'300px', overflowY:'scroll', overflowX:'hidden'}}>
         <Row>
            <Col xs="12">
              <div id="divMain">
              <Row>
                <Col xs="12" sm="5" align="center" className="padding10"><strong>Key</strong></Col>
                <Col xs="12" sm="5" align="center" className="padding10"><strong>Value</strong></Col>
              </Row>
              {this.renderData()}
              </div>
           </Col>
         </Row>
         </div>
        </Card>
     </div>
    )
  }
}

