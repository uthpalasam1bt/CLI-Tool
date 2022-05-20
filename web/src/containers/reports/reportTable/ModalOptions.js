import React from 'react';
import PropTypes from 'prop-types';
import ActionPopover from './BasePopoverContainer';
import { TABS } from '../constants/adminReportViewConstant';

const ModalOptions = ({
    tab,
    visibleActionPopover,
    visibleView = false,
    visibleDownload = false,
    visibleDelete = false,
    visibleUpload = false,
    onView,
    onDownload,
    onUpload,
    onDelete,
    onActionPopoverClick,
    concurrencyModalVisibility,
    hidePopOver
}) => {
    const handleView = () => {
        if (onView) {
            onView();
        }
    };

    const handleDownload = () => {
        if (onDownload) {
            onDownload();
        }
    };

    const handleUploadReport = () => {
        if (onUpload) {
            onUpload();
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    const actions = (
        <div className="report-popover-wrap list">
            {visibleView && (
                <a href="#" onClick={handleView}>
                    <p className="list-item">
                        <i className="fa fa-eye icon"></i>View
                    </p>
                </a>
            )}
            {visibleDownload && (
                <a href="#" onClick={handleDownload}>
                    <p className="list-item">
                        <i className="fa fa-download icon"></i>Download
                    </p>
                </a>
            )}
            {visibleUpload && (
                <a href="#" onClick={handleUploadReport}>
                    <p className="list-item">
                        <i className="fa fa-upload icon"></i>
                        {tab && tab === TABS.UPLOAD.TAB_KEY ? 'Upload' : 'Upload & Replace'}
                    </p>
                </a>
            )}
            <hr />
            {visibleDelete && (
                <a onClick={handleDelete}>
                    <p className="list-item delete-item">
                        <i className="fa fa-trash icon"></i>Delete
                    </p>
                </a>
            )}
        </div>
    );

    return (
        <ActionPopover
            hidePopOver={hidePopOver}
            actions={actions}
            visibleActionPopover={visibleActionPopover}
            onActionPopoverClick={onActionPopoverClick}
            concurrencyModalVisibility={concurrencyModalVisibility}
        />
    );
};

ModalOptions.propTypes = {
    onView: PropTypes.func,
    onUpload: PropTypes.func,
    onDelete: PropTypes.func
};

ModalOptions.defaultProps = {
    visibleView: false,
    onView: null,
    onDelete: null
};

export default ModalOptions;
