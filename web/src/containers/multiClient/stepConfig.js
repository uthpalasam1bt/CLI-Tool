import React from 'react';
import UtilsHelper from '../../helpers/UtilsHelper';

const retry = UtilsHelper.getInstance().retry;

const UploadFma = React.lazy(() => retry(() => import('./cngfmfees/genrFmFee')));
const PublishToScm1 = React.lazy(() => retry(() => import('./cngfmfees/publFmFee')));
const PublishToScm2 = React.lazy(() => retry(() => import('./updateiaafma/publIaaFma')));
const PublishToScm3 = React.lazy(() => retry(() => import('./distntc/publNtc')));
const ApproveFmFees = React.lazy(() => retry(() => import('./cngfmfees/aprvFmFee')));
const ApproveIaaFma = React.lazy(() => retry(() => import('./updateiaafma/aprvIaaFma')));
const UploadNotice = React.lazy(() => retry(() => import('./distntc/genrNtc')));
const ApproveNotice = React.lazy(() => retry(() => import('./distntc/aprvNtc')));
const UploadIaaFma = React.lazy(() => retry(() => import('./updateiaafma/genrIaaFma')));

const StepConfig = {
    cngfmfees: {
        genrFmFee: props => <UploadFma {...props} />,
        aprvFmFee: props => <ApproveFmFees {...props} />,
        publFmFee: props => <PublishToScm1 {...props} />
    },
    distntc: {
        genrNtc: props => <UploadNotice {...props} />,
        aprvNtc: props => <ApproveNotice {...props} />,
        publNtc: props => <PublishToScm3 {...props} />
    },
    updiaafma: {
        genrIaaFma: props => <UploadIaaFma {...props} />,
        aprvIaaFma: props => <ApproveIaaFma {...props} />,
        publIaaFma: props => <PublishToScm2 {...props} />
    }
};

export default StepConfig;
