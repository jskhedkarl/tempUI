import React, { Component } from 'react';
import Chart from '../../../components/Chart/Chart';
import BarChart from '../../../components/BarChart/BarChart';
import PieChart from '../../../components/PieChart/PieChart';
import Styles from '../Monitor/Monitor.css';
import {Grid, Col, Row} from 'react-bootstrap';
import {HostStats, ServerAPI} from '../../../ServerAPI';

const StatsCounter = 15;

class Monitor extends React.Component {
    constructor(props) {
        super(props)
        let stats = [];
        let server = ServerAPI.DefaultServer();
        let serverCtr = 0;
        for (serverCtr = 0; serverCtr < StatsCounter; serverCtr++) {
          stats.push(server.fetchMonitorDEMOStates(true));
        }
        //TODO::MN:: Need to calculate this rather then hard coded..
        let serviceCtr = 2;

        this.state = {
            hostStats: stats,
            serverCounter: serverCtr,
            serviceCounter: serviceCtr,
            oneSecTimer : undefined,
        };
        this.generateStats = this.generateStats.bind(this);
    }

    componentDidMount() {
        //setTimeout(this.generateStats, 1000, this);
        this.setState({
            oneSecTimer: setInterval(this.generateStats, 1000),
        });
    }
    
    componentWillUnmount() {
        this.state.oneSecTimer = null;
    }

    generateStats() {
        let server = ServerAPI.DefaultServer();
        let currStats = this.state.hostStats;
        for (let ctr = 0; ctr < StatsCounter - 1; ctr++) {
            let next = ctr + 1;
            currStats[ctr] = currStats[next];
        }
        let newStats = server.fetchMonitorDEMOStates(false);
        currStats[StatsCounter - 1] = newStats;
        this.setStatsState(currStats);
        
        //setTimeout(this.generateStats, 1000, this);
    }
    
    setStatsState(hostStat) {
        this.setState({
            hostStats: hostStat,
        });
    }

    //generateEmptyStats() {
    //    let stats = [];
    //    let server = ServerAPI.DefaultServer();
    //    for (let ctr = 0; ctr < StatsCounter; ctr++) {
    //        stats.push(server.fetchMonitorDEMOStates(true));
    //    }
    //    return stats;
    //}
  
    generateDiskPieObject(diskStats, diskLabels) {
        let obj = {
            labels: diskLabels,
            datasets: [{
                label: 'Disk Stats Data',
                data: diskStats,
                backgroundColor:[
                    '#b8c7d5',
                    '#b8cdca',
                    '#dbd9c6',
//                    '#e7dae1',
                ]
            }]
        };
        return obj;
    }
    
    generateCpuMemChartObject(cpuMemLabels, cpuStats, memoryStats) {
        let obj = {
            labels: cpuMemLabels,
            datasets: [{
                label: 'Cpu Stats',
                type: 'line',
                fill: false,
                data: cpuStats,
                borderColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
            }, {
                type: 'bar',
                label: 'Memory Stats Data',
                data: memoryStats,
                fill: false,
                backgroundColor: '#71B37C',
                borderColor: '#71B37C',
                hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',
                yAxisID: 'y-axis-1'
            }]
        };
        return obj;
    }
    
    generateEngixChartObject(labels, totalReqStats, activeConnStats, totalConnStats) {
        let obj = {
                labels: labels,
                datasets: [{
                    label: 'Total Requests',
                    type: 'line',
                    data: totalReqStats,
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
                    data: activeConnStats,
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: 'Total Connection',
                    data: totalConnStats,
                    fill: false,
                    backgroundColor: '#b8c7d5',
                    borderColor: '#b8cdca',
                    hoverBackgroundColor: '#dbd9c6',
                    hoverBorderColor: '#e7dae1',
                    yAxisID: 'y-axis-1'
                }]
            };
        return obj;
    }

    generateVarnishChartObject(labels, totalReqStats, cacheHitsStats, cacheMissStats) {
        let obj = {
                labels: labels,
                datasets: [{
                    label: 'Client Requests',
                    type: 'line',
                    data: totalReqStats,
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
                    label: 'Cache Hits',
                    data: cacheHitsStats,
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: 'Cache Misses',
                    data: cacheMissStats,
                    fill: false,
                    backgroundColor: '#b8c7d5',
                    borderColor: '#b8cdca',
                    hoverBackgroundColor: '#dbd9c6',
                    hoverBorderColor: '#e7dae1',
                    yAxisID: 'y-axis-1'
                }]
            };
        return obj;
    }

//
    renderHost(hostStat, diskPieObj, cpuMemObj, varnishObj, nginxObj) {
        return (
            <Row className="show-grid">
                <Col xs={12} md={2} className="borderTop">
                    <h6>{hostStat.hName}</h6><br />
                    <b>IP:</b> {hostStat.IPAddress}
                </Col>
                <Col xs={12} md={4} className="borderAllSide">
                    <Row>
                        <Col xs={12} md={9}><BarChart barChartData={cpuMemObj}/></Col>
                        <Col  xs={12} md={3}><PieChart pieChartData={diskPieObj}/></Col>
                    </Row>
                </Col>
                <Col xs={12} md={3} className="borderAllSide"><Chart lineChartData={varnishObj}/></Col>
                <Col xs={12} md={3} className="borderTop"><Chart lineChartData={nginxObj}/></Col>
            </Row>
        );
    }

