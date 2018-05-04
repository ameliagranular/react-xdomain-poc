/**
 * A reusable dashboard component for displaying a single pie chart for multiple crops.
 */

import * as React from 'react';
import * as classNames from 'classnames';

import {
    IDashboardCropPieDataset
} from './DashboardCropPieModel';

import {
    generateChart,
    generateEmptyChart,
    generateLegend,
    generateEmptyLegend
} from './DashboardCropPieService';

import './DashboardCropPie.scss';


export interface IDashboardCropPieProps {
    pending?: boolean;
    count?: number; // the number of entries you are anticipating
    title?: JSX.Element;
    emptyMessage?: JSX.Element;
    dataset?: IDashboardCropPieDataset;
}

class DashboardCropPie extends React.Component<IDashboardCropPieProps> {

    public static defaultProps: IDashboardCropPieProps;

    public render() {
        const isReady = !this.props.pending;
        const hasData = this.props.dataset && this.props.dataset.length;

        const title = this.props.title
        ? <h2 className="DashboardCropPie_Title">{this.props.title}</h2>
        : null;


        if (isReady && !hasData) {
            const loneMessage = (
                <div className="DashboardCropPie_LoneMessage">
                    {this.props.emptyMessage}
                </div>
            );

            return (
                <div className="DashboardCropPie DashboardCropPieReady">
                    {title}
                    {loneMessage}
                </div>
            );
        }

        const chart = isReady
        ? generateChart(this.props.dataset)
        : generateEmptyChart();

        const legend = isReady
        ? generateLegend(this.props.dataset)
        : generateEmptyLegend(this.props.count);

        const main = (
            <div className="DashboardCropPie_Main">
                <div className="DashboardCropPie_Chart">
                    {chart}
                </div>
                <div className="DashboardCropPie_Legend">
                    {legend}
                </div>
            </div>
        );

        return (
            <div
                className={classNames({
                    DashboardCropPie: true,
                    DashboardCropPiePending: !isReady,
                    DashboardCropPieReady: isReady
                })}
            >
                {title}
                {main}
            </div>
        );
    }
}

DashboardCropPie.defaultProps = {
    pending: false,
    count: 5,
    title: null,
    emptyMessage: null,
    dataset: null
};

export { DashboardCropPie };
