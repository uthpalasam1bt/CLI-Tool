import React from 'react';
import UtilsHelper from '../../../helpers/UtilsHelper';

const retry = UtilsHelper.getInstance().retry;

// registration wf steps
const REGreqip = React.lazy(() => retry(() => import('./registration/reqip')));
const REGdowip = React.lazy(() => retry(() => import('./registration/dowip')));
const REGpubip = React.lazy(() => retry(() => import('./registration/pubip')));
const REGrevip = React.lazy(() => retry(() => import('./registration/revip')));
const REGreqiaa = React.lazy(() => retry(() => import('./registration/reqiaa')));
const REGappiaakyc = React.lazy(() => retry(() => import('./registration/appiaakyc')));
const REGgeniaa = React.lazy(() => retry(() => import('./registration/geniaa')));
const REGappiaa = React.lazy(() => retry(() => import('./registration/appiaa')));
const REGpubiaa = React.lazy(() => retry(() => import('./registration/pubiaa')));
const REGreviaa = React.lazy(() => retry(() => import('./registration/reviaa')));
const REGreviaaim = React.lazy(() => retry(() => import('./registration/reviaaim')));
const REGiaaexec = React.lazy(() => retry(() => import('./registration/iaaexec')));
const REGreqamao = React.lazy(() => retry(() => import('./registration/reqamao')));
const REGappamao = React.lazy(() => retry(() => import('./registration/appamao')));
const REGgenamao = React.lazy(() => retry(() => import('./registration/genamao')));
const REGappar = React.lazy(() => retry(() => import('./registration/appar')));
const REGappfma = React.lazy(() => retry(() => import('./registration/appfma')));
const REGapppmc = React.lazy(() => retry(() => import('./registration/apppmc')));
const REGpubamao = React.lazy(() => retry(() => import('./registration/pubamao')));
const REGrevar = React.lazy(() => retry(() => import('./registration/revar')));
const REGrevfma = React.lazy(() => retry(() => import('./registration/revfma')));
const REGrevpmc = React.lazy(() => retry(() => import('./registration/revpmc')));
const REGsclla = React.lazy(() => retry(() => import('./registration/sclla')));
const REGfmapmcexe = React.lazy(() => retry(() => import('./registration/fmapmcexe')));
const REGappmtl = React.lazy(() => retry(() => import('./registration/appmtl')));
const REGgenmtl = React.lazy(() => retry(() => import('./registration/genmtl')));
const REGpubmtl = React.lazy(() => retry(() => import('./registration/pubmtl')));
const REGrevmtl = React.lazy(() => retry(() => import('./registration/revmtl')));
const REGias = React.lazy(() => retry(() => import('./registration/ias')));

// liability update wf steps
// const LULiabilityUpdForm = React.lazy(() => retry(() => import('./libUpdStpGen/liabUpdForm')));
// const LUDwnldLiabUpld = React.lazy(() => retry(() => import('./libUpdStpGen/dwnldLiabUpd')));
// const LUGenertAdvFmaRprt = React.lazy(() => retry(() => import('./libUpdStpGen/genrtAdvFmaRprt')));
// const LUApproveAdvRprt = React.lazy(() => retry(() => import('./libUpdStpGen/aprvAdvRprt')));
// const LUApproveFma = React.lazy(() => retry(() => import('./libUpdStpGen/aprvFma')));
// const LUPublishAdvFmaRprt = React.lazy(() => retry(() => import('./libUpdStpGen/publAdvFmaRprt')));
// const LUReviewAdvRprt = React.lazy(() => retry(() => import('./libUpdStpGen/schAprvAdvRprt')));
// const LUReviewIMA = React.lazy(() => retry(() => import('./libUpdStpGen/schAprvFma')));
// const LUSignIMA = React.lazy(() => retry(() => import('./libUpdStpGen/luLgimDocsExcuStat')));
// const LUActiveMandate = React.lazy(() => retry(() => import('./libUpdStpGen/luActMendt')));

