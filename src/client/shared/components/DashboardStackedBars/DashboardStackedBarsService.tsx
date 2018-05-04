import * as React from 'react';

import { Chart } from './components/Chart';
import {
    IDashboardStackedBarsDataset
} from './DashboardStackedBarsModel';


export function generateEmptyCharts(
    numOfCharts: number,
    chartHasName: boolean,
    chartHasAmount: boolean
) {
    return new Array(numOfCharts).fill(null).map(
        (chart, chartIdx) => (
            <Chart
                key={`00-${chartIdx}`}
                name={chartHasName ? <span>&nbsp;</span> : null}
                percentage={0}
                amount={chartHasAmount ? <span>&nbsp;</span> : null}
            />
        )
    );
}

export function generateCharts(
    emptyMessage: JSX.Element,
    dataset: IDashboardStackedBarsDataset,
) {
    const hasData = dataset && dataset.length;

    if (!hasData) {
        return (
            <div className="DashboardStackedBars_LoneMessage">
                {emptyMessage}
            </div>
        );
    }

    return dataset.map(
        (data, idx) => (
            <Chart
                key={data.key}
                name={data.name}
                color={data.color}
                textColor={data.textColor}
                percentage={data.percentage}
                amount={data.amount}
            />
        )
    );
}
