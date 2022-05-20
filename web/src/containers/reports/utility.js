import _ from 'lodash';
import React from 'react';
import NotificationHelper from '../../helpers/NotificationHelper';
import connectApi from '../../middlewares/connectApi';
import { RA_REPORT_UPLOAD } from './constants/commonConstatnt';
import config from 'appConfig';
import { saveAs } from 'file-saver';
import { downloadingReport, downloadingReportSuccess, uploadingReport, uploadingReportSuccess } from './actions';
import store from '../../redux/store';
import { readFile } from '../../helpers/downloadHelper';
import moment from 'moment';

const { bucket: privateBucketName } = config;

export const ReportTypes = {
    QUARTER: 'QUARTERLY_REPORT',
    LONG_FORM: 'LONG_FORM_REPORT',
    ADHOC: 'AD_HOC_REPORT',
    ADVISORY: 'Advisory'
};

export const ReportStatus = {
    UN_INITIATED: 'UN_INITIATED',
    UPLOADED: 'UPLOADED',
    SELECT_FOR_APPROVAL: 'SELECT_FOR_APPROVAL',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    PENDING_PUBLISH: 'PENDING_PUBLISH',
    PUBLISHED: 'PUBLISHED',
    REPORT_REJECTED: 'REJECTED',
    GENERATION_FAILED: 'Genaration Failed',
};

export const ApprovalStatus = {
    GENERATION_FAILED: 'Genaration Failed',
    APPROVAL_PENDING: 'Approval Pending',
    APPROVAL_PROCEEDING: 'Approval Proceeding',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    PUBLISHED: 'Published',
    GENERATION_PROGRESS: 'Generation Progress'
};

export const DATE_FILTER_TIME_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'DD-MM-YYYY';
export const OUT_TIME_FORMAT = 'MM/DD/YYYY';

export const SORTING_TIME_FORMAT='DD/MM/YYYY,hh:mm:ssA'

export const QUARTER_DATE_SELECTION = [
    { startDate: '01-01', endDate: '31-03' },
    { startDate: '01-04', endDate: '30-06' },
    { startDate: '01-07', endDate: '30-09' },
    { startDate: '01-10', endDate: '31-12' }
];

export const QUARTER = {
    quarter1: 1,
    quarter2: 2,
    quarter3: 3,
    quarter4: 4
};

export const QUARTER_KEYS = {
    1: 'quarter1',
    2: 'quarter2',
    3: 'quarter3',
    4: 'quarter4'
};

export const handleReportName = report => {
    let reportType;
    if (report === ReportTypes.QUARTER) {
        reportType = 'Quarterly';
    } else if (report === ReportTypes.LONG_FORM) {
        reportType = 'Long Form';
    } else if (report === ReportTypes.ADHOC) {
        reportType = 'Ad hoc';
    } else {
        reportType = report;
    }
    return reportType;
};

export const searchFilterValues = {
    adHocReportGenerated: 'Ad hoc (Generated)',
    adHocReportUploaded: 'Ad hoc (Uploaded)',
    quarterlyReportGenerated: 'Quarterly (Generated)',
    quarterlyReportUploaded: 'Quarterly (Uploaded)',
    longFormReportUploaded: 'Long form (Uploaded)'
};

export const GenerationStatus = {
    GENERATION_FAILED: 'Genaration Failed',
    GENERATION_SUCCESS: 'Genaration Success',
    GENERATION_PENDING: 'Pending',
    GENERATION_INPROGRESS: 'In-progress'
};

export const GenerationDropBoxStatus = {
    GENERATION_FAILED: 'Failed'
};

export const getReportStatusMsg = status => {
    let notMsg = 'Report processed already.';

    switch (status) {
        case 'SELECT_FOR_APPROVAL':
            notMsg = `Report currently in 'Select for Approval.'`;
            break;
        case 'PENDING_APPROVAL':
            notMsg = `Report currently in 'Pending Approval.'`;
            break;
        case 'PENDING_PUBLISH':
            notMsg = `Report currently in 'Pending Publishing.'`;
            break;
        case 'pending':
            notMsg = 'Report processed already.';
        default:
            notMsg = 'Report processed already.';
            break
    }
    return notMsg;
};

export const ReportTitleForModal = schemeReport => {
    return (
      <span className="report-name">
            {schemeReport.ReportId ? schemeReport.schemeName : ' '}
          <span className="report-type">
                {schemeReport.ReportId
                  ? schemeReport.ReportType === ReportTypes.QUARTER
                    ? 'Quarterly'
                    : schemeReport.ReportType === ReportTypes.LONG_FORM
                      ? 'Long form'
                      : schemeReport.ReportType === ReportTypes.ADHOC
                        ? 'Ad Hoc'
                        : schemeReport.ReportType
                  : ''}
              {schemeReport.ReportId ? ` (${schemeReport.reportSource}) Report` : ' '}
            </span>
        </span>
    );
};

export const handleReportStatus = status => {
    let msg;
    switch (status) {
        case ReportStatus.SELECT_FOR_APPROVAL:
            msg = ApprovalStatus.APPROVAL_PENDING;
            break;
        case ReportStatus.REPORT_REJECTED:
            msg = ApprovalStatus.REJECTED;
            break;
        case ReportStatus.PENDING_APPROVAL:
            msg = ApprovalStatus.APPROVAL_PENDING;
            break;
        case ReportStatus.PENDING_PUBLISH:
            msg = ApprovalStatus.APPROVED;
            break;
        case ReportStatus.PUBLISHED:
            msg = ApprovalStatus.PUBLISHED;
            break
        case ReportStatus.GENERATION_FAILED:
            msg = ApprovalStatus.GENERATION_FAILED;
            break;
        default:
            msg = status;
            break;
    }
    return msg;
};

