
// Remote

export interface ICropTypeRemote {
    crop_preferences: {
        abbreviation: string;
        application_unit_id: string;
        color: string;
        crop_type_id: string;
        id: string;
        is_active: boolean;
        organization_id: string;
        packaging_unit_id: string;
    };
    description: string;
    display_name: string;
    i18n: string;
    id: string;
    maturity_units: string;
    name: string;
    parent_crop_type_id: string;
    taxonomic_rank: string;
}

export type ICropTypesRemote = ICropTypeRemote[];

export interface ICropProductRemote {
    base_unit_id: string;
    crop_type_id: string;
    harvest_product: {
        display_name: string;
        i18n: string;
        id: string;
        name: string;
    };
    has_active_shrinkage: boolean;
    has_moisture_correction: boolean;
    id: string;
    inventory_unit_id: string;
    is_active: boolean;
    pricing_denominator_unit_id: string;
    pricing_numerator_unit_id: string;
    storage_unit_id: string;
    transfer_unit_id: string;
    unit_conversions: Array<{
        denominator: number;
        denominator_unit_id: string;
        id: string;
        numerator: number;
        numerator_unit_id: string;
    }>;
}

export type ICropProductsRemote = ICropProductRemote[];

// Local

export interface ICrop {
    displayName: string;
    cropTypeId: string;
    cropTypeDisplayName: string;
    cropTypeAbbr: string;
    cropTypeColor: string;
    cropProductId?: string;
    cropProductDisplayName?: string;
}

export type ICrops = ICrop[];
