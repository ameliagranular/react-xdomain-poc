import { Dispatch } from 'redux';

export type IDispatch<IPayload> = Dispatch<IAction<IPayload>>;

export interface IAction<T = any> {
    type: string;
    payload?: T;
}

export type IActionCreator<T> = (payload?: T) =>
    IAction<T>;

export type IActionDispatcher<IParam, IPayload> = (param?: IParam) =>
    (
        dispatch: Dispatch<IAction<IPayload>>,
        getState?: () => any,
        subscribe?: (f: () => void) => () => void
    ) => Promise<void>;

export type IActionCreatorProp<IParam> = (param?: IParam) => void;
export type IActionDispatcherProp<IParam> = (param?: IParam) => Promise<void>;
