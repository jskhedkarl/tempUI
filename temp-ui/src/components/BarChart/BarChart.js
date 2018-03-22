import React, {Component} from 'react';
import {Line, Bar} from 'react-chartjs-2';

const plugins = [{
    afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 100, 100);
    }
}];

class Chart extends Component{

    constructor(props){
        super(props);
        this.state = {
            chartData : {
                labels: ['0', '20', '40', '60','80','100'],
            datasets: [{
                label: 'DATA 1',
                type:'line',
                data: [51, 65, 40, 49, 60, 37, 40],
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
                },{
                type: 'bar',
                label: 'DATA 2',
                data: [200, 185, 590, 621, 250, 400, 95],
                fill: false,
                backgroundColor: '#71B37C',
                borderColor: '#71B37C',
                hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',
                yAxisID: 'y-axis-1'
                }]
            },


            options : {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                  mode: 'label'
                },
                hover: {
                  mode: 'dataset'
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      scaleLabel: {
                        show: true,
                        labelString: 'Month'
                      }
                    }
                  ],
                  yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        labels: {
                          show: false
                        }
                      },
                      {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        labels: {
                          show: false
                        }
                      }
                  ]
                }
              }
        }
    }


    render(){
        return (
            <div>
                <Bar data={this.state.chartData} options={this.state.options} plugins={plugins}/>
            </div>
        )
    }
}

export default Chart;


