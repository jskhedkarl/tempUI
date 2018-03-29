import React, {Component} from 'react';
import {Line, Bar, defaults} from 'react-chartjs-2';
import Monitor from '../../views/Operation/Monitor/Monitor';

defaults.global.animation = false;

class BarChart extends Component{

    constructor(props){
        super(props);
        this.state = {
            options : {
                legend: {
                    display: false,
                },
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
                        display: false,
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

    componentDidCatch(error, info) {
        console.log("Bar Chart :: " + error + " :: " + info);
      }

    render(){
        return (
            <div>
                <Bar data={this.props.barChartData} options={this.state.options}/>
            </div>
        )
    }
}

export default BarChart;


