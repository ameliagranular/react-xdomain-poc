import * as React from 'react';

import {v4 as uuidv4 } from 'uuid';
import { core as ZingChart } from 'zingchart-react';

import {
    CropLabel
} from 'shared/components/CropLabel';

import {
    IDashboardCropPiesData
} from '../DashboardCropPiesModel';

type IChartProps = IDashboardCropPiesData;

export const Chart: React.StatelessComponent<IChartProps>
    = (props) => {
        const crop = (
            <div className="DashboardCropPies_Chart_Crop">
                <CropLabel
                    cropTypes={[{
                        cropTypeId: props.crop.cropTypeId,
                        cropTypeElement: props.crop.cropTypeElement,
                        cropTypeColor: props.crop.cropTypeColor || '#FFFFFF'
                    }]}
                    cropProducts={
                        props.crop.cropProductId && props.crop.cropProductElement &&
                        [{
                            cropProductId: props.crop.cropProductId,
                            cropProductElement: props.crop.cropProductElement
                        }]
                    }
                />
            </div>
        );

        const numbers = props.amount
        ? (
            <div className="DashboardCropPies_Chart_Numbers">
                <div className="DashboardCropPies_Chart_Percentage">
                    {props.percentage}%
                </div>
                <div className="DashboardCropPies_Chart_Amount">
                    {props.amount}
                </div>
            </div>
        )
        : (
            <div className="DashboardCropPies_Chart_Numbers">
                <div className="DashboardCropPies_Chart_Percentage">
                    {props.percentage}%
                </div>
            </div>
        );

        return (
            <div className="DashboardCropPies_Chart">
                <div className="DashboardCropPies_Chart_Chart">
                    {generateZingChart(props.percentage, props.color)}
                    {crop}
                </div>
                {numbers}
            </div>
        );
    };

Chart.defaultProps = {
    color: '#FFFFFF'
};

function generateZingChart(percentage: number, color: string) {
    const config = {
        'type': 'pie',
        'plot': {
            'value-box': {
                'visible': false
            },
            'tooltip': {
                'visible': false
            },
            'detach': false
        },
        'scale-r': {
            'ref-angle': 270
        },
        'series': [
            {
                'values': [percentage > 100 ? 100 : percentage],
                'background-color': color
            },
            percentage < 100 &&
            {
                'values': [100 - percentage],
                'background-color': '#D6D6D6'
            }
        ]
    };

    return (
        <div className="DashboardCropPies_Chart_ZingChart">
            <ZingChart
                id={`zingchart-${uuidv4()}`}
                height="100%"
                width="100%"
                data={config}
            />
        </div>
    );
}