////common functions

export const handleVisibleModal = (visible, setVisible) => {
    setVisible(!visible);
};

export const onCloseVisibleModal = (setVisible, props = {}) => {
    const { setViewUrl } = props;
    setVisible(false);
    if (setViewUrl) setViewUrl(null);
};

export const handleUpload = async (selectedReport, upload_url, uploadedFile, tabId, updateStepAction, action) => {
    if (!uploadedFile) {
        return NotificationHelper.getInstance().error('file not selected properly.');
    }
    store.dispatch(uploadingReport());

    if (selectedReport && upload_url && upload_url.newReportData && upload_url.newReportData.path) {
        const myRenamedFile = new File([uploadedFile], renameUploadReport(selectedReport, upload_url));

        let key = myRenamedFile.name ? myRenamedFile.name.trim().replace(/ /g, '__') : '';

        const filePath = upload_url.newReportData.path + '/' + key;

        const { data } = await connectApi.getUploadUrl({ bucketName: privateBucketName, filePath });
        const url = data.content.url;
        if (url) {
            const result = await connectApi.uploadFile({ file: myRenamedFile, url });
            if (!result || result.status !== 200) {
                store.dispatch(uploadingReportSuccess());
                NotificationHelper.getInstance().error('upload failed.');
            }
            if (result.status === 200) {
                store.dispatch(uploadingReportSuccess());

                if (updateStepAction)
                    updateStepAction({
                        action: action ? action : RA_REPORT_UPLOAD,
                        tabId,
                        data: [
                            {
                                entityId: selectedReport.schemeId ? selectedReport.schemeId : null,
                                reportId: upload_url.newReportData.reportId,
                                reportType: _.get(upload_url, 'reportType'),
                                startDate:
                                  selectedReport.ReportType === ReportTypes.ADHOC
                                    ? selectedReport.startDate
                                    : _.get(upload_url, 'startDate'),
                                endDate:
                                  selectedReport.ReportType === ReportTypes.ADHOC
                                    ? selectedReport.endDate
                                    : _.get(upload_url, 'endDate'),
                                reportStatus: ReportStatus.UPLOADED,

                                reportUpload: {
                                    path: upload_url.newReportData.path,
                                    url: filePath,
                                    fileName: key
                                }
                            }
                        ],
                        cb: () => {
                            NotificationHelper.getInstance().success('Upload Successful.');
                        }
                    });
            }
        }
    } else {
        store.dispatch(uploadingReportSuccess());
    }
};

export const downloadReport = async (url, selectedReport) => {
    store.dispatch(downloadingReport());
    if (url) {
        let file = await readFile({
            url: url,
            bucket: privateBucketName
        })

        if (!file) {
            store.dispatch(downloadingReportSuccess());
            NotificationHelper.getInstance().error('Error while downloading file.');
        }
        const chunkedUrl = url.split('/');
        let fileName = chunkedUrl[chunkedUrl.length - 1];

        fileName = fileName.trim().replace(/ /g, '__');

        console.log({ selectedReport });
        const content = new Blob([file], { type: 'application/octet-stream' });
        saveAs(content, fileName);
        store.dispatch(downloadingReportSuccess());
    } else {
        store.dispatch(downloadingReportSuccess());
    }
};

export const renameUploadReport = (UploadScheme, upload_url,generate) => {
    var chars = { ' ': '', '/': '_', '-': '_' };
    const schemeNameprop = UploadScheme.schemeName.replace(/[ /-]/g, m => chars[m]);
    const reportTypeProp = UploadScheme.ReportType && handleReportName(UploadScheme.ReportType);
    const startDateProp = UploadScheme.startDate
      ? moment(UploadScheme.startDate, TIME_FORMAT).format('DDMMYYYYhmmssa')
      : 'Not_Available';
    const endDateProp = UploadScheme.endDate
      ? moment(UploadScheme.endDate, TIME_FORMAT).format('DDMMYYYYhmmssa')
      : 'Not_Available';
    const createdAtProp = UploadScheme.CreatedAt
      ? moment(UploadScheme.CreatedAt).format('DDMMYYYYhmmssa')
      : moment().format('DDMMYYYYhmmssa');
    const reportSourceProp = generate?'G':'U';

    if (UploadScheme.ReportType === ReportTypes.ADHOC) {
        if(generate){
            return `${schemeNameprop}-${reportTypeProp}-${startDateProp}-${endDateProp}-${createdAtProp}-${reportSourceProp}`
        }else{
            return `${schemeNameprop}-${reportTypeProp}-${startDateProp}-${endDateProp}-${createdAtProp}-${reportSourceProp}.pdf`;

        }

    } else {
        const quarter = moment(upload_url.startDate, TIME_FORMAT).quarter();
        const year = moment(upload_url.endDate, TIME_FORMAT).year();
        if(generate){
            return `${schemeNameprop}-${reportTypeProp}-Q${quarter}_${year}-${createdAtProp}-${reportSourceProp}`
        }else{
            return `${schemeNameprop}-${reportTypeProp}-Q${quarter}_${year}-${createdAtProp}-${reportSourceProp}.pdf`;
        }

    }
};