const LiabilityUpdForm = React.lazy(() => retry(() => import('./libUpdStpGen/liabUpdForm')));
const DwnldLiabUpld = React.lazy(() => retry(() => import('./libUpdStpGen/dwnldLiabUpd')));
const GenertAdvFmaRprt = React.lazy(() => retry(() => import('./libUpdStpGen/genrtAdvFmaRprt')));
const ApproveAdvRprt = React.lazy(() => retry(() => import('./libUpdStpGen/aprvAdvRprt')));
const ApproveFma = React.lazy(() => retry(() => import('./libUpdStpGen/aprvFma')));
const PublishAdvFmaRprt = React.lazy(() => retry(() => import('./libUpdStpGen/publAdvFmaRprt')));
const ReviewAdvRprt = React.lazy(() => retry(() => import('./libUpdStpGen/schAprvAdvRprt')));
const ReviewIMA = React.lazy(() => retry(() => import('./libUpdStpGen/schAprvFma')));
const SignIMA = React.lazy(() => retry(() => import('./libUpdStpGen/luLgimDocsExcuStat')));
const ActiveMandate = React.lazy(() => retry(() => import('./libUpdStpGen/luActMendt')));

const ChangeFmFee = React.lazy(() => retry(() => import('./fmfee/changeFmFee')));
const GenFma = React.lazy(() => retry(() => import('./fmfee/genFma')));
const ApprveFma = React.lazy(() => retry(() => import('./fmfee/approveFma')));
const PubFma = React.lazy(() => retry(() => import('./fmfee/pubFma')));
const SchApproveFma = React.lazy(() => retry(() => import('./fmfee/schApproveFma')));
const FmaExeStatus = React.lazy(() => retry(() => import('./fmfee/fmaExeStatus')));
const ActMandateFma = React.lazy(() => retry(() => import('./fmfee/actMandateFma')));

const UpdateAVCInformation = React.lazy(() => retry(() => import('./updateAvcInformation/updAvcDetl')));
const ApproveAvcInformation = React.lazy(() => retry(() => import('./updateAvcInformation/dwnldAvcDetl')));
const GenerateDocument = React.lazy(() => retry(() => import('./updateAvcInformation/genrDocsAvc')));
const ApproveSip = React.lazy(() => retry(() => import('./updateAvcInformation/aprvSip')));
const PublishSip = React.lazy(() => retry(() => import('./updateAvcInformation/publDocsAvc')));
const ApproveSIPByClient = React.lazy(() => retry(() => import('./updateAvcInformation/schAprvSip')));
const ApproveConfirmSponsorConsultationByClient = React.lazy(() =>
    retry(() => import('./updateAvcInformation/sponsrConsltLtr'))
);

const Active = React.lazy(() => retry(() => import('./updateAvcInformation/actMendt')));
const UploadBespokeReport = React.lazy(() => retry(() => import('./transReprt/genrTrnsReprt')));
const ApproveBespokeReport = React.lazy(() => retry(() => import('./transReprt/aprvTrnsReprt')));
const PublishBespokeReport = React.lazy(() => retry(() => import('./transReprt/publTrnsReprt')));

const GenerateSipDoc = React.lazy(() => retry(() => import('./updSip/genrSip')));
const ApproveSipDoc = React.lazy(() => retry(() => import('./updSip/aprvSip')));
const PublishSipDoc = React.lazy(() => retry(() => import('./updSip/publSip')));
const ApproveSipDocByClient = React.lazy(() => retry(() => import('./updSip/schAprvSip')));
const ApproveSponsorConsultationDoc = React.lazy(() => retry(() => import('./updSip/spnsrConsltLtr')));
const ActiveSipDoc = React.lazy(() => retry(() => import('./updSip/actMendt')));

