import { getEndpoint } from 'shared/services/EndpointService';
import { ajaxCall, IAjaxServiceCallOptions } from 'shared/services/AjaxService';
import { IDemoCrop, INewDemoCrop } from './DemoCropModel';


const ENDPOINT = getEndpoint('/api/dummy/v1/crops');

class DemoCropResource {

    public static async all (options?: IAjaxServiceCallOptions): Promise<IDemoCrop[]> {
        const res = await ajaxCall({ url: ENDPOINT }, options);
        return res.data;
    }

    public static async one (id: number, options?: IAjaxServiceCallOptions): Promise<IDemoCrop> {
        const res = await ajaxCall({ url: `${ENDPOINT}/${id}` }, options);
        return res.data;
    }

    public static async create (crop: INewDemoCrop, options?: IAjaxServiceCallOptions): Promise<IDemoCrop> {
        const res = await ajaxCall({ method: 'POST', url: ENDPOINT }, options);
        return res.data;
    }

    public static async update (crop: IDemoCrop, options?: IAjaxServiceCallOptions): Promise<IDemoCrop> {
        const res = await ajaxCall({ method: 'PUT', url: `${ENDPOINT}/${crop.id}` }, options);
        return res.data;
    }

    public static async destroy (id: number, options?: IAjaxServiceCallOptions): Promise<IDemoCrop> {
        await ajaxCall({ method: 'DELETE', url: `${ENDPOINT}/${id}` }, options);
        return;
    }
}

export { DemoCropResource };
