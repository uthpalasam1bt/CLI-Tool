import React, { useEffect } from 'react';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommonModal from './BaseModalComponent';
import { TIME_FORMAT } from '../../utility';
import _ from 'lodash';
import NotificationHelper from '../../../../UILibrary/helpers/NotificationHelper';

const { Dragger } = Upload;

const UploadModal = ({ isDisabled, onClose, onProceed, visible, schemeData ,setDeleteFile,
    setIsDisabled,
    setUploadedFile,
    setDeleteUploadedFile,
    deleteUploadedFile,
    deleteFile
        }) => {
            
    useEffect(() => {
                if (deleteUploadedFile && deleteFile) handleUploadReport.onChange(deleteFile);
            }, [deleteUploadedFile]);

    const handleUploadReport = {
        multiple: false,
        onChange: file => {
            if (file && file.file.type !== 'application/pdf') {
                NotificationHelper.getInstance().warning('PDF files only.');
                setIsDisabled(true);
                return file.fileList.shift();
            }

            if (file && file.fileList.length === 0) {
                return setIsDisabled(true);
            }
            setDeleteFile(file);
            if (file && file.fileList.length > 1) {
                file.fileList.shift();
            }
            setIsDisabled(false);
            if (deleteUploadedFile) {
                setIsDisabled(true);
                file.fileList.length = 0;
                setUploadedFile(null);

                setDeleteUploadedFile(false);
            }
        },

        onRemove: () => {
            setUploadedFile(null);

            return { file: null, fileList: [] };
        },
        beforeUpload: file => {
            setUploadedFile(file);

            return false;
        }
    };
    const content = schemeData && (
        <div className="content">
            <div className="content-text">{schemeData.schemeName}</div>
            <span className="content-sub-text italic">{schemeData.uploadStatus}</span>
            <span className="content-sub-text">
                {_.get(schemeData, 'startDate')
                    ? moment(_.get(schemeData, 'startDate'), TIME_FORMAT).format(TIME_FORMAT)
                    : 'N/A'}{' '}
                to{' '}
                {_.get(schemeData, 'endDate')
                    ? moment(_.get(schemeData, 'endDate'), TIME_FORMAT).format(TIME_FORMAT)
                    : 'N/A'}
            </span>
            <Dragger className="dragger" type="file" accept="application/pdf" {...handleUploadReport}>
                <div>
                    <p className="ant-upload-drag-icon">
                        <i className="fa fa-upload icon" />
                    </p>
                    <p className="ant-upload-text">Upload</p>
                    <p className="ant-upload-hint">Click or drag file to upload.</p>
                </div>
            </Dragger>
        </div>
    );

    return (
        <CommonModal
            visible={visible}
            className="lgim-styles-wrapper modal-report upload-modal add-user-modal"
            title="Upload"
            onCancel={onClose}
            onProceed={onProceed}
            content={content}
            cancelButton={
                <button className="btn btn-cancel" onClick={onClose}>
                    Cancel
                </button>
            }
            proceedButton={
                <button className="btn btn-proceed" disabled={isDisabled} onClick={onProceed}>
                    Proceed
                </button>
            }
            footerContent={true}
        />
    );
};

UploadModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired
};

export default UploadModal;
