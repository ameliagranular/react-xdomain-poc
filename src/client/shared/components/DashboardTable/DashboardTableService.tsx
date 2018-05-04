import * as React from 'react';

interface IGenerateEmptyRowsAndColsOptions {
    useTh?: boolean;
}

export function generateEmptyRowsAndCols(numOfRows: number, numOfCols: number, {
    useTh = false
}: IGenerateEmptyRowsAndColsOptions= {}) {
    return new Array(numOfRows).fill(null).map(
        (row, rowIdx) => (
            <tr key={`00-${rowIdx}`}>
                {generateEmptyCols(numOfCols, { useTh })}
            </tr>
        )
    );
}

interface IGenerateEmptyColsOptions {
    useTh?: boolean;
}

export function generateEmptyCols(numOfCols: number, {
    useTh = false
}: IGenerateEmptyColsOptions= {}) {
    return new Array(numOfCols).fill(null).map(
        (col, colIdx) => useTh
        ? <th key={`00-${colIdx}`}>&nbsp;</th>
        : <td key={`00-${colIdx}`}>&nbsp;</td>
    );
}
