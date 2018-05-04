/**
 * A reusable dashboard component for displaying a grid of pie charts, each for a single crop.
 */

import * as React from 'react';
import * as classNames from 'classnames';

import {
    IDashboardCropPiesDataset,
    IDashboardCropPiesDatasets
} from './DashboardCropPiesModel';

import {
    generateEmptyTabs,
    generateTabs,
    generateEmptyTabContent,
    generateTabContentForDataset,
    generateTabContentsForDatasets
} from './DashboardCropPiesService';

import './DashboardCropPies.scss';


export interface IDashboardCropPiesProps {
    pending?: boolean;
    pieCount?: number; // the number of pie charts you are anticipating
    title?: JSX.Element;
    emptyMessage?: JSX.Element;
    description?: JSX.Element;
    link?: JSX.Element;
    // use dataset if you don't need tabs
    dataset?: IDashboardCropPiesDataset;
    // use datasets if you need tabs
    datasets?: IDashboardCropPiesDatasets;
    tabCount?: number;
    selectedTabIdx?: number;
}

const DashboardCropPies: React.StatelessComponent<IDashboardCropPiesProps>
    = (props) => {
        const isReady = !props.pending;
        const hasTabs = !!props.tabCount || !!props.datasets;

        let title = null;
        let description = null;
        let link = null;
        let tabs = null;
        let tabContents = null;
        let content = null;
        let main = null;

        if (props.title) {
            title = <h2 className="DashboardCropPies_Title">{props.title}</h2>;
        }

        if (props.description) {
            description = <p className="DashboardCropPies_Description">{props.description}</p>;
        }

        if (props.link) {
            link = <span className="DashboardCropPies_Link">{props.link}</span>;
        }

        if (hasTabs) {
            tabs = isReady
                ? generateTabs(props.datasets, props.selectedTabIdx)
                : generateEmptyTabs(props.tabCount);

            tabContents = isReady
                ? generateTabContentsForDatasets(
                    props.emptyMessage,
                    props.datasets,
                    props.selectedTabIdx
                )
                : generateEmptyTabContent(props.pieCount);

            main = (
                <div className="DashboardCropPies_Main">
                    <div className="DashboardCropPies_Tabs">
                        {tabs}
                    </div>
                    <div
                        className={classNames({
                            'DashboardCropPies_TabContents': isReady,
                            'DashboardCropPies_TabContent': !isReady
                        })}
                    >
                        {tabContents}
                    </div>
                </div>
            );
        } else {
            content = isReady
                ? generateTabContentForDataset(props.emptyMessage, props.dataset)
                : generateEmptyTabContent(props.pieCount);

            main = (
                <div className="DashboardCropPies_Main">
                    <div className="DashboardCropPies_TabContents">
                        {content}
                    </div>
                </div>
            );
        }

        return (
            <div
                className={classNames({
                    DashboardCropPies: true,
                    DashboardCropPiesPending: !isReady,
                    DashboardCropPiesReady: isReady
                })}
            >
                <div className="DashboardCropPies_TitleBar">
                    {title}
                    {link}
                </div>
                {description}
                {main}
            </div>
        );
    };

DashboardCropPies.defaultProps = {
    pending: false,
    pieCount: 5,
    tabCount: 0,
    title: null,
    emptyMessage: null,
    description: null,
    link: null,
    selectedTabIdx: 0,
    dataset: null,
    datasets: null
};

export { DashboardCropPies };
