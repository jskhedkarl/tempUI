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
      console.log(this.props.data);
      if(!this.props.data[this.props.playBook]){
          console.log('empty')
          this.props.data[this.props.playBook] = [{}]
          //this.props.data[this.props.playBook].concat([{key:'', value: ''}]);
          this.count = this.count + 1;
          this.props.data[this.props.playBook][this.count] = {key:'', value: ''};
      }else{
          console.log("count---> ",this.count)
          this.count=this.count+1;
          this.props.data[this.props.playBook][this.count] = {key:'', value: ''};
      }
      this.setState({ data: this.state.data.concat([{key:'', value: ''}]) });
      console.log(this.props.data[this.props.playBook]);
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
        console.log(this.props.data[this.props.playBook])
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
        console.log('----->this.props.playBook ' ,this.props.playBook)
        console.log('------>' , displayData)
     /*    if(!displayData){
            console.log('undefined')
            retHTML.push(
                <Row>
                    <Col xs="12" sm="5">
                        <div className="PaddingLeft10"><FormGroup>
                            <Label className="PaddingTop20">Key</Label>
                            <Input type="text" onBlur={(e) => this.handleChange(0, 'key', e.target.value)}
                                   required/>
                        </FormGroup>
                        </div>
                    </Col>
                    <Col xs="12" sm="5">
                        <FormGroup>
                            <Label className="PaddingTop20">Value</Label>
                            <Input type="text" onBlur={(e) => this.handleChange(0, 'value', e.target.value)}
                                   required/>
                        </FormGroup>
                    </Col>
                </Row>)

        }else{ */
            for (let idx in displayData) {
                let key = displayData[idx].key;
                let value = displayData[idx].value;
                retHTML.push(
                  <Row>
                    <Col xs="12" sm="5">
                    <div className="PaddingLeft10"><FormGroup>
                                {/* <Label>Key </Label> */}
                                <Input type="text" onBlur={(e) => this.handleChange(idx, 'key', e.target.value)}
                                        id={this.props.playBook+'$key@' + idx} placeholder={key} required/>
                                        {/* {key} */}
                            </FormGroup>
                          </div>
                      </Col>
                      <Col xs="12" sm="5">
                            <FormGroup>
                                {/* <Label>Value</Label> */}
                                <Input type="text" onBlur={(e) => this.handleChange(idx, 'value', e.target.value)}
                                       id={this.props.playBook+'$value@' + idx} placeholder={value} required/>
                                       {/* {value} */}
                            </FormGroup>
                      </Col>
                      <Col xs="12" sm="2">     
                            <Button hidden={idx==0} align="center" className="fontSize15" onClick={() => this.removeEntry(idx)} size="sm" color="light" ><b><strong>-</strong></b></Button>
                      </Col>
                    </Row>
                );
            }
        // }

        return retHTML;
    }

    render() {
        console.log('render() ->', this.props)
      console.log('render() ->', this.props.playBook)
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
                <Col xs="12" sm="5" align="center" className="padding10">Key</Col>
                <Col xs="12" sm="5" align="center" className="padding10">Value</Col>
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

