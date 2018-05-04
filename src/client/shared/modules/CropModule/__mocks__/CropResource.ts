import { CropMockData } from './data/CropMockData';
import { ICrops } from '../CropModel';

interface IFakeDb {
    data: ICrops;
}

const FAKE_REQ_DELAY = 0;

const FAKE_DB: IFakeDb = {
    data: CropMockData
};

class CropResource {

    public static all(): Promise<ICrops> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(FAKE_DB.data);
            }, FAKE_REQ_DELAY);
        });
    }
}

export { CropResource };
