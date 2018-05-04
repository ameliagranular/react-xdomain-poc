/**
 * A reusable dashboard component for displaying a row of boxes, each for displaying a statistic.
 */

import * as React from 'react';
import * as classNames from 'classnames';

import './DashboardStatBoxes.scss';


interface IStatBoxProps {
    label: JSX.Element;
    val: JSX.Element;
}

const StatBox = (props: IStatBoxProps) => (
    <div className="DashboardStatBoxes_StatBox">
        <div className="DashboardStatBoxes_StatBox_Value">{props.val}</div>
        <div className="DashboardStatBoxes_StatBox_Label">{props.label}</div>
    </div>
);


export interface IDashboardStatBoxesProps {
    pending?: boolean;
    count?: number;
    elements?: IStatBoxProps[];
}

const DashboardStatBoxes: React.StatelessComponent<IDashboardStatBoxesProps>
    = (props) => {

        const isReady = !props.pending && !!props.elements;

        const elements = isReady
            ? props.elements
            : new Array(props.count).fill(null);

        return (
            <div
                className={classNames({
                    DashboardStatBoxes: true,
                    DashboardStatBoxesPending: !isReady,
                    DashboardStatBoxesReady: isReady
                })}
            >
                {
                    elements.map(
                        (d, i) =>
                            <StatBox
                                key={i}
                                label={d && d.label || <span>--</span>}
                                val={d && d.val || <span>--</span>}
                            />
                    )
                }
            </div>
        );
    };

DashboardStatBoxes.defaultProps = {
    pending: false,
    count: 1,
    elements: null,
};

export { DashboardStatBoxes };
