import * as React from 'react';
import * as classNames from 'classnames';

import {
    IDashboardCropPiesDataset,
    IDashboardCropPiesDatasets
} from './DashboardCropPiesModel';

import {
    Chart
} from './components/Chart';

export function generateEmptyTabs(numOfTabs: number) {
    const tabs = new Array(numOfTabs).fill(null).map(
        (tab, tabIdx) => (
            <button
                key={`00-${tabIdx}`}
                type="button"
                className="btn btn-sm btn-default"
            >
                &nbsp;
            </button>
        )
    );

    return <div className="btn-group">{tabs}</div>;
}

export function generateTabs(datasets: IDashboardCropPiesDatasets, selectedTabIdx: number) {
    const tabs = datasets.map(
        (d, idx) => (
            <button
                key={idx}
                type="button"
                onClick={d.onTabClick}
                className={classNames({
                    'btn': true,
                    'btn-sm': true,
                    'btn-default': true,
                    'active': idx === selectedTabIdx
                })}
            >
                {d.tab}
            </button>
        )
    );

    return <div className="btn-group">{tabs}</div>;
}

export function generateEmptyTabContent(numOfCharts: number) {
    return new Array(numOfCharts).fill(null).map(
        (chart, chartIdx) => (
            <Chart
                key={`00-${chartIdx}`}
                crop={{
                    cropTypeId: '0',
                    cropTypeElement: <span>&nbsp;</span>
                }}
                percentage={0}
            />
        )
    );
}

export function generateTabContentsForDatasets(
    emptyMessage: JSX.Element,
    datasets: IDashboardCropPiesDatasets,
    selectedTabIdx: number = 0
) {
    return datasets.map((d, idx) => {
        const tabContents = generateTabContentForDataset(emptyMessage, d.dataset);

        return (
            <div
                key={idx}
                className={classNames({
                    'DashboardCropPies_TabContent': true,
                    'hidden': idx !== selectedTabIdx
                })}
            >
                {tabContents}
            </div>
        );
    });
}

export function generateTabContentForDataset(
    emptyMessage: JSX.Element,
    dataset: IDashboardCropPiesDataset,
) {
    const hasData = dataset && dataset.length;

    if (!hasData) {
        return (
            <div className="DashboardCropPies_LoneMessage">
                {emptyMessage}
            </div>
        );
    }

    return dataset.map(
        (data, idx) => (
            <Chart
                key={data.crop.cropTypeId + (data.crop.cropProductId ? '--' + data.crop.cropProductId : '')}
                crop={data.crop}
                color={data.color}
                percentage={data.percentage}
                amount={data.amount}
            />
        )
    );
}