const InputReturnTarget = React.lazy(() => retry(() => import('./rtnTargUpd/rtnTarg')));
const ApproveReturnTarget = React.lazy(() => retry(() => import('./rtnTargUpd/dwnRtnTarg')));
const GenerateAllDocs = React.lazy(() => retry(() => import('./rtnTargUpd/genrDocs')));
const ApproveAdversaryReport = React.lazy(() => retry(() => import('./rtnTargUpd/aprvAdvReprt')));
const ApproveFmaDoc = React.lazy(() => retry(() => import('./rtnTargUpd/aprvFma')));
const ApproveSipDocs = React.lazy(() => retry(() => import('./rtnTargUpd/aprvSip')));
const PublishAllDocs = React.lazy(() => retry(() => import('./rtnTargUpd/publDocs')));
const ApproveAdviceReportByClient = React.lazy(() => retry(() => import('./rtnTargUpd/schAprvAdvReprt')));
const ApproveFMAByClients = React.lazy(() => retry(() => import('./rtnTargUpd/schAprvFma')));
const ApproveSipByClients = React.lazy(() => retry(() => import('./rtnTargUpd/schAprvSip')));
const ApproveConsultByClient = React.lazy(() => retry(() => import('./rtnTargUpd/spnsrConsltLtr')));
const LgimSign = React.lazy(() => retry(() => import('./rtnTargUpd/lgimFMAExcuStat')));
const Mandate = React.lazy(() => retry(() => import('./rtnTargUpd/actMendt')));

const Reason = React.lazy(() => retry(() => import('./reqCancelIaaFma/cnclAcc')));
const ApproveDocumentation = React.lazy(() => retry(() => import('./reqCancelIaaFma/procReq')));
const ApproveDocumentationByClient = React.lazy(() => retry(() => import('./reqCancelIaaFma/trustAprvl')));
const Deactivate = React.lazy(() => retry(() => import('./reqCancelIaaFma/deactAcc')));

const ChangeAdversoryFee = React.lazy(() => retry(() => import('./advFeeChange/chngAdvFee')));
const GenerateIaaDocument = React.lazy(() => retry(() => import('./advFeeChange/genrtIaa')));
const ApproveiAADocument = React.lazy(() => retry(() => import('./advFeeChange/aprvIaa')));
const PublishIAADocument = React.lazy(() => retry(() => import('./advFeeChange/publIaa')));
const ApproveIaaDocsByClients = React.lazy(() => retry(() => import('./advFeeChange/schAprvIaa')));
const ExcecutionPhaseIaaDocs = React.lazy(() => retry(() => import('./advFeeChange/iaaExcuStat')));
const IaaMandate = React.lazy(() => retry(() => import('./advFeeChange/actMendt')));

// Scheme name change wf steps
const SNCChangeSchemeName = React.lazy(() => retry(() => import('./schName/chngSchName')));
const SNCDownloadSchemeDetails = React.lazy(() => retry(() => import('./schName/dwnldSchDetl')));
const SNCSchemeNameGenerateDocuments = React.lazy(() => retry(() => import('./schName/genrtDocs')));
const SNCSchemeNameGenerateDocumentsSA = React.lazy(() => retry(() => import('./schName/genrtDocsSA')));
const SNCApproveIaa = React.lazy(() => retry(() => import('./schName/aprvIaa')));
const SNCSchemeApproveFma = React.lazy(() => retry(() => import('./schName/aprvFma')));
const SNCApprovePMC = React.lazy(() => retry(() => import('./schName/aprvPmc')));
const SNCApproveSIP = React.lazy(() => retry(() => import('./schName/aprvSip')));
const SNCSchemeNamePublishDocs = React.lazy(() => retry(() => import('./schName/publDocs')));
const SNCReviewIaa = React.lazy(() => retry(() => import('./schName/schAprvIaa')));
const SNCReviewFma = React.lazy(() => retry(() => import('./schName/schAprvFma')));
const SNCReviewPmc = React.lazy(() => retry(() => import('./schName/schAprvPmc')));
const SNCSchemeApproveSIP = React.lazy(() => retry(() => import('./schName/schAprvSip')));
const SNCSponsorConsultationLetter = React.lazy(() => retry(() => import('./schName/spnsrConsltLtr')));
const SNCLgimDocumentsSignStatus = React.lazy(() => retry(() => import('./schName/lgimDocsExcuStat')));
const SNCLgimDocumentsSignStatusSA = React.lazy(() => retry(() => import('./schName/lgimDocsExcuStatSA')));
const SNCSchemeNameActiveMandate = React.lazy(() => retry(() => import('./schName/actMendt')));

