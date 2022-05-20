import imgDateRange from 'assets/images/scheme/Charts/1.jpg';
import imgRisk from 'assets/images/scheme/Charts/4.jpg';
import imgCurrentMarket from 'assets/images/scheme/Charts/5.jpg';
import imgLiability from 'assets/images/scheme/Charts/6.jpg';
import imgInterest from 'assets/images/scheme/Charts/7.jpg';
import imgC from 'assets/images/scheme/Charts/8.jpg';
import imgChangeAsset from 'assets/images/scheme/Charts/9.jpg';
import imgFundRisk from 'assets/images/scheme/Charts/10.jpg';
import imgFunding from 'assets/images/scheme/Charts/11.jpg';
import imgFundingProjection from 'assets/images/scheme/Charts/12.jpg';
import imgPerformance from 'assets/images/scheme/Charts/13.jpg';
import imgFundingTrigger from 'assets/images/scheme/Charts/14.jpg';
import imgAssetAllocation from 'assets/images/scheme/Charts/asset_allocation.png';
import fundingLevelJPG from 'assets/images/scheme/Charts/fundingLevel.jpg';
import developmentProgress from 'assets/images/scheme/Charts/development.jpg';

import moment from 'moment';

export const GET_CHART_LIST_REQUEST = 'GET_CHART_LIST_REQUEST';
export const GET_CHART_LIST_SUCCESS = 'GET_CHART_LIST_SUCCESS';
export const GET_CHART_LIST_ERROR = 'GET_CHART_LIST_ERROR';
export const GET_CHART_REQUEST = 'GET_CHART_REQUEST';
export const GET_CHART_SUCCESS = 'GET_CHART_SUCCESS';
export const GET_CHART_ERROR = 'GET_CHART_ERROR';
export const GET_CHART_BY_PAGE = 'GET_CHART_BY_PAGE';
export const CLEAR_CHARTS = 'CLEAR_CHARTS';

export const DEFAULT_NO_DATA_MESSAGE =
    'No chart data. \n ' + 'Click rearrange to change order in which charts are displayed  ';
export const PERFORMANCE_NO_DATA_MESSAFE = 'Generating performance data....';
// STEP FUNCTION CONSTANTS

export const DASHBOARD_STEP_FUNCTION_NAME = 'dashboard';
export const STEP_NAME = 'dashboard';
export const STEP_FUNCTION_DESCRIPTION = 'execute step function on dashboard';
export const INVALIDE_DATE = 'The history date should be less than or equal to the valuation date.';
// EXECUTE STEP FUNCTOINS
export const EXECUTE_STEP_FUNCTION_REQUEST = 'EXECUTE_STEP_FUNCTION_REQUEST';
export const EXECUTE_STEP_FUNCTION_SUCCESS = 'EXECUTE_STEP_FUNCTION_SUCCESS';
export const EXECUTE_STEP_FUNCTION_ERROR = 'EXECUTE_STEP_FUNCTION_ERROR';

// Generate Active Scheme Dashboard Charts Document
export const GENERATE_CHARTS_DOCUMENT_REQUEST = 'GENERATE_CHARTS_DOCUMENT_REQUEST';
export const GENERATE_CHARTS_DOCUMENT_SUCCESS = 'GENERATE_CHARTS_DOCUMENT_SUCCESS';
export const GENERATE_CHARTS_DOCUMENT_ERROR = 'GENERATE_CHARTS_DOCUMENT_ERROR';

// Generate Active Scheme Dashboard Ad Hoc Report
export const GENERATE_ADHOC_REPORT_REQUEST = 'GENERATE_ADHOC_REPORT_REQUEST';
export const GENERATE_ADHOC_REPORT_SUCCESS = 'GENERATE_ADHOC_REPORT_SUCCESS';
export const GENERATE_ADHOC_REPORT_ERROR = 'GENERATE_ADHOC_REPORT_ERROR';

