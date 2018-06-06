import React, { Component } from 'react';
import Styles from './Summary.css';
import {Grid, Col, Row} from 'react-bootstrap';
//import {HostStats, Host, ServerAPI} from '../../../ServerAPI';


class Summary extends React.Component {
    constructor(props) {
        super(props)
        //this.state = {
        //};
        //
        //this.fetchNodeSummary = this.fetchNodeSummary.bind(this);
    }

    componentDidMount() {
    //    ServerAPI.DefaultServer().setupInventory(this.updateMonitorWithInventory, this);
    }
    
    componentWillUnmount() {
        
    }
    
    fetchNodeSummary(instance) {
            //let server = ServerAPI.DefaultServer();
            //server.fetchMonitorServerStat(this.updateStats, this);
            //setTimeout(instance.fetchStats, 3000, instance)
    } 

    render() {
//                    <Col style={{width: '60px' , height: '90px', backgroundColor:'green'}}>GOES/CoreBoot<br/>Version</Col>

        return (
            <div>
                <div className="SummaryHeaderView">
                    <div className="Row">
                        <div className="Col-Header Col-Content1">Name/<br/>Serial Number</div>
                        <div className="Col-Header Col-Content2">Labels</div>
                        <div className="Col-Header Col-Content3">Type</div>
                        <div className="Col-Header Col-Content4">Linux Kernel</div>
                        <div className="Col-Header Col-Content5">Base Linux ISO</div>
                        <div className="Col-Header Col-Content6">CPU - Memory - Storage</div>
                        <div className="Col-Header Col-Content7">DNS Name</div>
                        <div className="Col-Header Col-Content8">GOES/<br/>CoreBoot<br/>Version</div>
                        <div className="Col-Header Col-Content9">BMC<br/>IP<br/>Address</div>
                    </div>
                </div>
                <div className="SummaryContentView">
                    <div className="Row-Content" style={{top:'0px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">sjc01-pd1-1f01<br/>P1234567</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">Super Micro Server X</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">32-Core / 128GB / 128GB</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">www.example.com</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">11.12 /<br/>11.34</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">255.255.255.255</div>
                    </div>
                    <div className="Row-Content" style={{top:'3px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">sjc01-pd1-1f01<br/>P1234567</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">Super Micro Server X</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">32-Core / 128GB / 128GB</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">www.example.com</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">11.12 /<br/>11.34</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">255.255.255.255</div>
                    </div>
                    <div className="Row-Content" style={{top:'6px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">1</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'9px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">10</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'12px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">1</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'15px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">10</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'18px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">1</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'21px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">10</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'24px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">1</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'27px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">10</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'30px'}}>
                        <div className="Col-Content Col-Content1 Content-Active">1</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-Active">2</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-Active">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-Active">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-Active">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-Active">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-Active">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-Active">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-Active">9</div>
                    </div>
                    <div className="Row-Content" style={{top:'33px'}}>
                        <div className="Col-Content Col-Content1 Content-InActive">10</div>
                        <div className="Col-Sep Col-Sep1"></div>
                        <div className="Col-Content Col-Content2 Content-InActive">20</div>
                        <div className="Col-Sep Col-Sep2"></div>
                        <div className="Col-Content Col-Content3 Content-InActive">3</div>
                        <div className="Col-Sep Col-Sep3"></div>
                        <div className="Col-Content Col-Content4 Content-InActive">4</div>
                        <div className="Col-Sep Col-Sep4"></div>
                        <div className="Col-Content Col-Content5 Content-InActive">5</div>
                        <div className="Col-Sep Col-Sep5"></div>
                        <div className="Col-Content Col-Content6 Content-InActive">6</div>
                        <div className="Col-Sep Col-Sep6"></div>
                        <div className="Col-Content Col-Content7 Content-InActive">7</div>
                        <div className="Col-Sep Col-Sep7"></div>
                        <div className="Col-Content Col-Content8 Content-InActive">8</div>
                        <div className="Col-Sep Col-Sep8"></div>
                        <div className="Col-Content Col-Content9 Content-InActive">9</div>
                    </div>
                </div>
            </div>
        );
    }
}
/*
                        <div style={{width: '169px', height: '90px', backgroundColor:'red'}}>1</div>
                        <div style={{width: '169px', height: '90px', backgroundColor:'green'}}>2</div>
                        <div style={{width: '80px' , height: '90px', backgroundColor:'red'}}>3</div>
                        <div style={{width: '249px', height: '90px', backgroundColor:'green'}}>4</div>
                        <div style={{width: '200px', height: '90px', backgroundColor:'red'}}>5</div>
                        <div style={{width: '70px' , height: '90px', backgroundColor:'green'}}>6</div>
                        <div style={{width: '200px', height: '90px', backgroundColor:'red'}}>7</div>
                        <div style={{width: '60px' , height: '90px', backgroundColor:'green'}}>8</div>
                        <div style={{width: '169px', height: '90px', backgroundColor:'blue'}}>9</div>

*/
export default Summary;
