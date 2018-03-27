import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import Monitor from '../../views/Operation/Monitor/Monitor';

class PieChart extends Component{

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
        };
    }
    
    componentDidCatch(error, info) {
        console.log(error + " :: " + info);
      }

    //MN::TODO:: Need to add Props update function and only update props rather then whole chart..
    render(){
        return (
            <div>
                <Pie data={this.props.pieChartData} options={this.state.options} />
            </div>
        )
    }
}

export default PieChart;