// master workflow steps
const MWFMstrForm = React.lazy(() => retry(() => import('./master/mstrForm')));
const MWFMstrActMendt = React.lazy(() => retry(() => import('./master/mstrActMendt')));

// deficit contribution update
const DeficitContribution = React.lazy(() => retry(() => import('./deficitContribution/defiContributionUpdate')));
const DeficitMandate = React.lazy(() => retry(() => import('./deficitContribution/deficitActMandate')));
const AprvDefiContribution = React.lazy(() => retry(() => import('./deficitContribution/aprvDefiContribution')));

// Bespok Funding Level Trigger
const FundingLevelTriggers = React.lazy(() => retry(() => import('./bespokeFuncdingLevel/fundingLevelTriggers')));
const ApproveFundingLevel = React.lazy(() => retry(() => import('./bespokeFuncdingLevel/aprvFundingLevel')));
const FundingLevelActiveMandate = React.lazy(() => retry(() => import('./bespokeFuncdingLevel/fundingActMandate')));

// update non-lgim asset workflow
const InptNonLgimAsst = React.lazy(() => retry(() => import('./updNonLgimAsst/inptNonLgimAsst')));
const AprvNonLgimAsst = React.lazy(() => retry(() => import('./updNonLgimAsst/aprvNonLgimAsst')));
const NonLgimAsstActMandate = React.lazy(() => retry(() => import('./updNonLgimAsst/nonLgimAsstActMandate')));

// update scheme info workflow
const InputSchemeInfo = React.lazy(() => retry(() => import('./updSchemeInfo/inputSchemeInfo')));
const AprvSchemeInfo = React.lazy(() => retry(() => import('./updSchemeInfo/aprvSchemeInfo')));
const SchemeInfoActMandate = React.lazy(() => retry(() => import('./updSchemeInfo/schemeInfoActMandate')));

//Request Stretegy Review
const UpdateStrategy = React.lazy(() => retry(() => import('./flStrtgRevw/updt')));
const DownloadData = React.lazy(() => retry(() => import('./flStrtgRevw/dwndStrtgRvw')));
const UploadGenerateAllDocuments = React.lazy(() => retry(() => import('./flStrtgRevw/genrDocs')));
const AdversoryDocumentApproveStep = React.lazy(() => retry(() => import('./flStrtgRevw/aprvAdvReprt')));
const FMADocumentApproveStep = React.lazy(() => retry(() => import('./flStrtgRevw/aprvFma')));
const SipDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/aprvSip')));
const PublishmentDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/publDocs')));
const AdversoryReportDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/schAprvAdvReprt')));
const FmaReportDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/schAprvFma')));
const SipReportDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/schAprvSip')));
const ConsultLetterDocumentApproveStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/spnsrConsltLtr')));
const SigningStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/lgimFMAExcuStat')));
const MandationStepInStep = React.lazy(() => retry(() => import('./flStrtgRevw/actMendt')));

