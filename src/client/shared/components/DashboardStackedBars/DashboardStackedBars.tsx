/**
 * A reusable dashboard component for displaying a vertical stack of bar charts.
 */

import * as React from 'react';
import * as classNames from 'classnames';

import {
    IDashboardStackedBarsDataset
} from './DashboardStackedBarsModel';

import {
    generateCharts,
    generateEmptyCharts
} from './DashboardStackedBarsService';

import './DashboardStackedBars.scss';


export interface IDashboardStackedBarsProps {
    pending?: boolean;
    count?: number; // the number of entries you are anticipating
    title?: JSX.Element;
    description?: JSX.Element;
    link?: JSX.Element;
    emptyMessage?: JSX.Element;
    dataset?: IDashboardStackedBarsDataset;
    chartHasName?: boolean;
    chartHasAmount?: boolean;
}

const DashboardStackedBars: React.StatelessComponent<IDashboardStackedBarsProps>
    = (props) => {
        const isReady = !props.pending;
        const hasData = props.dataset && props.dataset.length;

        const title = props.title
        ? <h2 className="DashboardStackedBars_Title">{props.title}</h2>
        : null;

        const description = props.description
        ? <p className="DashboardStackedBars_Description">{props.description}</p>
        : null;

        const link = props.link
        ? <span className="DashboardStackedBars_Link">{props.link}</span>
        : null;

        if (isReady && !hasData) {
            const loneMessage = (
                <div className="DashboardStackedBars_LoneMessage">
                    {props.emptyMessage}
                </div>
            );

            return (
                <div className="DashboardStackedBars DashboardStackedBarsReady">
                    <div className="DashboardStackedBars_TitleBar">
                        {title}
                        {link}
                    </div>
                    {loneMessage}
                </div>
            );
        }

        const charts = isReady
        ? generateCharts(props.emptyMessage, props.dataset)
        : generateEmptyCharts(
            props.count,
            props.chartHasName,
            props.chartHasAmount
        );

        const main = (
            <div className="DashboardStackedBars_Main">
                {charts}
            </div>
        );

        return (
            <div
                className={classNames({
                    DashboardStackedBars: true,
                    DashboardStackedBarsPending: !isReady,
                    DashboardStackedBarsReady: isReady
                })}
            >
                <div className="DashboardStackedBars_TitleBar">
                    {title}
                    {link}
                </div>
                {description}
                {main}
            </div>
        );
    };

DashboardStackedBars.defaultProps = {
    pending: false,
    count: 5,
    title: null,
    description: null,
    link: null,
    emptyMessage: null,
    dataset: null,
    chartHasName: true,
    chartHasAmount: true
};

export { DashboardStackedBars };
