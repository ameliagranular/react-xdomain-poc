import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { core as ZingChart } from 'zingchart-react';

import {
    IDashboardCropPieDataset
} from '../DashboardCropPieModel';

interface IChartProps {
    chartId?: string;
    dataset: IDashboardCropPieDataset;
}

export const Chart: React.StatelessComponent<IChartProps>
    = (props) => {
        return (
            <div className="DashboardCropPie_Chart">
                <div className="DashboardCropPie_Chart_Chart">
                    {generateZingChart(props.dataset, props.chartId)}
                </div>
            </div>
        );
    };

function generateZingChart(
    dataset: IDashboardCropPieDataset,
    chartId?: string
) {

    const otherPercentage = dataset.map(
        d => d.percentage
    ).reduce(
        (total, curr) => total - curr > 0
            ? total - curr
            : 0,
        100
    );

    const config = {
        'type': 'pie',
        'plot': {
            'value-box': {
                'visible': false
            },
            'tooltip': {
                'visible': false
            },
            'detach': false,
            'offset-r': '3%'
        },
        'scale-r': {
            'ref-angle': 270
        },
        'series': [
            ...dataset.map(d => ({
                'values': [d.percentage],
                'background-color': d.cropTypes.map(x => x.cropTypeColor).join(' ')
            })),
            otherPercentage && {
                'values': [otherPercentage],
                'background-color': '#D6D6D6'
            }
        ]
    };

    return (
        <div className="DashboardCropPie_Chart_ZingChart">
            <ZingChart
                id={chartId || `zingchart-${uuidv4()}`}
                height="100%"
                width="100%"
                data={config}
            />
        </div>
    );
}
