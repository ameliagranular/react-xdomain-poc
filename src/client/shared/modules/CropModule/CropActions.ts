import {
    IActionCreator,
    IActionDispatcher,
    IActionCreatorProp,
    IActionDispatcherProp
} from 'shared/models/ActionModel';

import { ICrops } from './CropModel';
import { CropResource } from './CropResource';

// Action types
export enum CROP_ACTION {
    CROPS_FETCHING = 'CROPS_FETCHING',
    CROPS_LOAD = 'CROPS_LOAD',
}

// Action creators
export type IFetchingCropsAction = IActionCreator<void>;
export type IFetchingCropsActionProp = IActionCreatorProp<void>;

export type ILoadCropsAction = IActionCreator<ICrops>;
export type ILoadCropsActionProp = IActionCreatorProp<ICrops>;

export const fetchingCrops: IFetchingCropsAction =
    () => (
        {type: CROP_ACTION.CROPS_FETCHING}
    );

export const loadCrops: ILoadCropsAction =
    (data) => (
        {type: CROP_ACTION.CROPS_LOAD, payload: data}
    );

// Action dispatchers
export type IFetchCropsAction = IActionDispatcher<void, ICrops>;
export type IFetchCropsActionProp = IActionDispatcherProp<void>;

export const fetchCrops: IFetchCropsAction =
    () => {
        return async function (dispatch) {
            dispatch(fetchingCrops());
            const resultCrops = await CropResource.all();
            dispatch(loadCrops(resultCrops));
        };
    };
