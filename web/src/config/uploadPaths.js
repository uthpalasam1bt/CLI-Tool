module.exports = (liabilitiesFsKey, fundingFsKey) => ({
    rip: {
        cashflow: (schemeId, proposalName, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${liabilitiesFsKey}/${timeStamp}/${key}`,
        deficitContribution: (schemeId, proposalName, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${fundingFsKey}/${timeStamp}/${key}`
    },
    pip: {
        publish: (schemeId, proposalName, key, timeStamp) =>
            `uploads/scheme/${schemeId}/publishInitialProposal/${timeStamp}/${key}`
    },
    riaa: {
        requestIAA: (schemeId, iaaId, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${iaaId}/requestIAA/${timeStamp}/${key}`,
        generateIAA: (schemeId, iaaId, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${iaaId}/generateIAA/${timeStamp}/${key}`,
        managerLetters: (schemeId, iaaId, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${iaaId}/managerLetters/${timeStamp}/${key}`
    },
    addtrst: {
        addTrustee: (schemeId, iaaId, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${iaaId}/addTrustee/${timeStamp}/${key}`
    },
    amao: {
        requestAMAO: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/requestAMAO/${timeStamp}/${key}`,
        advisoryReport: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/advisoryReport/${timeStamp}/${key}`,
        fma: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/fma/${timeStamp}/${key}`,
        pmcProposal: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/pmcProposal/${timeStamp}/${key}`,
        scl: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/scl/${timeStamp}/${key}`,
        lta: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/lta/${timeStamp}/${key}`
    },
    mtl: {
        managerTermination: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/generateMTL/${timeStamp}/${key}`
    },
    ias: {
        pmcPolicy: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/generatePMCPolicy/${timeStamp}/${key}`
    },
    gtl: {
        generateIAA: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/generateIAA/${timeStamp}/${key}`
    },
    fma: {
        generateFMA: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/generateFMA/${timeStamp}/${key}`
    },
    ari: {
        generateAIR: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/generateARI/${timeStamp}/${key}`
    },
    dc: {
        generateDC: (schemeId, key, timeStamp) => `uploads/scheme/${schemeId}/genAdvsryRprt/${timeStamp}/${key}`
    },
    profile: {
        image: (userId, key, timeStamp) => `userProfile/${userId}/${timeStamp}/${key}`
    },
    adv: {
        generateIAA: (schemeId, key, timeStamp) => `uploads/activeScheme/${schemeId}/generateIAA/${timeStamp}/${key}`
    },
    tdd: {
        trustDeed: (schemeId, key, timeStamp) => `uploads/trusteeChange/${schemeId}/trustDeed/${timeStamp}/${key}`
    },
    activeWorkFlow: {
        generateTR: (schemeId, key, timeStamp) => `activeWorkflow/generateTr/${schemeId}/${timeStamp}/${key}`,
        generateSIP_USIP: (schemeId, key, timeStamp) =>
            `activeWorkflow/usip/generateSip/${schemeId}/${timeStamp}/${key}`,
        generateSCL_USIP: (schemeId, key, timeStamp) =>
            `activeWorkflow/usip/generateScl/${schemeId}/${timeStamp}/${key}`,
        generateAR_AVC: (schemeId, key, timeStamp) =>
            `activeWorkflow/avc/generateArAvc/${schemeId}/${timeStamp}/${key}`,
        generateSIP_AVC: (schemeId, key, timeStamp) =>
            `activeWorkflow/avc/generateSipAvc/${schemeId}/${timeStamp}/${key}`,
        generateSCL_AVC: (schemeId, key, timeStamp) =>
            `activeWorkflow/avc/generateSclAvc/${schemeId}/${timeStamp}/${key}`,
        generateAR_RTU: (schemeId, key, timeStamp) =>
            `activeWorkflow/rtu/generateArRtu/${schemeId}/${timeStamp}/${key}`,
        generateFMA_RTU: (schemeId, key, timeStamp) =>
            `activeWorkflow/rtu/generateFmaRtu/${schemeId}/${timeStamp}/${key}`,
        generateSIP_RTU: (schemeId, key, timeStamp) =>
            `activeWorkflow/rtu/generateSipRtu/${schemeId}/${timeStamp}/${key}`,
        generateSCL_RTU: (schemeId, key, timeStamp) =>
            `activeWorkflow/rtu/generateSclRtu/${schemeId}/${timeStamp}/${key}`,
        generateAR_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/generateArFsr/${schemeId}/${timeStamp}/${key}`,
        generateFMA_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/generateFmaFsr/${schemeId}/${timeStamp}/${key}`,
        generateSIP_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/generateSipFsr/${schemeId}/${timeStamp}/${key}`,
        generateSCL_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/generateSclFsr/${schemeId}/${timeStamp}/${key}`,
        generateCashflow_overall_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/cashflowOverallFSR/${schemeId}/${timeStamp}/${key}`,
        generateCashflow_fNr_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/cashflowfNrFSR/${schemeId}/${timeStamp}/${key}`,
        generateDeficitContribution_FSR: (schemeId, key, timeStamp) =>
            `activeWorkflow/fsr/deficitContribution/${schemeId}/${timeStamp}/${key}`,
        cashflow: (schemeId, key, timeStamp) => `activeWorkflow/cashflow/${schemeId}/${timeStamp}/${key}`,
        generateFMA: (schemeId, key, timeStamp) => `activeWorkflow/fma/${schemeId}/${timeStamp}/${key}`,
        generateAIR: (schemeId, key, timeStamp) => `activeWorkflow/ari/${schemeId}/${timeStamp}/${key}`,
        latestDeedOfTrusteeDoc: (schemeId, key, timeStamp) =>
            `activeWorkflow/lastestDeedOfTrustee/${schemeId}/${timeStamp}/${key}`,
        hmrcDoc: (schemeId, key, timeStamp) => `activeWorkflow/hmrcDoc/${schemeId}/${timeStamp}/${key}`,
        schemeAccounts: (schemeId, key, timeStamp) => `activeWorkflow/schemeAccounts/${schemeId}/${timeStamp}/${key}`,
        certificateOfIncorpation: (schemeId, key, timeStamp) =>
            `activeWorkflow/certificateOfIncorpation/${schemeId}/${timeStamp}/${key}`,
        copyOfAuthReqDisvestment: (schemeId, key, timeStamp) =>
            `activeWorkflow/copyOfAuthReqDisvestment/${schemeId}/${timeStamp}/${key}`,
        copyOfAdminConfirmAuthIndi: (schemeId, key, timeStamp) =>
            `activeWorkflow/copyOfAuthReqDisvestment/${schemeId}/${timeStamp}/${key}`,
        generateIAA: (schemeId, key, timeStamp) => `activeWorkflow/generateIAA/${schemeId}/${timeStamp}/${key}`,
        generateDC: (schemeId, key, timeStamp) => `activeWorkflow/generateDC/${schemeId}/${timeStamp}/${key}`,
        generatePMC: (schemeId, key, timeStamp) => `activeWorkflow/generatePMC/${schemeId}/${timeStamp}/${key}`,
        generateSIP: (schemeId, key, timeStamp) => `activeWorkflow/generateSIP/${schemeId}/${timeStamp}/${key}`,
        sponsorConsulationLetter: (schemeId, key, timeStamp) =>
            `activeWorkflow/sponsorConsulationLetter/${schemeId}/${timeStamp}/${key}`
    },
    multiClient: {
        generateFMA: (id, key, timeStamp) => `multiclient/fma/${id}/${timeStamp}/${key}`,
        generateIAA: (id, key, timeStamp) => `multiclient/iaa/${id}/${timeStamp}/${key}`,
        generateNotice: (id, key, timeStamp) => `multiclient/notice/${id}/${timeStamp}/${key}`
    }
});
