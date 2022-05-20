import React from 'react';
import { Modal, Button } from 'antd';
import { MODAL } from '../../constants/keyMetricsConstants';
import Typography from 'antd/lib/typography/Typography';

const FilterSaveChangesModal = props => {
    const {
        show,
        handleShow,
        viewId,
        viewName,
        handleViewSaveCb,
        selectedGroups,
        selectedView,
        action,
        hideModal
    } = props;

    const handleOnCancle = e => {
        handleShow();
    };

    const handleOnClick = () => {
        if (selectedView.userId) {
            if (action === MODAL.ACTIONS.SAVE_AS) {
                handleViewSaveCb(viewName);
            } else if (action === MODAL.ACTIONS.SAVE) {
                handleViewSaveCb(null, viewId);
            } else if (action === MODAL.ACTIONS.EDIT) {
                handleViewSaveCb(viewName, viewId);
            }
        } else {
            if (action === MODAL.ACTIONS.SAVE_AS) {
                handleViewSaveCb(viewName, null, selectedGroups);
            } else if (action === MODAL.ACTIONS.SAVE) {
                handleViewSaveCb(null, viewId, selectedGroups);
            } else if (action === MODAL.ACTIONS.EDIT) {
                handleViewSaveCb(viewName, viewId, selectedGroups);
            }
        }
        handleShow();
        hideModal();
    };

    return (
        <Modal
            title="Save Changes"
            visible={show}
            onCancel={handleOnCancle}
            className=" lgim-styles-wrapper  km-fiter-save-model  "
            footer={[
                <div className="km.save-div-tag-btn">
                    <Button key="submit" onClick={handleOnClick} className="lgim-styles-wrapper  km-filter-sv-btn">
                        Done
                    </Button>
                    ,
                </div>
            ]}
            width={320}
            centered
        >
            <Typography className="km-text-content">
                Do you want to save changes you made in the document "{viewName}"?
            </Typography>
        </Modal>
    );
};

export default FilterSaveChangesModal;
