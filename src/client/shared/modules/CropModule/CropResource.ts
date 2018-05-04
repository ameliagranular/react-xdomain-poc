import { getEndpoint } from 'shared/services/EndpointService';
import { ajaxCall, IAjaxServiceCallOptions } from 'shared/services/AjaxService';
import {
    ICropTypesRemote,
    ICropProductsRemote,
    ICrops,
    ICrop
} from './CropModel';

const CROP_TYPES_ENDPOINT = getEndpoint('/api/crops/v1/cropTypes');
const CROP_PRODUCTS_ENDPOINT = getEndpoint('/api/crops/v1/cropProducts', {
    params: {
        activeOnly: true
    }
});

class CropResource {

    public static all (
        cropProductOptions?: IAjaxServiceCallOptions,
        cropTypeOptions?: IAjaxServiceCallOptions
    ): Promise<ICrops> {

        return new Promise((resolve, reject) => {
            const cropProductsPromise = ajaxCall({
                url: CROP_PRODUCTS_ENDPOINT
            }, { ...cropProductOptions, useCache: true });

            const cropTypesPromise = ajaxCall({
                url: CROP_TYPES_ENDPOINT
            }, { ...cropTypeOptions, useCache: true });

            Promise.all([
                cropProductsPromise,
                cropTypesPromise
            ]).then(([
                cropProductsResponse,
                cropTypesResponse
            ]) => {
                const converted = this.convertFromRemote(
                    cropProductsResponse.data,
                    cropTypesResponse.data
                );
                resolve(converted);
            });
        });
    }

    private static convertFromRemote(
        cropProductsRemote: ICropProductsRemote,
        cropTypesRemote: ICropTypesRemote
    ): ICrops {

        const cropTypes: ICrops = cropTypesRemote.map(cropType => ({
            displayName: cropType.display_name,
            cropTypeId: cropType.id,
            cropTypeDisplayName: cropType.display_name,
            cropTypeAbbr: cropType.crop_preferences.abbreviation,
            cropTypeColor: cropType.crop_preferences.color
        }));

        const cropProducts: ICrops = cropProductsRemote.map(cropProduct => {

            const cropType = cropTypes.filter((ct: ICrop) => ct.cropTypeId === cropProduct.crop_type_id)[0];

            if (!cropType) { return null; }

            const cropTypeDisplayName = cropType.displayName;
            let cropProductDisplayName = '';
            let displayName = cropTypeDisplayName;

            if (cropProduct.harvest_product) {

                // TODO fix for i18n ...
                //      fix this hack to capitalize the crop product
                //      since we are bypassing i8n for now
                cropProductDisplayName =
                cropProduct.harvest_product.name[0].toUpperCase() +
                cropProduct.harvest_product.name.slice(1);

                displayName = `${cropTypeDisplayName} - ${cropProductDisplayName}`;
            }

            return {
                displayName,
                cropTypeId: cropType.cropTypeId,
                cropTypeDisplayName,
                cropTypeAbbr: cropType.cropTypeAbbr,
                cropTypeColor: cropType.cropTypeColor,
                cropProductId: cropProduct.id,
                cropProductDisplayName
            };
        }).filter(x => x !== null);

        return [...cropTypes, ...cropProducts];
    }
}

export { CropResource };
