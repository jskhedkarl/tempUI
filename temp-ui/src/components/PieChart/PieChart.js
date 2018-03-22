import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class PieChart extends Component{

    constructor(props){
        super(props);
        this.state = {
            chartData : {
                datasets:[
                    {
                        label: 'Data',
                        data:[
                            1000,
                            2000,
                            3000,
                            400
                        ],
                        backgroundColor:[
                            '#b8c7d5',
                            '#b8cdca',
                            '#dbd9c6',
                            '#e7dae1'  
                        ]
                    }
                ]
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
                      display: false,
                      scaleLabel: {
                        show: false,
                        labelString: 'Month'
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: false,
                      scaleLabel: {
                        show: false,
                        labelString: 'Value'
                      },
                      ticks: {
                        suggestedMin: -10,
                        suggestedMax: 250
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
                <Pie data={this.state.chartData} options={this.state.options} />
            </div>
        )
    }
}

export default PieChart;


