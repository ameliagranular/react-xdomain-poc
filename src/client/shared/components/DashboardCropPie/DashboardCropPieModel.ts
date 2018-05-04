export interface IDashboardCropPieData {
    cropTypes: ICropType[];
    cropProducts?: ICropProduct[];
    percentage: number;
    amount?: JSX.Element;
}

interface ICropType {
    cropTypeId: string;
    cropTypeElement: JSX.Element;
    cropTypeColor?: string;
}

interface ICropProduct {
    cropProductId: string;
    cropProductElement: JSX.Element;
}

export type IDashboardCropPieDataset = IDashboardCropPieData[];
