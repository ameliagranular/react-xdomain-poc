import {
    IActionCreator,
    IActionDispatcher,
    IActionCreatorProp,
    IActionDispatcherProp
} from 'shared/models/ActionModel';

import { IDemoCrop, INewDemoCrop } from './DemoCropModel';
import { DemoCropResource } from './DemoCropResource';


// Action types
export enum DEMO_CROP_ACTION {
    DEMO_CROP_ADD = 'DEMO_CROP_ADD',
    DEMO_CROP_REPLACE = 'DEMO_CROP_REPLACE',
    DEMO_CROP_REMOVE = 'DEMO_CROP_REMOVE',
    DEMO_CROPS_LOAD = 'DEMO_CROPS_LOAD',
}

// Action creators
export type ILoadDemoCropsAction = IActionCreator<IDemoCrop[]>;
export type ILoadDemoCropsActionProp = IActionCreatorProp<IDemoCrop[]>;

export type IAddDemoCropAction = IActionCreator<IDemoCrop>;
export type IAddDemoCropActionProp = IActionCreatorProp<IDemoCrop>;

export type IReplaceDemoCropAction = IActionCreator<IDemoCrop>;
export type IReplaceDemoCropActionProp = IActionCreatorProp<IDemoCrop>;

export type IRemoveDemoCropAction = IActionCreator<number>;
export type IRemoveDemoCropActionProp = IActionCreatorProp<number>;


export const loadDemoCrops: ILoadDemoCropsAction = (crops) => (
    {type: DEMO_CROP_ACTION.DEMO_CROPS_LOAD, payload: crops}
);
export const addDemoCrop: IAddDemoCropAction = (crop) => (
    {type: DEMO_CROP_ACTION.DEMO_CROP_ADD, payload: crop }
);
export const replaceDemoCrop: IReplaceDemoCropAction = (crop) => (
    {type: DEMO_CROP_ACTION.DEMO_CROP_REPLACE, payload: crop}
);
export const removeDemoCrop: IRemoveDemoCropAction = (id) => (
    {type: DEMO_CROP_ACTION.DEMO_CROP_REMOVE, payload: id}
);


// Action dispatchers
export type IFetchDemoCropsAction = IActionDispatcher<void, IDemoCrop[]>;
export type IFetchDemoCropsActionProps = IActionDispatcherProp<void>;

export type IFetchDemoCropAction = IActionDispatcher<number, IDemoCrop>;
export type IFetchDemoCropActionProp = IActionDispatcherProp<number>;

export type ICreateDemoCropAction = IActionDispatcher<INewDemoCrop, IDemoCrop>;
export type ICreateDemoCropActionProp = IActionDispatcherProp<INewDemoCrop>;

export type IUpdateDemoCropAction = IActionDispatcher<IDemoCrop, IDemoCrop>;
export type IUpdateDemoCropActionProp = IActionDispatcherProp<IDemoCrop>;

export type IDestroyDemoCropAction = IActionDispatcher<number, number>;
export type IDestroyDemoCropActionProp = IActionDispatcherProp<number>;


export const fetchDemoCrops: IFetchDemoCropsAction = () => {
    return async function (dispatch) {
        const resultDemoCrops = await DemoCropResource.all();
        dispatch(loadDemoCrops(resultDemoCrops));
    };
};

export const fetchDemoCrop: IFetchDemoCropAction = (id) => {
    return async function (dispatch) {
        const resultDemoCrop = await DemoCropResource.one(id);
        dispatch(replaceDemoCrop(resultDemoCrop));
    };
};

export const createDemoCrop: ICreateDemoCropAction = (crop) => {
    return async function (dispatch) {
        const resultDemoCrop = await DemoCropResource.create(crop);
        dispatch(addDemoCrop(resultDemoCrop));
    };
};

export const updateDemoCrop: IUpdateDemoCropAction = (crop) => {
    return async function (dispatch) {
        const resultDemoCrop = await DemoCropResource.update(crop);
        dispatch(replaceDemoCrop(resultDemoCrop));
    };
};

export const destroyDemoCrop: IDestroyDemoCropAction = (id) => {
    return async function (dispatch) {
        await DemoCropResource.destroy(id);
        dispatch(removeDemoCrop(id));
    };
};
