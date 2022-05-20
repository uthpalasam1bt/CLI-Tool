export const portFolioHook = props => {
    let enablePortFolio = false;
    const { getScheme_data, getWorkflowData } = props;

    if (getScheme_data && getScheme_data.status === 'A') {
        const enableWorkflows = ['rtnTargUpd', 'flStrtgRevw'];
        const enableORsteps = {
            rtnTargUpd: ['schAprvAdvReprt'], //PA enble step
            flStrtgRevw: ['schAprvAdvReprt'] //PA enble step
        };
        const completeDependenceis = {
            rtnTargUpd: ['schAprvAdvReprt', 'schAprvFma'],
            flStrtgRevw: ['schAprvAdvReprt', 'schAprvFma']
        };

        if (enableWorkflows.includes(getWorkflowData.workFlowKey)) {
            const steps = getWorkflowData.steps;
            let lastSectionStep = steps.find(
                wf =>
                    enableORsteps[getWorkflowData.workFlowKey].find(
                        step => step === wf.key && wf.enabled && !wf.completed
                    ) || false
            );

            if (!lastSectionStep) {
                return { enablePortFolio };
            } else if (lastSectionStep.key) {
                let lastSectionStepDependeciesNotCompleted = steps.filter(
                    wf =>
                        completeDependenceis[getWorkflowData.workFlowKey].find(
                            step => step === wf.key && wf.enabled && !wf.completed
                        ) || false
                );

                if (
                    lastSectionStepDependeciesNotCompleted &&
                    lastSectionStepDependeciesNotCompleted.length ===
                        completeDependenceis[getWorkflowData.workFlowKey].length
                ) {
                    enablePortFolio = true;
                }

                return {
                    enablePortFolio,
                    workflowStep: lastSectionStep.key,
                    workflowKey: getWorkflowData.workFlowKey
                };
            }
        }

        return enablePortFolio;
    } else if (getScheme_data && getScheme_data.status !== 'A') {
        const regWorkflowData = getWorkflowData;
        const enableORsteps = ['revip', 'revar'];
        const completeDependenceis = {
            revip: ['revip'],
            revar: ['revar', 'revfma', 'revpmc']
        };

        let workflows = [
            ...(Object.keys(regWorkflowData || {}).length > 0 ? regWorkflowData : { workflow: [] }).workflow
        ];

        let lastSectionStep = workflows.find(
            wf =>
                enableORsteps.find(step => step === wf.stepKey && wf.enabled && !wf.completed && !wf.rejected) || false
        );

        if (!lastSectionStep) {
            return { enablePortFolio };
        } else if (lastSectionStep.stepKey) {
            let lastSectionStepDependeciesNotCompleted = workflows.filter(
                wf =>
                    completeDependenceis[lastSectionStep.stepKey].find(
                        step => step === wf.stepKey && wf.enabled && !wf.completed && !wf.rejected
                    ) || false
            );

            if (
                lastSectionStepDependeciesNotCompleted.length === completeDependenceis[lastSectionStep.stepKey].length
            ) {
                enablePortFolio = true;
            }

            return {
                enablePortFolio,
                workflowStep: lastSectionStep.stepKey,
                workflowKey: 'registration'
            };
        }
    }
};
