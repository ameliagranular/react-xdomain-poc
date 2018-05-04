export interface IDashboardStackedBarsData {
    key: string;
    name: JSX.Element;
    color?: string;
    textColor?: string;
    percentage: number;
    amount?: JSX.Element;
}

export type IDashboardStackedBarsDataset = IDashboardStackedBarsData[];
