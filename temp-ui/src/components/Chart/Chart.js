import React, {Component} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import Monitor from '../../views/Operation/Monitor/Monitor';

class Chart extends Component{

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

    render(){
        return (
            <div>
                <Bar data={this.props.lineChartData} options={this.state.options}/>
            </div>
        )
    }
}

export default Chart;


