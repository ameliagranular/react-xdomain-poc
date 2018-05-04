/**
 * A reusable component for displaying the label of a Crop
 */

import * as React from 'react';
import './CropLabel.scss';

const DEFAULT_CROP_COLOR = '#F2F2F2';

interface ICropLabelProps {
    cropTypes: ICropLabelCropType[];
    cropProducts?: ICropLabelCropProduct[];
}

interface ICropLabelCropType {
    cropTypeId: string;
    cropTypeElement: JSX.Element;
    cropTypeColor?: string;
}

interface ICropLabelCropProduct {
    cropProductId: string;
    cropProductElement: JSX.Element;
}

export const CropLabel: React.StatelessComponent<ICropLabelProps>
    = (props) => {
        return (
            <div className="CropLabel">
                {
                    props.cropTypes && props.cropTypes.map((cropType) => (
                        <div
                            key={cropType.cropTypeId}
                            className="CropLabel_CropType"
                            style={{
                                background: cropType.cropTypeColor
                                ? cropType.cropTypeColor
                                : DEFAULT_CROP_COLOR
                            }}
                        >
                            {cropType.cropTypeElement}
                        </div>
                    ))
                }
                {
                    props.cropProducts && props.cropProducts.map((cropProduct) => (
                        <div key={cropProduct.cropProductId} className="CropLabel_CropProduct">
                            {cropProduct.cropProductElement}
                        </div>
                    ))
                }
            </div>
        );
    };

CropLabel.defaultProps = {
    cropTypes: null,
    cropProducts: null
};
