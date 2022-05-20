export const CURRENT_ASSET_ALLOCATION_TYPE = 'currentAssetAT';
export const ASSET_ALLOCATION_TOTAL = 'assetAllocationTotal';
export const SIMPLE_ASSET_ALLOCATION_TOTAL = 'simpleAssetAllocationTotal';
export const DETAIL_ASSET_ALLOCATION_TOTAL = 'detailAssetAllocationTotal';

const SIMPLE_EQUITIES = 'simpleEquities';
const SIMPLE_CORPORATE_BONDS = 'simpleCorporateBonds';
const SIMPLE_PROPERTY = 'simpleProperty';
const SIMPLE_GOVERNMENT_BONDS = 'simpleGovernmentBonds';
const SIMPLE_ALTERNATIVES = 'simpleAlternatives';
const SIMPLE_CASH = 'simpleCash';
const SIMPLE_DIVERSIFIED_GROWTH = 'simpleDiversifiedGrowth';

const DETAIL_UK_EQUITY = 'detailEquity';
const DETAIL_DIVERSIFIED_GROWTH = 'detailDiversifiedGrowth';
const DETAIL_GLOBAL_EQUITY = 'detailGlobalEquity';
const DETAIL_CORPORATE_BONDS = 'detailCorporateBonds';
const DETAIL_EMERGING_MARKET_EQUITY = 'detailEmergingMarketEquity';
const DETAIL_OVERSEAS_SOVEREIGN_BONDS = 'detailOverseasSovereignBonds';
const DETAIL_HIGH_YIELD_BONDS = 'detailHighYieldBonds';
const DETAIL_NOMINAL_GILTS = 'detailNominalGilts';
const DETAIL_EMERGING_MARKET_DEBT = 'detailEmergingMarketDebt';
const DETAIL_INDEX_LINKED_GILTS = 'detailIndexLinkedGilts';
const DETAIL_PROPERTY = 'detailProperty';
const DETAIL_LDI = 'detailLDI';
const DETAIL_INFRASTRUCTURE = 'detailInfrastructure';
const DETAIL_CASH = 'detailCash';

export const simpleAssetAllocationFields = [
    { label: 'Equities', field: SIMPLE_EQUITIES, __order: 'a' },
    { label: 'Corporate Bonds', field: SIMPLE_CORPORATE_BONDS, __order: 'b' },
    { label: 'Property', field: SIMPLE_PROPERTY, __order: 'c' },
    { label: 'Government Bonds', field: SIMPLE_GOVERNMENT_BONDS, __order: 'd' },
    { label: 'Alternatives', field: SIMPLE_ALTERNATIVES, __order: 'e' },
    { label: 'Cash', field: SIMPLE_CASH, __order: 'f' },
    { label: 'Diversified Growth', field: SIMPLE_DIVERSIFIED_GROWTH, __order: 'g' }
];

export const detailAssetAllocationFields = [
    { label: 'UK Equity', field: DETAIL_UK_EQUITY, __order: 'a' },
    { label: 'Diversified Growth', field: DETAIL_DIVERSIFIED_GROWTH, __order: 'b' },
    { label: 'Global Equity', field: DETAIL_GLOBAL_EQUITY, __order: 'c' },
    { label: 'Corporate Bonds', field: DETAIL_CORPORATE_BONDS, __order: 'd' },
    { label: 'Emerging Market Equity', field: DETAIL_EMERGING_MARKET_EQUITY, __order: 'e' },
    { label: 'Overseas Sovereign Bonds', field: DETAIL_OVERSEAS_SOVEREIGN_BONDS, __order: 'f' },
    { label: 'High Yield Bonds', field: DETAIL_HIGH_YIELD_BONDS, __order: 'g' },
    { label: 'Nominal Gilts', field: DETAIL_NOMINAL_GILTS, __order: 'h' },
    { label: 'Emerging Market Debt', field: DETAIL_EMERGING_MARKET_DEBT, __order: 'i' },
    { label: 'Index-linked Gilts', field: DETAIL_INDEX_LINKED_GILTS, __order: 'j' },
    { label: 'Property', field: DETAIL_PROPERTY, __order: 'k' },
    { label: 'LDI', field: DETAIL_LDI, __order: 'l' },
    { label: 'Infrastructure', field: DETAIL_INFRASTRUCTURE, __order: 'm' },
    { label: 'Cash', field: DETAIL_CASH, __order: 'n' }
];

export const AssetValueValidateKeys = {
    simple: [
        SIMPLE_EQUITIES,
        SIMPLE_CORPORATE_BONDS,
        SIMPLE_PROPERTY,
        SIMPLE_GOVERNMENT_BONDS,
        SIMPLE_ALTERNATIVES,
        SIMPLE_CASH,
        SIMPLE_DIVERSIFIED_GROWTH,
        SIMPLE_ASSET_ALLOCATION_TOTAL
    ],
    detail: [
        DETAIL_UK_EQUITY,
        DETAIL_DIVERSIFIED_GROWTH,
        DETAIL_GLOBAL_EQUITY,
        DETAIL_CORPORATE_BONDS,
        DETAIL_EMERGING_MARKET_EQUITY,
        DETAIL_OVERSEAS_SOVEREIGN_BONDS,
        DETAIL_HIGH_YIELD_BONDS,
        DETAIL_NOMINAL_GILTS,
        DETAIL_EMERGING_MARKET_DEBT,
        DETAIL_INDEX_LINKED_GILTS,
        DETAIL_PROPERTY,
        DETAIL_LDI,
        DETAIL_INFRASTRUCTURE,
        DETAIL_CASH,
        DETAIL_ASSET_ALLOCATION_TOTAL
    ]
};