    renderAllHostsAndServices() {
        let retHTML = [];
        let labels = [];

        let diskStatLabel = [];
        let invaderCpu = [];
        let invaderMem = [];
        let invaderDisk = [];
        let invaderVarnishClientReq = [];
        let invaderVarnishCacheHits = [];
        let invaderVarnishCacheMiss = [];
        let invaderNGINXTotalReq = [];
        let invaderNGINXActConn = [];
        let invaderNGINXTotalConn = [];

        let serverCpu = {};
        let serverMem = {};
        let serverDisk = {};
        let serverVarnishClientReq = {};
        let serverVarnishCacheHits = {};
        let serverVarnishCacheMiss = {};
        let serverNGINXTotalReq  = {};
        let serverNGINXActConn = {};
        let serverNGINXTotalConn = {};
        
        let invaderStat = undefined;
        // Generate Time Labels.
        
        let monitoredServers = {};
        for (let ctr = 0; ctr < StatsCounter; ctr++) {
            let monitorStat = this.state.hostStats[ctr];
            labels.push(monitorStat.timeLabel);
            
            invaderStat = monitorStat.invaderStats;
            invaderDisk = invaderStat.diskStats();  // effect of doing this is we pickup last stats in the array.
            diskStatLabel = invaderStat.diskStatsLabels();
            invaderCpu[ctr] = invaderStat.cpuStatsFunc();
            invaderMem[ctr] = invaderStat.memoryStatsFunc();
            let varnishStats = invaderStat.varnishStats();
            invaderVarnishClientReq[ctr] = varnishStats[0];
            invaderVarnishCacheHits[ctr] = varnishStats[1];
            invaderVarnishCacheMiss[ctr] = varnishStats[2];
            
            let enginxStats = invaderStat.enginxStats();
            invaderNGINXTotalReq[ctr] = enginxStats[0];
            invaderNGINXActConn[ctr] = enginxStats[1];
            invaderNGINXTotalConn[ctr] = enginxStats[2];

            for (let hostName in monitorStat.hostsStats) {
                let hostStats = monitorStat.hostsStats[hostName];
                if (!serverCpu[hostName]) {
                    monitoredServers[hostName] = hostName;
                    serverCpu[hostName] = [];
                    serverMem[hostName] = [];
                    serverDisk[hostName] = [];
                    serverVarnishClientReq[hostName] = [];
                    serverVarnishCacheHits[hostName] = [];
                    serverVarnishCacheMiss[hostName] = [];
                    serverNGINXTotalReq[hostName] = [];
                    serverNGINXActConn[hostName] = [];
                    serverNGINXTotalConn[hostName] = [];
                }
                serverCpu[hostName][ctr] = hostStats.cpuStatsFunc();
                serverMem[hostName][ctr] = hostStats.memoryStatsFunc();
                serverDisk[hostName] = hostStats.diskStats();
                let varnishStats = hostStats.varnishStats();
                serverVarnishClientReq[hostName][ctr] = varnishStats[0];
                serverVarnishCacheHits[hostName][ctr] = varnishStats[1];
                serverVarnishCacheMiss[hostName][ctr] = varnishStats[2];
                
                let sNginxStats = hostStats.enginxStats();
                serverNGINXTotalReq[hostName][ctr] = sNginxStats[0];
                serverNGINXActConn[hostName][ctr] = sNginxStats[1];
                serverNGINXTotalConn[hostName][ctr] = sNginxStats[2];
            }
        }
        
        let diskPieObj = this.generateDiskPieObject(invaderDisk, diskStatLabel);
        let cpuMemObj = this.generateCpuMemChartObject(labels, invaderCpu, invaderMem);
        let varnishObj = this.generateVarnishChartObject(labels, invaderVarnishClientReq, invaderVarnishCacheHits, invaderVarnishCacheMiss);
        let engixObj = this.generateEngixChartObject(labels, invaderNGINXTotalReq, invaderNGINXActConn, invaderNGINXTotalConn);
        retHTML.push(this.renderHost(invaderStat, diskPieObj, cpuMemObj, varnishObj, engixObj));
        
        for (let hostName in monitoredServers) {
            let sDiskPieObj = this.generateDiskPieObject(serverDisk[hostName], diskStatLabel);
            let sCpuMemObj = this.generateCpuMemChartObject(labels, serverCpu[hostName], serverMem[hostName]);
            let sVarnishObj = this.generateVarnishChartObject(labels, serverVarnishClientReq[hostName], serverVarnishCacheHits[hostName], serverVarnishCacheMiss[hostName]);
            let sEngixObj = this.generateEngixChartObject(labels, serverNGINXTotalReq[hostName], serverNGINXActConn[hostName], serverNGINXTotalConn[hostName]);
            retHTML.push(this.renderHost(invaderStat, sDiskPieObj, sCpuMemObj, sVarnishObj, sEngixObj));
        }
        return retHTML;
    }
  
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Service</h3>
                    </Col>
                </Row>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={2}>
                        </Col>
                        <Col xs={12} md={4} className="borderLeft">
                            <h5>System</h5>
                        </Col>
                        <Col xs={12} md={3} className="borderLeft">
                            <h5>Varnish[:80]</h5>
                        </Col>
                        <Col xs={12} md={3} className="borderLeft">
                            <h5>Nginx[:443]</h5>
                        </Col>
                    </Row>
                    {this.renderAllHostsAndServices()}
                </Grid>
            </div>
        );
    }
}


export default Monitor;
