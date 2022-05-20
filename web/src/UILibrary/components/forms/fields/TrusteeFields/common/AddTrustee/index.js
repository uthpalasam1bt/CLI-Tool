import React from 'react';
import { Modal, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { initialize } from 'redux-form';
import _ from 'lodash';
import AddTrusteePopup from './AddTrusteePopup';
import PopupFooter from './PopupFooter';
import { ADD_ACTION, ADD_TRUSTEE_POPUP_FORM, CORPORATE, EDIT_ACTION } from '../../constants';

const PopUpFormForm = props => {
    const { handleShow, isEdit, show, saveTrustee, type, disableCheckBox, isCheckboxChecked, trusteeDetails } = props;
    const dispatch = useDispatch();

    const handleSave = val => {
        saveTrustee[isEdit ? EDIT_ACTION : ADD_ACTION](val);
    };

    const handleModalClose = () => {
        dispatch(initialize(ADD_TRUSTEE_POPUP_FORM, null));
        handleShow();
    };

    return (
        <>
            <Modal
                title={
                    <>
                        <Typography.Text className="trustee-model-title">
                            {' '}
                            {!isEdit
                                ? type === CORPORATE
                                    ? 'Add Corporate Trustee Signatory'
                                    : 'Add Individual Trustee'
                                : type === CORPORATE
                                ? 'Update Corporate Trustee Signatory'
                                : 'Update Individual Trustee'}
                        </Typography.Text>
                    </>
                }
                visible={show}
                onCancel={handleModalClose}
                width={530}
                className="lgim-styles-wrapper add-trustee-Model "
                footer={null}
                maskClosable={false}
            >
                <AddTrusteePopup
                    onSubmit={handleSave}
                    type={type}
                    enableCheck={!disableCheckBox}
                    isChecked={isCheckboxChecked}
                    doHighlight={_.get(trusteeDetails, 'isOtpMisMatched', false)}
                />
                <PopupFooter handleShow={handleModalClose} isEdit={isEdit} />
            </Modal>
        </>
    );
};
export default PopUpFormForm;
