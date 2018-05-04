import {
    ICropTypesRemote,
    ICropProductsRemote
} from '../../CropModel';

export const CropTypesMockDataRemote: ICropTypesRemote = [
    {
        display_name: 'Commercial Corn',
        name: 'commercial corn',
        description: null,
        taxonomic_rank: 'subspecies',
        parent_crop_type_id: '1001',
        crop_preferences: {
            abbreviation: 'CC',
            crop_type_id: '1111',
            color: '#FBE953',
            is_active: true,
            packaging_unit_id: '1111',
            organization_id: '1111',
            application_unit_id: '1111',
            id: '1111-1111'
        },
        i18n: 'CROP.CORN.COMMERCIAL',
        id: '1111',
        maturity_units: 'days'
    },
    {
        display_name: 'Commercial Soybeans',
        name: 'commercial soybeans',
        description: null,
        taxonomic_rank: 'subspecies',
        parent_crop_type_id: '2002',
        crop_preferences: {
            abbreviation: 'CS',
            crop_type_id: '2222',
            color: '#80AB46',
            is_active: true,
            packaging_unit_id: '2222',
            organization_id: '2222',
            application_unit_id: '2222',
            id: '2222-2222'
        },
        i18n: 'CROP.SOYBEAN.COMMERCIAL',
        id: '2222',
        maturity_units: 'group'
    },
    {
        display_name: 'Spring Oats',
        name: 'spring oats',
        description: null,
        taxonomic_rank: 'subspecies',
        parent_crop_type_id: '3003',
        crop_preferences: {
            abbreviation: 'SpOt',
            crop_type_id: '3333',
            color: '#E49D02',
            is_active: true,
            packaging_unit_id: '3333',
            organization_id: '3333',
            application_unit_id: '3333',
            id: '3333-3333'
        },
        i18n: 'CROP.OATS.SPRING',
        id: '3333',
        maturity_units: 'group'
    },
    {
        display_name: 'Soft Red Winter Wheat',
        name: 'soft red winter wheat',
        description: null,
        taxonomic_rank: 'subspecies',
        parent_crop_type_id: '4004',
        crop_preferences: {
            abbreviation: 'SRWW',
            crop_type_id: '4444',
            color: '#9E6501',
            is_active: true,
            packaging_unit_id: '4444',
            organization_id: '4444',
            application_unit_id: '4444',
            id: '4444-4444'
        },
        i18n: 'CROP.WHEAT.WINTER.RED.SOFT',
        id: '4444',
        maturity_units: 'group'
    },
    {
        display_name: 'Crop Type',
        name: 'crop type',
        description: null,
        taxonomic_rank: 'subspecies',
        parent_crop_type_id: '5005',
        crop_preferences: {
            abbreviation: 'CTCP',
            crop_type_id: '1010',
            color: '#D35E5E',
            is_active: true,
            packaging_unit_id: '1010',
            organization_id: '1010',
            application_unit_id: '1010',
            id: '1010-1010'
        },
        i18n: 'CROP.TYPE',
        id: '1010',
        maturity_units: 'group'
    }
];

export const CropProductaMockDataRemote: ICropProductsRemote = [
    {
        unit_conversions: [
            {
                denominator_unit_id: '1111',
                denominator: 1.0,
                numerator: 1.0,
                id: '1111',
                numerator_unit_id: '1111'
            }
        ],
        crop_type_id: '1111',
        transfer_unit_id: '1111',
        has_moisture_correction: false,
        pricing_numerator_unit_id: '1111',
        storage_unit_id: '1111',
        is_active: true,
        pricing_denominator_unit_id: '1111',
        has_active_shrinkage: true,
        harvest_product: {
            i18n: 'TAG.HARVEST_PRODUCT.GRAIN',
            display_name: 'TAG.HARVEST_PRODUCT.GRAIN',
            id: '1111-1111',
            name: 'grain'
        },
        inventory_unit_id: '1111',
        base_unit_id: '1111',
        id: '1111-1111'
    },
    {
        unit_conversions: [
            {
                denominator_unit_id: '2222',
                denominator: 1.0,
                numerator: 1.0,
                id: '2222',
                numerator_unit_id: '2222'
            }
        ],
        crop_type_id: '2222',
        transfer_unit_id: '2222',
        has_moisture_correction: false,
        pricing_numerator_unit_id: '2222',
        storage_unit_id: '2222',
        is_active: true,
        pricing_denominator_unit_id: '2222',
        has_active_shrinkage: true,
        harvest_product: {
            i18n: 'TAG.HARVEST_PRODUCT.GRAIN',
            display_name: 'TAG.HARVEST_PRODUCT.GRAIN',
            id: '2222-2222',
            name: 'grain'
        },
        inventory_unit_id: '2222',
        base_unit_id: '2222',
        id: '2222-2222'
    },
    {
        unit_conversions: [
            {
                denominator_unit_id: '3333',
                denominator: 1.0,
                numerator: 1.0,
                id: '3333',
                numerator_unit_id: '3333'
            }
        ],
        crop_type_id: '3333',
        transfer_unit_id: '3333',
        has_moisture_correction: false,
        pricing_numerator_unit_id: '3333',
        storage_unit_id: '3333',
        is_active: true,
        pricing_denominator_unit_id: '3333',
        has_active_shrinkage: true,
        harvest_product: {
            i18n: 'TAG.HARVEST_PRODUCT.GRAIN',
            display_name: 'TAG.HARVEST_PRODUCT.GRAIN',
            id: '3333-3333',
            name: 'grain'
        },
        inventory_unit_id: '3333',
        base_unit_id: '3333',
        id: '3333-3333'
    },
    {
        unit_conversions: [
            {
                denominator_unit_id: '4444',
                denominator: 1.0,
                numerator: 1.0,
                id: '4444',
                numerator_unit_id: '4444'
            }
        ],
        crop_type_id: '4444',
        transfer_unit_id: '4444',
        has_moisture_correction: false,
        pricing_numerator_unit_id: '4444',
        storage_unit_id: '4444',
        is_active: true,
        pricing_denominator_unit_id: '4444',
        has_active_shrinkage: true,
        harvest_product: {
            i18n: 'TAG.HARVEST_PRODUCT.GRAIN',
            display_name: 'TAG.HARVEST_PRODUCT.GRAIN',
            id: '4444-4444',
            name: 'grain'
        },
        inventory_unit_id: '4444',
        base_unit_id: '4444',
        id: '4444-4444'
    },
    {
        unit_conversions: [
            {
                denominator_unit_id: '1010',
                denominator: 1.0,
                numerator: 1.0,
                id: '1010',
                numerator_unit_id: '1010'
            }
        ],
        crop_type_id: '1010',
        transfer_unit_id: '1010',
        has_moisture_correction: false,
        pricing_numerator_unit_id: '1010',
        storage_unit_id: '1010',
        is_active: true,
        pricing_denominator_unit_id: '1010',
        has_active_shrinkage: true,
        harvest_product: {
            i18n: 'TAG.HARVEST_PRODUCT.CROP_PRODUCT',
            display_name: 'TAG.HARVEST_PRODUCT.CROP_PRODUCT',
            id: '1010-1010',
            name: 'product'
        },
        inventory_unit_id: '1010',
        base_unit_id: '1010',
        id: '1010-1010'
    }
];
