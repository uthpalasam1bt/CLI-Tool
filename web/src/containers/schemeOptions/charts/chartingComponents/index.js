import React from 'react';
import AssetAllocation from './AssetAllocation';
import FundingLevel from './FundingPosition';
import FundingLevelProgression from './FundingLevelProgression';
import Risk from './Risk';
import CurrentMarket from './CurrentMarketView';
import LiabilityCashflow from './LiabilityCashFlows';
import IntrestRate from './IntrestRateSensetive';
import InflationRateSensetivity from './InflationRateSensetive';
import ChangeInAssetAllocation from './ChangeInAssetAllocation';
import AssetAndLiabilityProgression from './AssetandLiabilityProgression';
import FundingLevelProjection from './FundingLevelProjection';
import Performance from './Performance';
import FundingLevelTriggers from './FundingLevelTriggers';
import FundingLevelRisk from './FundingLevelRisk';
import BuyOutPrices from './BuyOutPrices';
import CovenantRisk from './CovenantRisk';
import BuyOutPricesBO from './BuyOutPricesBO';
import LiabilityCashFlowsBO from "./LiabilityCashFlowsBO";

export default {
    /*
  AssetAllocation: props => <AssetAllocation {...props} />,
  FundingLevel: props => <FundingLevel {...props} />,
  FundingLevelProgression: props => <FundingLevelProgression {...props} />,
  Risk: props => <Risk {...props} />,
  CurrentMarket: props => <CurrentMarket {...props} />,
  LiabilityCashflow: props => <LiabilityCashflow {...props} />,
  IntrestRate: props => <IntrestRate {...props} />,
  InflationRateSensetivity: props => <InflationRateSensetivity {...props} />,
  ChangeInAssestAllocation: props => <ChangeInAssetAllocation {...props} />,
  AssetAndLiabilityProgression: props => <AssetAndLiabilityProgression {...props} />,
  FundingLevelProjection: props => <FundingLevelProjection {...props} />,
  Performance: props => <Performance {...props} />,
  FundingLevelTriggers: props => <FundingLevelTriggers {...props} />,
  FundingLevelRisk: props => <FundingLevelRisk {...props} />,
  InflationRateSensetivity: props => <InflationRateSensetive {...props} />*/
    AssetAllocation: props => <AssetAllocation {...props} />, // done
    FundingLevelProjection: props => <FundingLevelProjection {...props} />, // done
    InflationRateSensetivity: props => <InflationRateSensetivity {...props} />, // done
    FundingLevelProgression: props => <FundingLevelProgression {...props} />, // done
    FundingLevel: props => <FundingLevel {...props} />, // done
    LiabilityCashflow: props => <LiabilityCashflow {...props} />, // done
    Risk: props => <Risk {...props} />, // done
    FundingLevelRisk: props => <FundingLevelRisk {...props} />, // done
    CurrentMarket: props => <CurrentMarket {...props} />,
    IntrestRate: props => <IntrestRate {...props} />, // done
    ChangeInAssestAllocation: props => <ChangeInAssetAllocation {...props} />, // done
    AssetAndLiabilityProgression: props => <AssetAndLiabilityProgression {...props} />, // done
    Performance: props => <Performance {...props} />,
    FundingLevelTriggers: props => <FundingLevelTriggers {...props} />, // issue in json and js
    // InflationRateSensetivity: props => <InflationRateSensetivity {...props} />, // done
    BuyOutPrices: props => <BuyOutPrices {...props} />,
    BuyOutPricesBO: props => <BuyOutPricesBO {...props} />,
    LiabilityCashFlowsBO: props => <LiabilityCashFlowsBO {...props} />,
    CovenantRisk: props => <CovenantRisk {...props} />
};