// update liability info workflow
const InputLiabInfo = React.lazy(() => retry(() => import('./updLiabInfo/inputLiabInfo')));
const DwnldLiabUpdinfo = React.lazy(() => retry(() => import('./updLiabInfo/dwnldLiabUpdinfo')));
const GenrtAdvRprt = React.lazy(() => retry(() => import('./updLiabInfo/genrtAdvRprt')));
const AprvAdvRprt = React.lazy(() => retry(() => import('./updLiabInfo/aprvAdvRprt')));
const ActMendtLiabInfo = React.lazy(() => retry(() => import('./updLiabInfo/actMendtLiabInfo')));

const ChangeTrustee = React.lazy(() => retry(() => import('./trustees/chngTrust')));
const ClientApproveTrustee = React.lazy(() => retry(() => import('./trustees/clientApprTrust')));
const AdminApproveTrustee = React.lazy(() => retry(() => import('./trustees/lgimApprTrust')));

/*don't change this line mannully*/
const StepConfig = {
    registration: {
        reqip: props => <REGreqip {...props} />,
        dowip: props => <REGdowip {...props} />,
        pubip: props => <REGpubip {...props} />,
        revip: props => <REGrevip {...props} />,
        reqiaa: props => <REGreqiaa {...props} />,
        appiaakyc: props => <REGappiaakyc {...props} />,
        geniaa: props => <REGgeniaa {...props} />,
        geniaaim: props => <REGgeniaa {...props} />,
        appiaa: props => <REGappiaa {...props} />,
        pubiaa: props => <REGpubiaa {...props} />,
        pubiaaim: props => <REGpubiaa {...props} />,
        reviaa: props => <REGreviaa {...props} />,
        reviaaim: props => <REGreviaaim {...props} />,
        iaaexec: props => <REGiaaexec {...props} />,
        reqamao: props => <REGreqamao {...props} />,
        appamao: props => <REGappamao {...props} />,
        genamao: props => <REGgenamao {...props} />,
        appar: props => <REGappar {...props} />,
        appfma: props => <REGappfma {...props} />,
        apppmc: props => <REGapppmc {...props} />,
        pubamao: props => <REGpubamao {...props} />,
        revar: props => <REGrevar {...props} />,
        revfma: props => <REGrevfma {...props} />,
        revpmc: props => <REGrevpmc {...props} />,
        sclla: props => <REGsclla {...props} />,
        fmapmcexe: props => <REGfmapmcexe {...props} />,
        appmtl: props => <REGappmtl {...props} />,
        genmtl: props => <REGgenmtl {...props} />,
        pubmtl: props => <REGpubmtl {...props} />,
        revmtl: props => <REGrevmtl {...props} />,
        ias: props => <REGias {...props} />
    },
    schName: {
        chngSchName: props => <SNCChangeSchemeName {...props} />,
        dwnldSchDetl: props => <SNCDownloadSchemeDetails {...props} />,
        genrtDocs: props => <SNCSchemeNameGenerateDocuments {...props} />,
        genrtDocsSA: props => <SNCSchemeNameGenerateDocumentsSA {...props} />,
        aprvIaa: props => <SNCApproveIaa {...props} />,
        aprvFma: props => <SNCSchemeApproveFma {...props} />,
        aprvPmc: props => <SNCApprovePMC {...props} />,
        aprvSip: props => <SNCApproveSIP {...props} />,
        publDocs: props => <SNCSchemeNamePublishDocs {...props} />,
        publDocsSA: props => <SNCSchemeNamePublishDocs {...props} />,
        schAprvIaa: props => <SNCReviewIaa {...props} />,
        schAprvFma: props => <SNCReviewFma {...props} />,
        schAprvFmaSA: props => <SNCReviewFma {...props} />,
        schAprvPmc: props => <SNCReviewPmc {...props} />,
        schAprvPmcSA: props => <SNCReviewPmc {...props} />,
        schAprvSip: props => <SNCSchemeApproveSIP {...props} />,
        schAprvSipSA: props => <SNCSchemeApproveSIP {...props} />,
        spnsrConsltLtr: props => <SNCSponsorConsultationLetter {...props} />,
        lgimDocsExcuStat: props => <SNCLgimDocumentsSignStatus {...props} />,
        lgimDocsExcuStatSA: props => <SNCLgimDocumentsSignStatusSA {...props} />,
        actMendt: props => <SNCSchemeNameActiveMandate {...props} />,
        actMendtSA: props => <SNCSchemeNameActiveMandate {...props} />
    },
    master: {
        mstrForm: props => <MWFMstrForm {...props} />,
        mstrActMendt: props => <MWFMstrActMendt {...props} />
    },
    liabUpd: {
        liabUpdForm: props => <LiabilityUpdForm {...props} />,
        dwnldLiabUpd: props => <DwnldLiabUpld {...props} />,
        genrtAdvFmaRprt: props => <GenertAdvFmaRprt {...props} />,
        aprvAdvRprt: props => <ApproveAdvRprt {...props} />,
        aprvFma: props => <ApproveFma {...props} />,
        publAdvFmaRprt: props => <PublishAdvFmaRprt {...props} />,
        schAprvAdvRprt: props => <ReviewAdvRprt {...props} />,
        schAprvFma: props => <ReviewIMA {...props} />,
        luLgimDocsExcuStat: props => <SignIMA {...props} />,
        luActMendt: props => <ActiveMandate {...props} />
    },
    fmfee: {
        changeFmFee: props => <ChangeFmFee {...props} />,
        genFma: props => <GenFma {...props} />,
        approveFma: props => <ApprveFma {...props} />,
        pubFma: props => <PubFma {...props} />,
        schApproveFma: props => <SchApproveFma {...props} />,
        fmaExeStatus: props => <FmaExeStatus {...props} />,
        actMandateFma: props => <ActMandateFma {...props} />
    },
    updAvcDetl: {
        avcDetl: props => <UpdateAVCInformation {...props} />,
        dwnldAvcDetl: props => <ApproveAvcInformation {...props} />,
        genrDocsAvc: props => <GenerateDocument {...props} />,
        aprvSip: props => <ApproveSip {...props} />,
        publDocsAvc: props => <PublishSip {...props} />,
        schAprvSip: props => <ApproveSIPByClient {...props} />,
        sponsrConsltLtr: props => <ApproveConfirmSponsorConsultationByClient {...props} />,
        actMendt: props => <Active {...props} />
    },
    transReprt: {
        genrTrnsReprt: props => <UploadBespokeReport {...props} />,
        aprvTrnsReprt: props => <ApproveBespokeReport {...props} />,
        publTrnsReprt: props => <PublishBespokeReport {...props} />
    },
    updSip: {
        genrSip: props => <GenerateSipDoc {...props} />,
        aprvSip: props => <ApproveSipDoc {...props} />,
        publSip: props => <PublishSipDoc {...props} />,
        schAprvSip: props => <ApproveSipDocByClient {...props} />,
        sponsrConsltLtr: props => <ApproveSponsorConsultationDoc {...props} />,
        actMendt: props => <ActiveSipDoc {...props} />
    },
    rtnTargUpd: {
        rtnTarg: props => <InputReturnTarget {...props} />,
        dwnRtnTarg: props => <ApproveReturnTarget {...props} />,
        genrDocs: props => <GenerateAllDocs {...props} />,
        aprvAdvReprt: props => <ApproveAdversaryReport {...props} />,
        aprvFma: props => <ApproveFmaDoc {...props} />,
        aprvSip: props => <ApproveSipDocs {...props} />,
        publDocs: props => <PublishAllDocs {...props} />,
        schAprvAdvReprt: props => <ApproveAdviceReportByClient {...props} />,
        schAprvFma: props => <ApproveFMAByClients {...props} />,
        schAprvSip: props => <ApproveSipByClients {...props} />,
        spnsrConsltLtr: props => <ApproveConsultByClient {...props} />,
        lgimFMAExcuStat: props => <LgimSign {...props} />,
        actMendt: props => <Mandate {...props} />
    },
    reqCancelIaaFma: {
        cnclAcc: props => <Reason {...props} />,
        procReq: props => <ApproveDocumentation {...props} />,
        trustAprvl: props => <ApproveDocumentationByClient {...props} />,
        deactAcc: props => <Deactivate {...props} />
    },

    advFeeChange: {
        chngAdvFee: props => <ChangeAdversoryFee {...props} />,
        genrtIaa: props => <GenerateIaaDocument {...props} />,
        aprvIaa: props => <ApproveiAADocument {...props} />,
        publIaa: props => <PublishIAADocument {...props} />,
        schAprvIaa: props => <ApproveIaaDocsByClients {...props} />,
        iaaExcuStat: props => <ExcecutionPhaseIaaDocs {...props} />,
        actMendt: props => <IaaMandate {...props} />
    },
    deficitContribution: {
        defiContributionUpdate: props => <DeficitContribution {...props} />,
        aprvDefiContribution: props => <AprvDefiContribution {...props} />,
        deficitActMandate: props => <DeficitMandate {...props} />
    },
    bspkFundLvlTrg: {
        fLvlTriggers: props => <FundingLevelTriggers {...props} />,
        aprvFlr: props => <ApproveFundingLevel {...props} />,
        mandateFlr: props => <FundingLevelActiveMandate {...props} />
    },
    updNonLgimAsst: {
        inptNonLgimAsst: props => <InptNonLgimAsst {...props} />,
        aprvNonLgimAsst: props => <AprvNonLgimAsst {...props} />,
        nonLgimAsstActMandate: props => <NonLgimAsstActMandate {...props} />
    },
    updSchemeInfo: {
        inputSchemeInfo: props => <InputSchemeInfo {...props} />,
        aprvSchemeInfo: props => <AprvSchemeInfo {...props} />,
        schemeInfoActMandate: props => <SchemeInfoActMandate {...props} />
    },
    flStrtgRevw: {
        updt: props => <UpdateStrategy {...props} />,
        dwndStrtgRvw: props => <DownloadData {...props} />,
        genrDocs: props => <UploadGenerateAllDocuments {...props} />,
        aprvAdvReprt: props => <AdversoryDocumentApproveStep {...props} />,
        aprvFma: props => <FMADocumentApproveStep {...props} />,
        aprvSip: props => <SipDocumentApproveStepInStep {...props} />,
        publDocs: props => <PublishmentDocumentApproveStepInStep {...props} />,
        schAprvAdvReprt: props => <AdversoryReportDocumentApproveStepInStep {...props} />,
        schAprvFma: props => <FmaReportDocumentApproveStepInStep {...props} />,
        schAprvSip: props => <SipReportDocumentApproveStepInStep {...props} />,
        spnsrConsltLtr: props => <ConsultLetterDocumentApproveStepInStep {...props} />,
        lgimFMAExcuStat: props => <SigningStepInStep {...props} />,
        actMendt: props => <MandationStepInStep {...props} />
    },
    updLiabInfo: {
        inputLiabInfo: props => <InputLiabInfo {...props} />,
        dwnldLiabUpdinfo: props => <DwnldLiabUpdinfo {...props} />,
        genrtAdvRprt: props => <GenrtAdvRprt {...props} />,
        aprvAdvRprt: props => <AprvAdvRprt {...props} />,
        actMendtLiabInfo: props => <ActMendtLiabInfo {...props} />
    },
    trustees: {
        chngTrust: props => <ChangeTrustee {...props} />,
        clientApprTrust: props => <ClientApproveTrustee {...props} />,
        lgimApprTrust: props => <AdminApproveTrustee {...props} />
    }

/*don't edit after this line mannully or change anything or remove this comment*/

};

export default StepConfig;
