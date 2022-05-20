import React from 'react';
import {FM, LDI, LDI_FM, UNCLASSIFIED} from './constants';
// scheme section components
import FMSchemeForm from './informationDirectoryForms/scheme/FM';
import LDISchemeForm from './informationDirectoryForms/scheme/LDI';
import LDI_FMSchemeForm from './informationDirectoryForms/scheme/LDI_FM';
import UNCLASSIFIEDSchemeForm from './informationDirectoryForms/scheme/UNCLASSIFIED';
// Asset section components
import FMAssetForm from './informationDirectoryForms/assets/FM';
import LDI_FMAssetForm from './informationDirectoryForms/assets/LDI_FM';
// Liabilities section components
import FMLiabilitiesForm from './informationDirectoryForms/liabilities/FM';
import LDILiabilitiesForm from './informationDirectoryForms/liabilities/LDI';
import LDI_FMLiabilitiesForm from './informationDirectoryForms/liabilities/LDI_FM';
// Funding section components
import FMFundingForm from './informationDirectoryForms/funding/FM';
import LDI_FMFundingForm from './informationDirectoryForms/funding/LDI_FM';
// Administration section components
import FMAdministrationForm from './informationDirectoryForms/administration/FM';
import LDIAdministrationForm from './informationDirectoryForms/administration/LDI';
import LDI_FMAdministrationForm from './informationDirectoryForms/administration/LDI_FM';
// LDI Sample section components
import LDILDISampleForm from './informationDirectoryForms/LDIsample/LDI';
import LDI_FMLDISampleForm from './informationDirectoryForms/LDIsample/LDI_FM';
// Incumbent Manager section components
import FMIncumbentManagersDocForm from './informationDirectoryForms/IncumbentManagersDoc/FM';
import LDIIncumbentManagersDocForm from './informationDirectoryForms/IncumbentManagersDoc/LDI';
import LDI_FMIncumbentManagersDocForm from './informationDirectoryForms/IncumbentManagersDoc/LDI_FM';

import { Scheme, Assets, Liabilities, Funding, Administration, LDISample, IncumbentManagersDoc } from '../constants';

const informationDirectorySectionMap = {
    [Scheme]: {
        [FM]: props => <FMSchemeForm {...props} />,
        [LDI]: props => <LDISchemeForm {...props} />,
        [LDI_FM]: props => <LDI_FMSchemeForm {...props} />,
        [UNCLASSIFIED]: props => <UNCLASSIFIEDSchemeForm {...props} />
    },
    [Assets]: {
        [FM]: props => <FMAssetForm {...props} />,
        [LDI_FM]: props => <LDI_FMAssetForm {...props} />
    },
    [Liabilities]: {
        [FM]: props => <FMLiabilitiesForm {...props} />,
        [LDI]: props => <LDILiabilitiesForm {...props} />,
        [LDI_FM]: props => <LDI_FMLiabilitiesForm {...props} />
    },
    [Funding]: {
        [FM]: props => <FMFundingForm {...props} />,
        [LDI_FM]: props => <LDI_FMFundingForm {...props} />
    },
    [Administration]: {
        [FM]: props => <FMAdministrationForm {...props} />,
        [LDI]: props => <LDIAdministrationForm {...props} />,
        [LDI_FM]: props => <LDI_FMAdministrationForm {...props} />
    },
    [LDISample]: {
        [LDI]: props => <LDILDISampleForm {...props} />,
        [LDI_FM]: props => <LDI_FMLDISampleForm {...props} />
    },
    [IncumbentManagersDoc]: {
        [FM]: props => <FMIncumbentManagersDocForm {...props} />,
        [LDI]: props => <LDIIncumbentManagersDocForm {...props} />,
        [LDI_FM]: props => <LDI_FMIncumbentManagersDocForm {...props} />
    }
};

export default informationDirectorySectionMap;
