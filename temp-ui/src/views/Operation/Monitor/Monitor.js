import React, { Component } from 'react';
import Chart from '../../../components/Chart/Chart';
import BarChart from '../../../components/BarChart/BarChart';
import PieChart from '../../../components/PieChart/PieChart';
import Styles from '../Monitor/Monitor.css';
import { Grid, Col, Row } from 'react-bootstrap';
import { StatsCPU,StatsMemory,StatsEginx } from '../../../ServerAPI';

class Monitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cpuStatsData0: new StatsCPU.SimulateObj(),
      cpuStatsData1: new StatsCPU.SimulateObj(),
      cpuStatsData2: new StatsCPU.SimulateObj(),
      cpuStatsData3: new StatsCPU.SimulateObj(),
      cpuStatsData4: new StatsCPU.SimulateObj(),
      cpuStatsData5: new StatsCPU.SimulateObj(),
      cpuStatsData6: new StatsCPU.SimulateObj(),
      cpuStatsData7: new StatsCPU.SimulateObj(),
      memoryStatsData0: new StatsMemory.SimulateObj(),
      memoryStatsData1: new StatsMemory.SimulateObj(),
      memoryStatsData2: new StatsMemory.SimulateObj(),
      memoryStatsData3: new StatsMemory.SimulateObj(),
      memoryStatsData4: new StatsMemory.SimulateObj(),
      memoryStatsData5: new StatsMemory.SimulateObj(),
      memoryStatsData6: new StatsMemory.SimulateObj(),
      memoryStatsData7: new StatsMemory.SimulateObj(),
      eginxStatsData0: new StatsEginx.SimulateObj(),
      eginxStatsData1: new StatsEginx.SimulateObj(),
      eginxStatsData2: new StatsEginx.SimulateObj(),
      eginxStatsData3: new StatsEginx.SimulateObj(),
      eginxStatsData4: new StatsEginx.SimulateObj(),
      eginxStatsData5: new StatsEginx.SimulateObj(),
      eginxStatsData6: new StatsEginx.SimulateObj(),
      eginxStatsData7: new StatsEginx.SimulateObj()
    }

     this.props = {
      barChartData: {
        labels: ['0', '20', '40', '60', '80', '100'],
        datasets: [{
          label: 'CPU STATS DATA',
          type: 'line',
          fill: false,
          data: [this.state.cpuStatsData0.idle, this.state.cpuStatsData1.idle, this.state.cpuStatsData2.idle, this.state.cpuStatsData3.idle, this.state.cpuStatsData4.idle, this.state.cpuStatsData5.idle, this.state.cpuStatsData6.idle, this.state.cpuStatsData7.idle],
          borderColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        }, {
          type: 'bar',
          label: 'MEMORY STATS DATA',
          data: [this.state.memoryStatsData0.free, this.state.memoryStatsData1.free, this.state.memoryStatsData2.free, this.state.memoryStatsData3.free, this.state.memoryStatsData4.free, this.state.memoryStatsData5.free, this.state.memoryStatsData6.free, this.state.memoryStatsData7.free],
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }]
      },
      lineChartData: {
        labels: ['0', '20', '40', '60', '80', '100'],
        datasets: [{
          label: 'Total Requests',
          type: 'line',
          data: [this.state.eginxStatsData0.totalRequests, this.state.eginxStatsData1.totalRequests, this.state.eginxStatsData2.totalRequests, this.state.eginxStatsData3.totalRequests, this.state.eginxStatsData4.totalRequests, this.state.eginxStatsData5.totalRequests, this.state.eginxStatsData6.totalRequests, this.state.eginxStatsData7.totalRequests],
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },{
          type: 'line',
          label: 'Active Connection',
          data: [this.state.eginxStatsData0.activeConnection, this.state.eginxStatsData1.activeConnection, this.state.eginxStatsData2.activeConnection, this.state.eginxStatsData3.activeConnection, this.state.eginxStatsData4.activeConnection, this.state.eginxStatsData5.activeConnection, this.state.eginxStatsData6.activeConnection, this.state.eginxStatsData7.activeConnection],
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }, {
          type: 'line',
          label: 'Total Connection',
          data: [this.state.eginxStatsData0.totalConnection, this.state.eginxStatsData1.totalConnection, this.state.eginxStatsData2.totalConnection, this.state.eginxStatsData3.totalConnection, this.state.eginxStatsData4.totalConnection, this.state.eginxStatsData5.totalConnection, this.state.eginxStatsData6.totalConnection, this.state.eginxStatsData7.totalConnection],
          fill: false,
          backgroundColor: '#b8c7d5',
          borderColor: '#b8cdca',
          hoverBackgroundColor: '#dbd9c6',
          hoverBorderColor: '#e7dae1',
          yAxisID: 'y-axis-1'
        }]
      }
    }
  }
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
              <h6>INVADER</h6><br />
              <b>NAME:</b> INV7<br />
              <b>IP:</b> 172.17.17.32
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
                <Col xs={12} md={8}><BarChart/></Col>
                <Col xs={12} md={4}><PieChart /></Col>
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
              <h6>SERVER 1</h6><br />
              <b>NAME:</b> SR1<br />
              <b>IP:</b> 172.17.2.29<br />
              <b>VIP:</b> 172.17.2.90
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
                <Col xs={12} md={8}><BarChart /></Col>
                <Col xs={12} md={4}><PieChart /></Col>
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
              <h6>SERVER 2</h6><br />
              <b>NAME:</b> SR2<br />
              <b>IP:</b> 172.17.2.23<br />
              <b>VIP:</b> 172.17.2.91
            </Col>
            <Col xs={12} md={4} className="borderAllSide">
              <Row>
                <Col xs={12} md={8}><BarChart/></Col>
                <Col xs={12} md={4}><PieChart /></Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="borderAllSide">
              <Chart />
            </Col>
            <Col xs={12} md={3} className="borderTop borderBottom">
              <Chart/>
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }
}
export default Monitor;
