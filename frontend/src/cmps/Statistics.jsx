import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';


export class Statistics extends Component {
  
    getEventisType = () => {
        const data = this.props.eventis.reduce(function (acc, currVal) {
            if (!acc[currVal.category]) {
                acc[currVal.category] = 1;
            } else {
                acc[currVal.category] += 1;
            }
            return acc;
        }, {});

        return {
            types: Object.keys(data),
            prices: Object.values(data)
        }

    }


    render() {
        const { types, prices } = this.getEventisType();
        const data = {
            labels: types,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: ['#E6E6FA','#DDA0DD', '#DA70D6', '#9370DB'],
                    borderColor: 'rgba(192,192,192,0.3)',
                    borderWidth: 1,
                    hoverBackgroundColor: '#FFFFF',
                    hoverBorderColor: 'rgba(192,192,192,0.3)',
                    data: prices
                }
            ]
        };

        const options = {
            legend : {
                
                aspectRatio: 1,
                labels : {
                  fontColor : '#ffffff',
                  fontSize:20 
                }
            }
        }

        return (
            <div className="statistics">
                <Doughnut data={data} options={options}/>
            </div>
        )
    }
}