// Dashboard System Messages
export const DASHBOARD_SYSTEM_MESSAGES = {
    DOCUMENT_DOWNLOAD_FAIlURE_ERROR: {
        CHARTS_DOCUMENT: 'Charts document downloading failed.',
        ADHOC_REPORT: 'AdHoc Report downloading failed.'
    }
};

export const GET_LIABILITY_FLAGS_SUCCESS = 'GET_LIABILITY_FLAGS_SUCCESS';

// TODO : want to correct with correct images
export const CHART_IMG_MAP = {
    DateRange: imgDateRange,

    AssetAllocation: imgAssetAllocation,
    FundingLevelProjection: imgFundingProjection,
    InflationRateSensetivity: imgC,
    FundingLevel: imgDateRange,
    FundingLevelProgression: fundingLevelJPG,
    Risk: imgRisk,
    CurrentMarket: imgCurrentMarket,
    LiabilityCashflow: imgLiability,
    IntrestRate: imgInterest,
    ChangeInAssestAllocation: imgChangeAsset,
    AssetAndLiabilityProgression: imgFunding,
    Performance: imgPerformance,
    FundingLevelTriggers: imgFundingTrigger,
    FundingLevelRisk: imgFundRisk,

    c: imgC,
    ChangeInAssetAllocation: imgChangeAsset,
    CovenantRisk: developmentProgress,
    BuyOutPrices: developmentProgress,
    BuyOutPricesBO: developmentProgress,
    LiabilityCashflowBO: imgLiability,
    developmentProgress
};

export const CHART_PAGES = [
    { page: 1, charts: [0, 1, 2, 3] },
    { page: 2, charts: [4, 5, 6, 7] },
    { page: 3, charts: [8, 9, 10, 11] },
    { page: 4, charts: [12, 13, 14, 15] }
];

