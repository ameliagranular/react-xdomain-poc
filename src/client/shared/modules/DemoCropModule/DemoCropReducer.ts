import { IDemoCrop } from './DemoCropModel';
import { IAction } from 'shared/models/ActionModel';
import { DEMO_CROP_ACTION } from './DemoCropActions';

export interface IState {
    loaded: boolean;
    data: IDemoCrop[];
}
const initState: IState = {
    loaded: false,
    data: []
};

export const DemoCropReducer = (state = initState, action: IAction<any>): IState  => {
    switch (action.type) {
        case DEMO_CROP_ACTION.DEMO_CROP_ADD:
            return {
                ...state,
                data: state.data.concat(action.payload)
            };
        case DEMO_CROP_ACTION.DEMO_CROP_REPLACE:
            return {
                ...state,
                data: state.data.map(
                    (crop) => crop.id === action.payload.id
                    ? action.payload
                    : crop
            )};
        case DEMO_CROP_ACTION.DEMO_CROP_REMOVE:
            return {
                ...state,
                data: state.data.filter(
                    (crop) => crop.id !== action.payload
                )
            };
        case DEMO_CROP_ACTION.DEMO_CROPS_LOAD:
            return {
                ...state,
                loaded: true,
                data: action.payload
            };
        default:
            return state;
    }
};
