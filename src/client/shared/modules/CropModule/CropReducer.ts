import { ICrops } from './CropModel';
import { IAction } from 'shared/models/ActionModel';
import { CROP_ACTION } from './CropActions';

export interface IState {
    fetching: boolean;
    loaded: boolean;
    data: ICrops;
}
const initState: IState = {
    fetching: false,
    loaded: false,
    data: null
};

export const CropReducer = (state = initState, action: IAction<any>): IState  => {
    switch (action.type) {
        case CROP_ACTION.CROPS_FETCHING:
            return {...state, fetching: true};
        case CROP_ACTION.CROPS_LOAD:
            return {...state, data: action.payload, fetching: false, loaded: true};
        default:
            return state;
    }
};
