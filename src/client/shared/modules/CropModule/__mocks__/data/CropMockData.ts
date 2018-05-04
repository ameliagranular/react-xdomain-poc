import { ICrops } from '../../CropModel';

export const CropMockData: ICrops = [

    // CropTypes
    {
        displayName: 'Commercial Corn',
        cropTypeId: '1111',
        cropTypeDisplayName: 'Commercial Corn',
        cropTypeAbbr: 'CC',
        cropTypeColor: '#FBE953'
    },
    {
        displayName: 'Commercial Soybeans',
        cropTypeId: '2222',
        cropTypeDisplayName: 'Commercial Soybeans',
        cropTypeAbbr: 'CS',
        cropTypeColor: '#80AB46'
    },
    {
        displayName: 'Spring Oats',
        cropTypeId: '3333',
        cropTypeDisplayName: 'Spring Oats',
        cropTypeAbbr: 'SpOt',
        cropTypeColor: '#E49D02'
    },
    {
        displayName: 'Soft Red Winter Wheat',
        cropTypeId: '4444',
        cropTypeDisplayName: 'Soft Red Winter Wheat',
        cropTypeAbbr: 'SRWW',
        cropTypeColor: '#9E6501'
    },
    {
        displayName: 'Crop Type',
        cropTypeId: '1010',
        cropTypeDisplayName: 'Crop Type',
        cropTypeAbbr: 'CTCP',
        cropTypeColor: '#D35E5E'
    },

    // CropProducts
    {
        displayName: 'Commercial Corn - Grain',
        cropTypeId: '1111',
        cropTypeDisplayName: 'Commercial Corn',
        cropTypeAbbr: 'CC',
        cropTypeColor: '#FBE953',
        cropProductId: '1111-1111',
        cropProductDisplayName: 'Grain'
    },
    {
        displayName: 'Commercial Soybeans - Grain',
        cropTypeId: '2222',
        cropTypeDisplayName: 'Commercial Soybeans',
        cropTypeAbbr: 'CS',
        cropTypeColor: '#80AB46',
        cropProductId: '2222-2222',
        cropProductDisplayName: 'Grain'
    },
    {
        displayName: 'Spring Oats - Grain',
        cropTypeId: '3333',
        cropTypeDisplayName: 'Spring Oats',
        cropTypeAbbr: 'SpOt',
        cropTypeColor: '#E49D02',
        cropProductId: '3333-3333',
        cropProductDisplayName: 'Grain'
    },
    {
        displayName: 'Soft Red Winter Wheat - Grain',
        cropTypeId: '4444',
        cropTypeDisplayName: 'Soft Red Winter Wheat',
        cropTypeAbbr: 'SRWW',
        cropTypeColor: '#9E6501',
        cropProductId: '4444-4444',
        cropProductDisplayName: 'Grain'
    },
    {
        displayName: 'Crop Type - Product',
        cropTypeId: '1010',
        cropTypeDisplayName: 'Crop Type',
        cropTypeAbbr: 'CTCP',
        cropTypeColor: '#D35E5E',
        cropProductId: '1010-1010',
        cropProductDisplayName: 'Product'
    }
];
