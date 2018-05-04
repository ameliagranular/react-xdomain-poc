/**
 * A reusable dashboard component for displaying a table of data.
 */

import * as React from 'react';
import * as classNames from 'classnames';

import {
    generateEmptyCols,
    generateEmptyRowsAndCols
} from './DashboardTableService';

import './DashboardTable.scss';

export interface IDashboardTableProps {
    pending?: boolean;
    rowCount?: number;
    colCount?: number;
    title?: JSX.Element;
    emptyMessage?: JSX.Element;
    headerRow?: JSX.Element;
    rows?: JSX.Element[];
}

const DashboardTable: React.StatelessComponent<IDashboardTableProps>
    = (props) => {
        const isReady = !props.pending;
        const hasData = props.rows && props.rows.length;

        let title = null;
        let tHead = null;

        if (props.title) {
            title = isReady
            ? <h2 className="DashboardTable_Title">{props.title}</h2>
            : <h2 className="DashboardTable_Title">&nbsp;</h2>;
        }

        if (isReady && !hasData) {
            const loneMessage = (
                <div className="DashboardTable_LoneMessage">
                    {props.emptyMessage}
                </div>
            );

            return (
                <div className="DashboardTable DashboardTableReady">
                    {title}
                    {loneMessage}
                </div>
            );
        }

        if (props.headerRow) {
            tHead = isReady
            ? <thead>{props.headerRow}</thead>
            : (
                <thead>{
                    <tr>
                        {
                            generateEmptyCols(
                                props.colCount,
                                { useTh: true }
                            )
                        }
                    </tr>
                }</thead>
            );
        }

        const rows = isReady
        ? props.rows
        : generateEmptyRowsAndCols(
            props.rowCount,
            props.colCount
        );

        return (
            <div
                className={classNames({
                    DashboardTable: true,
                    DashboardTablePending: !isReady,
                    DashboardTableReady: isReady
                })}
            >
                {title}
                <table className="DashboardTable_Table table">
                    {tHead}
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    };

DashboardTable.defaultProps = {
    pending: false,
    rowCount: 5,
    colCount: 3,
    title: null,
    emptyMessage: null,
    headerRow: null,
    rows: null
};

export { DashboardTable };
