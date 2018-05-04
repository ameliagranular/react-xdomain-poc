export interface IDashboardCropPiesData {
    crop: ICrop;
    color?: string;
    percentage: number;
    amount?: JSX.Element;
}

interface ICrop {
    cropTypeId: string;
    cropTypeElement: JSX.Element;
    cropTypeColor?: string;
    cropProductId?: string;
    cropProductElement?: JSX.Element;
}

export type IDashboardCropPiesDataset = IDashboardCropPiesData[];

export type IDashboardCropPiesDatasets = Array<{
    tab: JSX.Element;
    onTabClick: VoidFunction;
    dataset: IDashboardCropPiesDataset;
}>;