export const USER_CHART_LIST = [
    {
        title: 'Funding Level Projection',
        type: 'FundingLevelProjection',
        templateName: 'funding_level_projection',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 13,
        LiabilityFlagNoOder: 5,
        show: true
    },
    {
        title: 'Assets and Liabilities',
        type: 'FundingLevel',
        templateName: 'funding_postion',
        nullCheck: ['barChartData', 'balloonChartData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 1,
        LiabilityFlagNoOder: 9,
        show: true
    },
    {
        title: 'Funding Level',
        type: 'FundingLevelProgression',
        templateName: 'funding_level_progression',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 2,
        LiabilityFlagNoOder: 10,
        show: true
    },
    {
        title: 'Risk',
        type: 'Risk',
        templateName: 'risk',
        nullCheck: ['barChartData'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 4,
        LiabilityFlagNoOder: 4,
        show: true
    },
    {
        title: 'LGIM Market Views',
        type: 'CurrentMarket',
        templateName: 'current_market_views',
        nullCheck: ['data'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 6,
        LiabilityFlagNoOder: 3,
        show: true
    },
    {
        title: 'Liability Cashflows',
        type: 'LiabilityCashflow',
        templateName: 'liability_cashflow',
        nullCheck: ['data'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 9,
        LiabilityFlagNoOder: 7,
        show: true
    },
    {
        title: 'Interest Rate Sensitivity',
        type: 'IntrestRate',
        templateName: 'interest_rate_sensitivity',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 11,
        LiabilityFlagNoOder: 11
    },
    {
        title: 'Change in Asset Allocation',
        type: 'ChangeInAssestAllocation',
        templateName: 'change_in_asset_allocation',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 7,
        LiabilityFlagNoOder: 6,
        show: true
    },
    {
        title: 'Asset and Liability Progression',
        type: 'AssetAndLiabilityProgression',
        templateName: 'asset_and_liability_progression',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 5,
        LiabilityFlagNoOder: 12,
        show: true
    },
    {
        title: 'Asset and Liability Performance',
        type: 'Performance',
        templateName: 'performance',
        nullCheck: ['lineChartData'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 10,
        LiabilityFlagNoOder: 2,
        show: true
    },
    {
        title: 'Funding Level Triggers',
        type: 'FundingLevelTriggers',
        templateName: 'funding_level_triggers',
        nullCheck: ['lineChartData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 14,
        LiabilityFlagNoOder: 13,
        show: true
    },
    {
        title: 'Funding Level Risk',
        type: 'FundingLevelRisk',
        templateName: 'funding_level_risk',
        nullCheck: ['barChartData'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 8,
        LiabilityFlagNoOder: 14,
        show: true
    },
    {
        title: 'Inflation Sensitivity',
        type: 'InflationRateSensetivity',
        templateName: 'inflation_sensitivity',
        nullCheck: ['seriesData'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 12,
        LiabilityFlagNoOder: 8,
        show: true
    },
    {
        title: 'Asset Allocation',
        type: 'AssetAllocation',
        templateName: 'asset_allocation',
        nullCheck: ['primaryDataSet'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 3,
        LiabilityFlagNoOder: 1,
        show: true
    },
    {
        title: 'Buy out tracker',
        type: 'BuyOutPrices',
        templateName: 'buy_out_tracker',
        nullCheck: ['primaryDataSet'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 15,
        LiabilityFlagNoOder: 15,
        show: true
    },
    {
        title: 'Buy out tracker-BO',
        type: 'BuyOutPricesBO',
        templateName: 'BO_buy_out_tracker',
        nullCheck: ['primaryDataSet'],
        LiabilityFlagValueForShow: ['Y'],
        LiabilityFlagYesOder: 0,
        LiabilityFlagNoOder: 0,
        show: true
    },{
        title: 'Liability Cashflows-BO',
        type: 'LiabilityCashFlowsBO',
        templateName: 'BO_liability_cashflow',
        nullCheck: ['data'],
        LiabilityFlagValueForShow: ['Y', 'N'],
        LiabilityFlagYesOder: 9,
        LiabilityFlagNoOder: 7,
        show: true
    },
    {
        title: 'No Chart Available',
        type: 'CovenantRisk',
        templateName: 'pending_development',
        nullCheck: ['primaryDataSet'],
        LiabilityFlagValueForShow: [],
        LiabilityFlagYesOder: 16,
        LiabilityFlagNoOder: 16,
        show: true
    }
];

export const GET_DATE_LIST_REQUEST = 'GET_DATE_LIST_REQUEST';
export const GET_DATE_LIST_REQUEST_SUCCESS = 'GET_DATE_LIST_REQUEST_SUCCESS';
export const GET_DATE_LIST_REQUEST_ERROR = 'GET_DATE_LIST_REQUEST_ERROR';

// TODO : this should remove when actual date handles introduced
export const AVAILABLE_DATES = [
    new Date(moment('4/20/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/11/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/31/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/28/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/9/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/16/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/23/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/31/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/7/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/14/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/21/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/30/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/10/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/17/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/24/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/31/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/8/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/16/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/23/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/31/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/7/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/14/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/21/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/29/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/17/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/10/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/24/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/31/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/8/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/15/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/22/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/30/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/7/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/14/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/29/2017', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/10/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/17/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/24/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/7/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/14/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/21/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/28/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/7/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/14/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/21/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/29/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/9/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/16/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/23/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('4/30/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/8/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/15/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/22/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('5/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/7/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/14/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/21/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('6/29/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/10/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/17/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/24/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('7/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/7/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/14/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/22/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('8/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/6/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/13/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/20/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('9/28/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/8/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/16/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/23/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('10/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/7/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/14/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/21/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('11/30/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/10/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/17/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('12/31/2018', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/9/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/16/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/23/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('1/31/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/7/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/14/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/21/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('2/28/2019', 'MM/DD/YYYY').toISOString()),
    new Date(moment('3/7/2019', 'MM/DD/YYYY').toISOString())
];
