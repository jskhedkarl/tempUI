import React, {Component} from 'react';
import Chart from '../../../components/Chart/Chart';
import BarChart from '../../../components/BarChart/BarChart';
import PieChart from '../../../components/PieChart/PieChart';
import Styles from '../Monitor/Monitor.css';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

class Monitor extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <h3>SERVICE</h3>
          </Col>
        </Row>
        <Grid>
        <Row className="show-grid">
            <Col xs={12} md={2}>
            </Col>
            <Col xs={12} md={4} className="borderLeft">
              <h5>SYSTEM</h5>
            </Col>
            <Col xs={12} md={3} className="borderLeft">
              <h5>VARNISH[:80]</h5>
            </Col>
            <Col xs={12} md={3} className="borderLeft">
              <h5>NGINX[:443]</h5>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={2} className="borderTop">
              <h6>INVADER</h6><br/>
              <b>NAME:</b> INV7<br/>
              <b>IP:</b> 172.17.17.32
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
                <Col xs={12} md={8}><BarChart/></Col>
                <Col xs={12} md={4}><PieChart/></Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="borderAllSide">
              <Chart />
            </Col>
            <Col xs={12} md={3} className="borderTop">
              <Chart />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={2} className="borderTop">
              <h6>SERVER 1</h6><br/>
              <b>NAME:</b> SR1<br/>
              <b>IP:</b> 172.17.2.29<br/>
              <b>VIP:</b> 172.17.2.90
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
              <Col xs={12} md={8}><BarChart/></Col>
              <Col xs={12} md={4}><PieChart/></Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="borderAllSide">
              <Chart />
            </Col>
            <Col xs={12} md={3} className="borderTop">
              <Chart />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={2} className="borderTop borderBottom">
              <h6>SERVER 2</h6><br/>
              <b>NAME:</b> SR2<br/>
              <b>IP:</b> 172.17.2.23<br/>
              <b>VIP:</b> 172.17.2.91
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
              <Col xs={12} md={8}><BarChart/></Col>
              <Col xs={12} md={4}><PieChart/></Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="borderAllSide">
              <Chart />
            </Col>
            <Col xs={12} md={3} className="borderTop borderBottom">
              <Chart />
            </Col>
          </Row>
        </Grid>
        
      </div>      
    )
  }
}

export default Monitor;
