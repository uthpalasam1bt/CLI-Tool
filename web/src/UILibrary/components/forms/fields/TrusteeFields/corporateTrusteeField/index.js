import React, { useState, useEffect } from 'react';
import { Col, Row, Collapse, Divider } from 'antd';
import { Field, FieldArray, change, getFormValues, initialize, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { required } from 'redux-form-validators';
import _ from 'lodash';
import InputField from '../../InputField';
import AddTrusteePopup from '../common/AddTrustee';
import TrusteeCard from '../common/TrusteeCard';
import {
    ADD_ACTION,
    ADD_TRUSTEE_POPUP_FORM,
    CORPORATE,
    DELETE_ACTION,
    EDIT_ACTION,
    INDIVIDUAL,
    TRUSTEE_FIELD_NAME
} from '../constants';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { checkTrusteeAvailability } from '../helpers/checkAvailability';

const { Panel } = Collapse;

const renderCompanyField = ({
    fields,
    meta: { error },
    disabled,
    formData,
    addTrustee,
    updateTrustee,
    hideCardButtons,
    stepCompleted
}) => {
    const genExtra = idx => (
        <div className="add-individual-trustee-wrapper">
            <div className="edit-card-functions">
                <span className="entity-del-func" onClick={() => fields.remove(idx)}>
                    DELETE
                </span>
            </div>
        </div>
    );

    return (
        <>
            {fields.map(
                (field, index) =>
                    (!formData[index] ||
                        !_.get(formData[index], 'trusteeEntityType') ||
                        _.get(formData[index], 'trusteeEntityType') != INDIVIDUAL) && (
                        <>
                            <Collapse defaultActiveKey={[index + 1]}>
                                <Panel
                                    header={_.get(formData[index], 'entityName', '')}
                                    key={index + 1}
                                    extra={!hideCardButtons ? genExtra(index) : null}
                                >
                                    <Row className="input-row">
                                        <Col xl={15} lg={12} xs={24} className="label-wrapper">
                                            <label className="input-title">Corporate trustee company name</label>
                                        </Col>
                                        <Col xl={9} lg={12} xs={24} className="input-wrapper">
                                            <Field
                                                disabled={disabled}
                                                name={`${field}.entityName`}
                                                className="form-control"
                                                component={InputField}
                                                validate={required({ message: 'Required' })}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="add-individual-trustee-wrapper">
                                        <TrusteeCard
                                            trustees={_.get(formData[index], 'trustees', [])}
                                            position={index}
                                            manageTrustee={updateTrustee}
                                            hideButtons={hideCardButtons}
                                            stepCompleted={stepCompleted}
                                        />
                                    </div>
                                    <Divider />
                                    <div className="add-deficit-contributor-wrapper">
                                        <button
                                            style={{ float: 'left' }}
                                            type="button"
                                            className="btn btn-blue-o btn-add-individual-trustee regular btn-add-more cursor-pointer"
                                            disabled={disabled}
                                            onClick={() => {
                                                addTrustee(index);
                                            }}
                                        >
                                            + Add Signatory
                                        </button>
                                    </div>
                                    <br />
                                    <br />
                                </Panel>
                            </Collapse>
                            <br />
                        </>
                    )
            )}
            {error && <li className="error">{error}</li>}

            <div className="add-deficit-contributor-wrapper">
                <button
                    style={{ float: 'left' }}
                    type="button"
                    className="btn btn-blue-o btn-add-individual-trustee regular btn-add-more cursor-pointer"
                    disabled={disabled}
                    onClick={() => {
                        fields.push();
                    }}
                >
                    + Add Corporate Trustee Company
                </button>
            </div>
        </>
    );
};

const CorporateTrusteeSection = props => {
    const { options } = props;
    const { formName, tabKey, disabled = false, hideTrusteeCardActions = false, stepCompleted = false } = options;
    const dispatch = useDispatch();
    const asyncFormData = useSelector(getFormValues(formName));

    const [showAddTrusteePopup, setShowAddTrusteePopup] = useState(false);
    const [currentEntityIndex, setCurrentEntityIndex] = useState(null);
    const [trusteeIndex, setTrusteeIndex] = useState(null);
    const [isEditTrustee, setIsEditTrustee] = useState(false);
    const [allEntities, setAllEntities] = useState([]);
    const [activeTrustee, setActiveTrustee] = useState(null);

    let updateField = TRUSTEE_FIELD_NAME;
    if (tabKey) updateField = `${tabKey}.${TRUSTEE_FIELD_NAME}`;

    useEffect(() => {
        const allTrusteeEntities = _.get(asyncFormData, updateField, []);
        setAllEntities(allTrusteeEntities);
    }, [asyncFormData]);

    const handleShowModal = () => {
        setShowAddTrusteePopup(!showAddTrusteePopup);
    };

    const handleTrusteeAdd = idx => {
        if (idx !== currentEntityIndex) setCurrentEntityIndex(idx);
        handleShowModal();
    };

    const initializePopup = initialData => {
        setActiveTrustee(initialData);
        dispatch(initialize(ADD_TRUSTEE_POPUP_FORM, initialData));
    };
    const resetPopup = () => dispatch(reset(ADD_TRUSTEE_POPUP_FORM));

    const resetAfterAdd = () => {
        handleShowModal();
        resetPopup();
        setCurrentEntityIndex(null);
    };

    const resetAfterEdit = () => {
        setCurrentEntityIndex(null);
        setTrusteeIndex(null);
        setIsEditTrustee(false);
        handleShowModal();
        initializePopup(null);
    };

    const handleSubmit = {
        [ADD_ACTION]: values => {
            let data = allEntities;
            const isExistingTrustee = checkTrusteeAvailability(values, allEntities);
            if (!isExistingTrustee) {
                if (!data[currentEntityIndex]) {
                    data[currentEntityIndex] = {
                        trusteeEntityType: CORPORATE,
                        trustees: [values]
                    };
                    resetAfterAdd();
                } else {
                    if (_.get(data[currentEntityIndex], 'trustees', []).length == 0) {
                        data[currentEntityIndex] = {
                            trusteeEntityType: CORPORATE,
                            ...data[currentEntityIndex],
                            trustees: [values]
                        };
                        resetAfterAdd();
                    } else {
                        data[currentEntityIndex]['trustees'].push(values);
                        resetAfterAdd();
                    }
                }
            } else {
                NotificationHelper.getInstance().error('Trustee already exists!');
            }
            dispatch(change(formName, updateField, data));
        },
        [EDIT_ACTION]: values => {
            let data = allEntities;
            const trustee = data[currentEntityIndex]['trustees'][trusteeIndex];
            if (trustee.email == values.email) {
                data[currentEntityIndex]['trustees'][trusteeIndex] = values;
                resetAfterEdit();
            } else {
                const isExistingTrustee = checkTrusteeAvailability(values, allEntities);
                if (!isExistingTrustee) {
                    data[currentEntityIndex]['trustees'][trusteeIndex] = values;
                    resetAfterEdit();
                } else {
                    NotificationHelper.getInstance().error('Trustee already exists!');
                }
            }
            dispatch(change(formName, updateField, data));
        }
    };

    const manageTrustee = {
        [DELETE_ACTION]: (email, trusteeEntityIndex) => {
            let data = allEntities;
            const trusteeEntity = data[trusteeEntityIndex];
            const trusteeIndex = trusteeEntity.trustees.findIndex(x => x.email == email);
            data[trusteeEntityIndex]['trustees'].splice(trusteeIndex, 1);
            dispatch(change(formName, updateField, data));
        },
        [EDIT_ACTION]: (email, idx) => {
            setCurrentEntityIndex(idx);
            const trusteePosition = allEntities[idx]['trustees'].findIndex(x => x.email == email);
            setTrusteeIndex(trusteePosition);
            initializePopup(allEntities[idx]['trustees'][trusteePosition]);
            setIsEditTrustee(true);
            handleShowModal();
        }
    };

    return (
        <>
            {showAddTrusteePopup ? (
                <AddTrusteePopup
                    type={CORPORATE}
                    show={showAddTrusteePopup}
                    handleShow={() => {
                        handleShowModal();
                        setIsEditTrustee(false);
                        setActiveTrustee(null);
                    }}
                    saveTrustee={handleSubmit}
                    isEdit={isEditTrustee}
                    trusteeDetails={activeTrustee}
                />
            ) : null}
            <div className="corp-trustee-wrapper">
                <FieldArray
                    name={TRUSTEE_FIELD_NAME}
                    component={renderCompanyField}
                    disabled={disabled}
                    formData={allEntities}
                    addTrustee={handleTrusteeAdd}
                    updateTrustee={manageTrustee}
                    hideCardButtons={hideTrusteeCardActions}
                    stepCompleted={stepCompleted}
                />
            </div>
        </>
    );
};
export default CorporateTrusteeSection;
