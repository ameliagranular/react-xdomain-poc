import { IDemoCrop, INewDemoCrop } from '../DemoCropModel';

import { DemoCropMockData } from './data/DemoCropMockData';

interface IFakeDb {
    nextId: number;
    data: IDemoCrop[];
}

const FAKE_REQ_DELAY = 0;

const FAKE_DB: IFakeDb = {
    nextId: 4,
    data: DemoCropMockData
};

class DemoCropResource {

    public static all (): Promise<IDemoCrop[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(FAKE_DB.data);
            }, FAKE_REQ_DELAY);
        });
    }

    public static one (id: number): Promise<IDemoCrop> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = FAKE_DB.data.filter((crop) => crop.id === id);
                if (result.length) { resolve(result[0]); } else { resolve(null); }
            }, FAKE_REQ_DELAY);
        });
    }

    public static create (crop: INewDemoCrop): Promise<IDemoCrop> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const newCrop: IDemoCrop = {id: FAKE_DB.nextId, ...crop};
                FAKE_DB.data = FAKE_DB.data.concat(newCrop);
                FAKE_DB.nextId += 1;
                resolve(newCrop);
            }, FAKE_REQ_DELAY);
        });
    }

    public static update (crop: IDemoCrop): Promise<IDemoCrop> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                FAKE_DB.data = FAKE_DB.data.map(
                    (c) => c.id === crop.id ? crop : c
                );
                resolve(crop);
            }, FAKE_REQ_DELAY);
        });
    }

    public static destroy (id: number): Promise<IDemoCrop> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                FAKE_DB.data = FAKE_DB.data.filter((c) => c.id !== id);
                resolve();
            }, FAKE_REQ_DELAY);
        });
    }
}

export { DemoCropResource };
