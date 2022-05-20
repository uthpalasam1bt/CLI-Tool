import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { abortWorkFlows } from '../../../../actions/workflowActions';

const AbortPopup = props => {
    const {
        showPopup,
        activeWorkflows,
        handleClose,
        abortWorkFlows,
        entityId,
        onSuccess,
        pullAbortableSectionList,
        pullAbortableWFList, 
        isMultiClient
    } = props;

    const [checkedList, setCheckList] = useState([]);
    const [isAgreed, setIsAgreed] = useState(false);
    const [activeAbortableSections, setActiveAbortableSections] = useState([]);
    const [abortableWorkflows, setAbortableWorkflows] = useState([]);

    useEffect(() => {
        const abortableWFs = activeWorkflows.filter(awf => !awf.abortableSections || (awf.abortableSections && !awf.abortableSections.find(stp => !stp.hide)));

        setAbortableWorkflows(abortableWFs);

        const abortableSectionsWFs = activeWorkflows.filter(awf => awf.abortableSections);

        let activeSections = [];

        for (const workflow of abortableSectionsWFs) {
            const { abortableSections = [], steps = [] } = workflow;

            for (const section of abortableSections) {
                if (section.hide) continue;
                const stepKeys = [...section.pendingSteps, ...section.abortSteps];

                const foundCompletedStep = stepKeys.find(stepKey => {
                    const step = steps.find(st => st.stepKey === stepKey);

                    return step && step.completed && step.enabled;
                });
                const foundPendingStep = stepKeys.find(stepKey => {
                    const step = steps.find(st => st.stepKey === stepKey);

                    return step && !step.completed && !step.rejected && step.enabled;
                });

                if (foundCompletedStep && foundPendingStep) {
                    activeSections.push({
                        workflowKey: workflow.workflowKey,
                        sectionId: section.sectionId,
                        sectionName: section.sectionName,
                        sectionTitle: section.sectionTitle
                    });
                }
            }
        }

        setActiveAbortableSections(activeSections);
    }, [activeWorkflows]);

    pullAbortableWFList(abortableWorkflows);
    pullAbortableSectionList(activeAbortableSections);

    const isSelectedItem = value => {
        let selectedIndex;
        if (value.sectionId) {
            selectedIndex = checkedList.findIndex(section => section.sectionId === value.sectionId);
        } else {
            selectedIndex = checkedList.findIndex(wf => wf.workflowId === value.workflowId);
        }
        return selectedIndex;
    };

    const setSelection = value => {
        if (isSelectedItem(value) === -1) setCheckList([...checkedList, value]);
    };

    const deselect = value => {
        if (value.sectionId) {
            setCheckList(checkedList.filter(section => section.sectionId !== value.sectionId));
        }
        setCheckList(checkedList.filter(wf => wf.workflowId !== value.workflowId));
    };

    const closePopup = () => {
        setIsAgreed(false);
        setCheckList([]);
        handleClose();
    };

    const abort = () => {
        if (isAgreed && checkedList.length > 0) {
            abortWorkFlows(
                {
                    entityId,
                    abortRequests: checkedList,
                    isMultiClient
                },
                () => {
                    onSuccess();
                }
            );

            closePopup();
        }
    };

    const renderWorkflows = () => (
        <>
            <Col xl={24} className="title-wrap">
                <h4 className="title">ABORT</h4>
            </Col>
            <Col xl={24} className="content-wrap">
                <p className="content-text">
                    Please note that aborting an update will invalidate the changes in progress. <br />
                    Select the scheme update(s) you wish to abort from the list below:
                </p>
                <Row>
                    {abortableWorkflows.map((item, i) => (
                        <Col span={12}>
                            <Checkbox
                                key={i}
                                value={{ workflowId: item.workflowKey }}
                                checked={isSelectedItem({ workflowId: item.workflowKey }) > -1 ? true : false}
                                onChange={e =>
                                    e.target.checked ? setSelection(e.target.value) : deselect(e.target.value)
                                }
                            >
                                {item.title}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Col>
        </>
    );

    return (
        <>
            <Modal
                visible={showPopup}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper abort-modal active-modal"
                onCancel={() => closePopup()}
            >
                <div className="add-user-modal-wrapper">
                    <Row>
                        {activeAbortableSections.length ? (
                            <>
                                <Col xl={24} className="title-wrap">
                                    <h4 className="title">
                                        {activeAbortableSections[0].sectionTitle
                                            ? `ABORT: '${activeAbortableSections[0].sectionTitle}' step`
                                            : 'ABORT'}
                                    </h4>
                                </Col>
                                <Col xl={24} className="content-wrap">
                                    <p className="content-text">
                                        <Checkbox
                                            value={{
                                                workflowId: activeAbortableSections[0].workflowKey,
                                                sectionId: activeAbortableSections[0].sectionId
                                            }}
                                            checked={
                                                isSelectedItem({
                                                    workflowId: activeAbortableSections[0].workflowKey,
                                                    sectionId: activeAbortableSections[0].sectionId
                                                }) > -1
                                                    ? true
                                                    : false
                                            }
                                            style={{
                                                marginBottom: '0%',
                                                paddingBottom: '0%',
                                                paddingRight: '3%'
                                            }}
                                            onChange={e =>
                                                e.target.checked
                                                    ? setSelection(e.target.value)
                                                    : deselect(e.target.value)
                                            }
                                        ></Checkbox>
                                        {activeAbortableSections[0].sectionName}
                                    </p>
                                </Col>
                            </>
                        ) : (
                            renderWorkflows()
                        )}

                        <Col xl={24} className="content-wrap custom">
                            <p className="content-text agree-text">Select 'Agree' to confirm before proceeding.</p>
                            <div className="wrapper">
                                <Checkbox
                                    checked={isAgreed}
                                    value={'agree'}
                                    onChange={e => setIsAgreed(e.target.checked)}
                                >
                                    Agree
                                </Checkbox>
                            </div>
                        </Col>

                        <Col xl={24} className="button-wrap">
                            <div className="wrapper">
                                <button
                                    className="regular btn-cancel btn-grey-o"
                                    onClick={() => {
                                        closePopup();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-red regular btn-abort"
                                    onClick={() => {
                                        abort();
                                    }}
                                    disabled={!(isAgreed && checkedList.length > 0)}
                                >
                                    Abort
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        abortWorkFlows: (payload, callback) => {
            dispatch(abortWorkFlows(payload, callback));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AbortPopup);
