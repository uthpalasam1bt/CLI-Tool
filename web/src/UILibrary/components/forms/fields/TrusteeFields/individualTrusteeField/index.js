import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { Field, change, initialize, getFormValues, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import NumberField from '../../NumberField';
import { required } from 'redux-form-validators';
import TrusteeCard from '../common/TrusteeCard';
import AddTrusteePopup from '../common/AddTrustee';
import {
    ADD_ACTION,
    ADD_TRUSTEE_POPUP_FORM,
    DELETE_ACTION,
    EDIT_ACTION,
    INDIVIDUAL,
    TRUSTEE_FIELD_NAME
} from '../constants';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { checkTrusteeAvailability } from '../helpers/checkAvailability';

const IndividualTrustee = props => {
    const { options } = props;
    const { formName, tabKey, disabled = false, hideTrusteeCardActions = false, stepCompleted = false } = options;
    const dispatch = useDispatch();
    const asyncFormData = useSelector(getFormValues(formName));

    const [showAddTrustee, setShowAddTrustee] = useState(false);
    const [isEditTrustee, setIsEditTrustee] = useState(false);
    const [position, setPosition] = useState(null);
    const [indvTrustees, setIndvTrustees] = useState([]);
    const [allEntities, setAllEntities] = useState([]);
    const [activeTrustee, setActiveTrustee] = useState(null);

    let updateField = TRUSTEE_FIELD_NAME;
    if (tabKey) updateField = `${tabKey}.${TRUSTEE_FIELD_NAME}`;

    useEffect(() => {
        const allTrusteeEntities = _.get(asyncFormData, updateField, []);
        setAllEntities(allTrusteeEntities);

        const individualTrustees = allTrusteeEntities.filter(x => _.get(x, 'trusteeEntityType') == INDIVIDUAL);
        const trusteeList = individualTrustees.map(x => x.trustees[0]);
        trusteeList.sort((x, y) => (x.primary ? -1 : y.primary ? 1 : 0));
        setIndvTrustees(trusteeList);
    }, [asyncFormData]);

    const handleShowModal = () => {
        setShowAddTrustee(!showAddTrustee);
    };

    const initializePopup = initialData => {
        setActiveTrustee(initialData);
        dispatch(initialize(ADD_TRUSTEE_POPUP_FORM, initialData));
    };
    const resetPopup = () => dispatch(reset(ADD_TRUSTEE_POPUP_FORM));

    const handleSubmit = {
        [ADD_ACTION]: values => {
            let data = allEntities;
            const isExistingTrustee = checkTrusteeAvailability(values, allEntities);
            if (!isExistingTrustee) {
                if (indvTrustees.length == 0) {
                    data.push({
                        trusteeEntityType: INDIVIDUAL,
                        trustees: [{ ...values, primary: true }]
                    });
                    handleShowModal();
                    resetPopup();
                } else {
                    if (values.primary) {
                        const currentPrimaryIdx = data.findIndex(
                            x => _.get(x, 'trusteeEntityType') == INDIVIDUAL && x.trustees[0].primary
                        );
                        const currentPrimary = data[currentPrimaryIdx]['trustees'][0];
                        delete currentPrimary.primary;
                        data[currentPrimaryIdx]['trustees'] = [currentPrimary];
                    }
                    data.push({
                        trusteeEntityType: INDIVIDUAL,
                        trustees: [values]
                    });
                    handleShowModal();
                    resetPopup();
                }
            } else {
                NotificationHelper.getInstance().error('Trustee already exists!');
            }
            dispatch(change(formName, updateField, data));
        },
        [EDIT_ACTION]: values => {
            let data = allEntities;
            if (values.email == data[position]['trustees'][0].email) {
                if (indvTrustees.length > 1 && !data[position]['trustees'][0].primary && values.primary) {
                    const currentPrimaryIdx = data.findIndex(
                        x => _.get(x, 'trusteeEntityType') == INDIVIDUAL && x.trustees[0].primary
                    );
                    const currentPrimary = data[currentPrimaryIdx]['trustees'][0];
                    delete currentPrimary.primary;
                    data[currentPrimaryIdx]['trustees'] = [currentPrimary];
                }
                data[position]['trustees'] = [values];
                handleShowModal();
                setIsEditTrustee(false);
                initializePopup(null);
            } else {
                const isExistingTrustee = checkTrusteeAvailability(values, allEntities);
                if (isExistingTrustee) {
                    NotificationHelper.getInstance().error('Trustee already exists!');
                } else {
                    if (indvTrustees.length > 1 && !data[position]['trustees'][0].primary && values.primary) {
                        const currentPrimaryIdx = data.findIndex(
                            x => _.get(x, 'trusteeEntityType') == INDIVIDUAL && x.trustees[0].primary
                        );
                        const currentPrimary = data[currentPrimaryIdx]['trustees'][0];
                        delete currentPrimary.primary;
                        data[currentPrimaryIdx]['trustees'] = [currentPrimary];
                    }
                    data[position]['trustees'] = [values];
                    handleShowModal();
                    setIsEditTrustee(false);
                    initializePopup(null);
                }
            }
            dispatch(change(formName, updateField, data));
        }
    };

    const manageTrustee = {
        [EDIT_ACTION]: email => {
            let data = allEntities;
            const initialDataIndex = data.findIndex(
                x => _.get(x, 'trusteeEntityType') == INDIVIDUAL && x.trustees[0].email == email
            );
            initializePopup(data[initialDataIndex]['trustees'][0]);
            setIsEditTrustee(true);
            handleShowModal();
            setPosition(initialDataIndex);
        },
        [DELETE_ACTION]: email => {
            let data = allEntities;
            let entityIndex = data.findIndex(x => _.get(x, 'trusteeEntityType') && x.trustees[0].email == email);
            if (indvTrustees.length > 1) {
                if (!data[entityIndex]['trustees'][0].primary) {
                    data.splice(entityIndex, 1);
                    dispatch(change(formName, updateField, data));
                } else {
                    NotificationHelper.getInstance().error("Couldn't delete primary trustee");
                }
            } else {
                data.splice(entityIndex, 1);
                dispatch(change(formName, updateField, data));
            }
        }
    };

    return (
        <>
            <div className="add-individual-trustee-wrapper">
                <Row className="input-row">
                    <Col xl={15} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title">Number of individual trustees</label>
                    </Col>
                    <Col xl={9} lg={12} xs={24} className="input-wrapper">
                        <Field
                            disabled={disabled}
                            name="numOfIndividualTrustees"
                            className="form-control"
                            component={NumberField}
                            validate={indvTrustees.length ? [required({ message: 'Required' })] : null}
                            options={{
                                decimalScale: 0,
                                allowNegative: false,
                                min: 1
                            }}
                        />
                    </Col>
                </Row>
                <TrusteeCard
                    trustees={indvTrustees}
                    manageTrustee={manageTrustee}
                    hideButtons={hideTrusteeCardActions}
                    stepCompleted={stepCompleted}
                />
                <button
                    style={{ float: 'left' }}
                    type="button"
                    className="btn btn-blue-o btn-add-individual-trustee regular btn-add-more cursor-pointer"
                    disabled={disabled}
                    onClick={handleShowModal}
                >
                    + Add Individual Trustee
                </button>
            </div>
            {showAddTrustee ? (
                <AddTrusteePopup
                    type={INDIVIDUAL}
                    show={showAddTrustee}
                    handleShow={() => {
                        handleShowModal();
                        setIsEditTrustee(false);
                        setActiveTrustee(null);
                    }}
                    saveTrustee={handleSubmit}
                    isEdit={isEditTrustee}
                    isCheckboxChecked={indvTrustees.length === 0}
                    disableCheckBox={
                        indvTrustees.length === 0 || (isEditTrustee && allEntities[position]['trustees'][0].primary)
                    }
                    trusteeDetails={activeTrustee}
                />
            ) : null}
        </>
    );
};

export default IndividualTrustee;
