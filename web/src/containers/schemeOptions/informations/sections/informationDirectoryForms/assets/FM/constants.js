export const FORM_NAME = 'ASSET_FORM';
export const FORM_TITLE = 'Provide Asset regulatory information';

export const ASSETS_FORM_SECTION = {
    KEY: 'assets',
    NAME: 'Assets',
    FIELD_KEYS: {
        KNOW_TARGET_RETURN: 'knowTR',
        TARGET_RETURN: 'targetReturn',
        HOLD_LESS_LIQUID_ASSETS: 'avoidLessLiquidAssets',
        FULLY_ESG_PORTFOLIO: 'fullyEsgPortfolio',
        FM_FEE:'FmFee',
        FM_FEE_PERCENTAGE:'FmFeePercentage'
    }
};
export const ASSETS_FORM_LABELS_SECTION = {
    KEY: 'assets',
    NAME: 'Assets',
    FIELD_LABELS: {
        KNOW_TARGET_RETURN_LABEL: 'Do you know your target investment return above gilts?',
        TARGET_RETURN_LABEL: 'Target return above gilts (net of fees)',
        HOLD_LESS_LIQUID_ASSETS_LABEL: 'Do you want to avoid holding less liquid assets, such as property?',
        FULLY_ESG_PORTFOLIO_LABEL:
            'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
        TARGET_RETURN_ELEMENT_M_LABEL: 'Investment management fee for scheme (£ element)',
        TARGET_RETURN_ELEMENT_P_LABEL: 'Investment management fee for scheme (% element)'
    }
};
export default {
    ASSETS_FORM_SECTION,
    ASSETS_FORM_LABELS_SECTION
};
