import * as React from 'react';

import {
    Chart
} from './components/Chart';

import {
    CropLabel
} from 'shared/components/CropLabel';

import {
    IDashboardCropPieDataset
} from './DashboardCropPieModel';


export function generateEmptyChart(chartId?: string) {
    return <Chart key="00" dataset={[]} chartId={chartId} />;
}

export function generateChart(
    dataset: IDashboardCropPieDataset,
    chartId?: string
) {
    return <Chart dataset={dataset.filter(x => x.percentage)} chartId={chartId} />;
}

export function generateEmptyLegend(numOfEntries: number) {
    return new Array(numOfEntries).fill(null).map(
        (entry, entryIdx) => (
            <div className="DashboardCropPie_Legend_Crop" key={entryIdx}>
                <div className="DashboardCropPie_Legend_CropLabel">
                    <CropLabel
                        cropTypes={[{
                            cropTypeId: '0',
                            cropTypeElement: <span>&nbsp;</span>
                        }]}
                        cropProducts={[{
                            cropProductId: '0',
                            cropProductElement: <span>&nbsp;</span>
                        }]}
                    />
                </div>
                <div className="DashboardCropPie_Legend_CropValue">
                    <div className="DashboardCropPie_Legend_CropValue_Percentage">
                        {<span>&nbsp;</span>}%
                    </div>
                    <div className="DashboardCropPie_Legend_CropValue_Amount">
                        {<span>&nbsp;</span>}
                    </div>
                </div>
            </div>
        )
    );
}

export function generateLegend(dataset: IDashboardCropPieDataset) {
    return dataset.filter(x => x.percentage).map(
        (entry) => {
            const cropTypesKey = entry.cropTypes
                ? entry.cropTypes.map(x => x.cropTypeId).join('-')
                : '';
            const cropProductsKey = entry.cropProducts
                ? entry.cropProducts.map(x => x.cropProductId).join('-')
                : '';

            const elementKey = cropTypesKey + (cropProductsKey ? '--' : '') + cropProductsKey;

            return (
                <div className="DashboardCropPie_Legend_Crop" key={elementKey} >
                    <div className="DashboardCropPie_Legend_CropLabel">
                        <CropLabel
                            cropTypes={entry.cropTypes}
                            cropProducts={entry.cropProducts}
                        />
                    </div>
                    <div className="DashboardCropPie_Legend_CropValue">
                        <div className="DashboardCropPie_Legend_CropValue_Percentage">
                            {entry.percentage}%
                        </div>
                        <div className="DashboardCropPie_Legend_CropValue_Amount">
                            {entry.amount}
                        </div>
                    </div>
                </div>
            );
        }
    );
}
