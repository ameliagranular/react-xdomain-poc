import * as React from 'react';

import {v4 as uuidv4 } from 'uuid';
import { core as ZingChart } from 'zingchart-react';

import {
    IDashboardStackedBarsData
} from '../DashboardStackedBarsModel';

type IChartProps = IDashboardStackedBarsData;

export const Chart: React.StatelessComponent<IChartProps>
    = (props) => {
        const name = props.name
        ? (
            <div className="DashboardStackedBars_Chart_Name">
                {props.name}
            </div>
        ) : null;

        const amount = props.amount
        ? (
            <div className="DashboardStackedBars_Chart_Amount">
                {props.amount}
            </div>
        ) : null;

        return (
            <div className="DashboardStackedBars_Chart">
                {name}
                {generateZingChart(props.percentage, props.color, props.textColor)}
                {amount}
            </div>
        );
    };

Chart.defaultProps = {
    percentage: 0,
    color: '#FFFFFF', // white
    textColor: '#414141' // dark gray
};

function generateZingChart(percentage: number, color: string, textColor: string) {

    const restOfPercentage = 100 - percentage;

    const config = {
        'type': 'hbar',
        'plot': {
            'data-perc': percentage,
            'data-rest': restOfPercentage,
            'stacked': true,
            'value-box': {
                'font-family': 'Roboto',
                'font-size': '13px',
                'font-color': textColor
            },
            'tooltip': {
                'visible': false,
                // Hack to get tooltip not to display.
                // For some reason, { 'visible': false } isn't working.
                'y': '200%'
            }
        },
        'plotarea': {
            'margin': '0 0'
        },
        'scale-x': {
            'visible': false
        },
        'scale-y': {
            'visible': false
        },
        'series': [
            {
                'values': [percentage],
                'background-color': color,
                'value-box': {
                    'text': '%data-perc%',
                    'placement': 'top-in',
                    'rules': [
                        {
                            'rule': '%data-perc < 10',
                            'visible': false
                        }
                    ]
                }
            },
            {
                'values': [restOfPercentage],
                'background-color': '#D6D6D6', // light gray
                'value-box': {
                    'text': '%data-perc%',
                    'placement': 'bottom-in',
                    'rules': [
                        {
                            'rule': '%data-perc >= 10',
                            'visible': false
                        }
                    ]
                }
            }
        ]
    };

    return (
        <div className="DashboardStackedBars_Chart_ZingChart">
            <ZingChart
                id={`zingchart-${uuidv4()}`}
                height="100%"
                width="100%"
                data={config}
            />
        </div>
    );
}
