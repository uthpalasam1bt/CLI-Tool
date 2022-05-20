import React from 'react';
import UtilsHelper from '../../../helpers/UtilsHelper';

const retry = UtilsHelper.getInstance().retry;

const SimpleFormFunc = React.lazy(() => retry(() => import('./simpleFormFunction')));
const SimpleFormJson = React.lazy(() => retry(() => import('./simpleFormJSON')));
const TabFormFunc = React.lazy(() => retry(() => import('./tabFormFunction')));
const TabFormJson = React.lazy(() => retry(() => import('./tabFormJSON')));
const UploadGenerateComponent = React.lazy(() => retry(() => import('./uploadGenerateDocument')));
const TabUploadGenerateComponent = React.lazy(() => retry(() => import('./uploadGenerateTabForm')));
const SimpleFormDataDownload = React.lazy(() => retry(() => import('./simpleFormDataDownload')));
const SimpleFormDataDownloadUsingJson = React.lazy(() => retry(() => import('./simpleFormDataDownloadJson')));
const SimpleFormDataChnageDownloadUsingFunction = React.lazy(() =>
    retry(() => import('./simpleFormDataChangeDwonloadFunction'))
);
const SimpleFormDataChnageDownloadUsingJson = React.lazy(() =>
    retry(() => import('./simpleFormDataChangeDownloadJson'))
);
const PublishSingleDoc = React.lazy(() => retry(() => import('./publishSingleDoc')));
const PublishMultipleDoc = React.lazy(() => retry(() => import('./publishMultipleDoc')));
const PublishFormFunction = React.lazy(() => retry(() => import('./publishFormFunction')));
const PublishFormJSON = React.lazy(() => retry(() => import('./publishFormJSON')));
const PublishUploadDoc = React.lazy(() => retry(() => import('./publishUploadDoc')));
const Execution = React.lazy(() => retry(() => import('./execution')));
const ApproveRejectSingleDoc = React.lazy(() => retry(() => import('./approveRejectSingleDoc')));
const ApproveRejectTableDoc = React.lazy(() => retry(() => import('./approveRejectTabDoc')));
const ApproveRejectSimpleForm = React.lazy(() => retry(() => import('./approveRejectSimpleForm')));
const ApproveRejectTabForm = React.lazy(() => retry(() => import('./approveRejectTabForm')));
const ApproveRejectDynamic = React.lazy(() => retry(() => import('./approveRejectDynamic')));
const TabFormDataDownloadFunction = React.lazy(() => retry(() => import('./tabFormDataDownloadFunction')));
const TabFormDataDownloadJson = React.lazy(() => retry(() => import('./tabFormDataDownloadJson')));
const TabFormDataChangeDownloadFunction = React.lazy(() => retry(() => import('./TabFormDataChangeDownloadFunction')));
const TabFormDataChangeDownloadJson = React.lazy(() => retry(() => import('./tabFormDataChangeDownloadJson')));

const ActivationDefault = React.lazy(() => retry(() => import('./activationDefault')));
const ActivationFormFunction = React.lazy(() => retry(() => import('./activationSimpleFormFunction')));
const ActivationFormJSON = React.lazy(() => retry(() => import('./activationSimpleFormJSON')));
const ActivationTabFunction = React.lazy(() => retry(() => import('./activationTabFormFunction')));
const ActivationTabJSON = React.lazy(() => retry(() => import('./activationTabFormJSON')));
const DocumentLinkDownload = React.lazy(() => retry(() => import('./documentLinkDownload')));
const DeactivateAccount = React.lazy(() => retry(() => import('./deactivateAccount')));

const StepConfig = {
    stepTemplates: {
        step1: props => <SimpleFormFunc {...props} />,
        step2: props => <SimpleFormJson {...props} />,
        step3: props => <TabFormFunc {...props} />,
        step4: props => <TabFormJson {...props} />,
        step5: props => <SimpleFormDataDownload {...props} />,
        step6: props => <SimpleFormDataDownloadUsingJson {...props} />,
        step7: props => <TabFormDataDownloadFunction {...props} />,
        step8: props => <TabFormDataDownloadJson {...props} />,
        step9: props => <SimpleFormDataChnageDownloadUsingFunction {...props} />,
        step10: props => <SimpleFormDataChnageDownloadUsingJson {...props} />,
        step11: props => <UploadGenerateComponent {...props} />,
        step12: props => <TabUploadGenerateComponent {...props} />,
        step13: props => <ApproveRejectSingleDoc {...props} />,
        step14: props => <ApproveRejectTableDoc {...props} />,
        step15: props => <ApproveRejectSimpleForm {...props} />,
        step16: props => <ApproveRejectTabForm {...props} />,
        step17: props => <ApproveRejectDynamic {...props} />,
        step18: props => <PublishSingleDoc {...props} />,
        step19: props => <PublishMultipleDoc {...props} />,
        step20: props => <PublishFormFunction {...props} />,
        step21: props => <PublishFormJSON {...props} />,
        step22: props => <PublishUploadDoc {...props} />,
        step23: props => <Execution {...props} />,
        step24: props => <ActivationDefault {...props} />,
        step25: props => <ActivationFormFunction {...props} />,
        step26: props => <ActivationFormJSON {...props} />,
        step27: props => <ActivationTabFunction {...props} />,
        step28: props => <ActivationTabJSON {...props} />,
        step29: props => <TabFormDataChangeDownloadFunction {...props} />,
        step30: props => <TabFormDataChangeDownloadJson {...props} />,
        step31: props => <DocumentLinkDownload {...props} />,
        step32: props => <DeactivateAccount {...props}/>
    }
};

export default StepConfig;
