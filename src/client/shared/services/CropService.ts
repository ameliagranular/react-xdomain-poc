/**
 * A service that provides utility functions for crops
 */

import { ICrops } from 'shared/modules/CropModule/CropModel';

export type ICropIds = ICropId[];
export type ICropId = ICropTypeIdObj | ICropProductIdObj;

interface ICropProductIdObj {
    cropTypeId?: string;
    cropProductId: string;
}

interface ICropTypeIdObj {
    cropTypeId: string;
    cropProductId?: string;
}

/**
 * Filters the given crops to an array of crops matching the cropIds.
 * The returned crops array will be of the same size as the given cropIds array.
 */
export function filterCrops(crops: ICrops, cropIds: ICropIds): ICrops {
    return cropIds.map(cropId => {
        let filteredCrops: ICrops;
        if (cropId.cropProductId) {
            filteredCrops = crops.filter(
                crop => crop.cropProductId === cropId.cropProductId
            );
            if (!filterCrops.length) {
                throw new Error(`Could not find a crop with Crop Product ID: ${cropId.cropProductId}`);
            }
        } else {
            filteredCrops = crops.filter(
                crop => crop.cropTypeId === cropId.cropTypeId && !crop.cropProductId
            );
            if (!filterCrops.length) {
                throw new Error(`Could not find a crop with Crop Type ID: ${cropId.cropTypeId}`);
            }
        }
        return filteredCrops[0];
    });
}
