import React, { Component } from 'react';
import { Col, Row, Comment, Empty, Select, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import Moment from 'helpers/Moment';
import config from 'appConfig';

import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { FileDownloader } from '../../../../../UILibrary/components/forms/fields';
import ProfileImage from '../../../../../components/profileimage';

import { store_schemeData } from '../../../selector';
import { doRequestReport, doRequestSelectedReport } from './action';
import { report_config } from './../../selectors/reportDirectorySelectors';
import { report_data_inProgress, report_data, report_data_error } from './selector';

import {
    SELECT_DOCUMENT_TYPE,
    SELECT_DOCUMENT_NAME,
    NO_DATA
} from './constants';
import { STATES_APPROVE, STATES_REJECT } from '../../../../../config/constants';
import connectApi from '../../../../../middlewares/connectApi';

const { Option } = Select;
const { bucket: privateBucketName, publicBucket: publicBucketName, generateBucket: generateBucketName } = config;

class ReportsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDocUrl: null,
            viewComments: null,
            reportList: [],
            type: null,

            reportListValue: SELECT_DOCUMENT_NAME,
            dataSetValue: SELECT_DOCUMENT_TYPE,
            tempFormType: this.props.formType,

            report_config: {},

            report_data: null,
            report_data_inProgress: false,
            report_data_error: null
        };
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        // set data to states
        if (np.formType !== null && this.state.tempFormType !== np.formType) {
            this.setState({
                dataSetValue: SELECT_DOCUMENT_TYPE,
                reportListValue: SELECT_DOCUMENT_NAME,
                tempFormType: np.formType
            });
        }

        if (np.report_data_inProgress && this.state.report_data_inProgress !== np.report_data_inProgress) {
            this.setState({ report_data_inProgress: np.report_data_inProgress });
        }

        if (np.report_data) {
            this.setState({ report_data: np.report_data }, () => {
                this.formatData();
            });
        }

        if (np.report_data_error) {
            this.setState({ report_data_error: np.report_data_error }, () => {
                NotificationHelper.getInstance().error(np.report_data_error.message);
            });
        }
        if (np.selected_document_data && this.state.selected_document_data !== np.selected_document_data) {
            this.setState({ viewDocUrl: np.selected_document_data.documentURL });
        }
    }

    renderCommentAuthor = comment => {
        if (comment.action === STATES_APPROVE) {
            return <span className="approved-text">{comment.name} - Approved</span>;
        } else if (comment.action === STATES_REJECT) {
            return <span className="rejected-text">{comment.name} - Rejected</span>;
        }
        return comment.name;
    };

    requestOtherData = event => {
        const {
            formType,
            store_schemeData: { schemeId }
        } = this.props;
        const section = formType;
        const type = event;
        console.log('Load requestOtherData', event);
        this.setState({
            type,
            viewComments: null,
            viewDocUrl: null,
            reportList: null,
            dataSetValue: event,
            reportListValue: SELECT_DOCUMENT_NAME
        });

        this.props.doRequestReport({
            section,
            type,
            entityId: schemeId
        });
    };

    formatData = () => {
        const { report_data, dataSetValue } = this.state;
        if (report_data && report_data.length) {
            report_data.reverse();
            const reportList = report_data.map(({ id, documentName, transformedTitle }) => {
                return {
                    value: transformedTitle,
                    key: id,
                    documentName: documentName
                };
            });
            this.setState({
                reportList: reportList,
                viewDocUrl: null,
                viewComments: null
            });
        } else {
            this.setState({
                reportListValue: dataSetValue !== SELECT_DOCUMENT_TYPE ? NO_DATA : SELECT_DOCUMENT_NAME,
                reportList: []
            });
        }
    };

    viewData = event => {
        const {
            formType,
            store_schemeData: { schemeId }
        } = this.props;

        const section = formType;
        const type = this.state.type;
        const documentId = event;
        const report = this.state.report_data.find(x => x.id == event);

        this.setState({ reportListValue: event, viewDocUrl: report.documentURL });
        this.props.doRequestSelectedReport({
            section,
            type,
            documentId,
            schemeId
        });
    };

    removeUnwantedItems = (data, removeItem) => {
        return data.filter(function(el) {
            return el.key !== removeItem;
        });
    };



    render() {
        const { formType, store_schemeData, amaodData, report_config, report_data_inProgress } = this.props;
        const { viewDocUrl, viewComments, reportList, dataSetValue, reportListValue } = this.state;
        // generating dataMap obj using document config.
        const dataMap = {};
        for (const [key, value] of Object.entries(report_config)) {
            dataMap[key] = value.dataMap;
        }

        let dataSet = [];
        let tempDataSet = [];
        const extension = viewDocUrl ? viewDocUrl.split('.').pop() : 'pdf';
        if (
            // if hasManagers false remove manager termination letters from first drop down
            formType === 'Letters' &&
            store_schemeData &&
            !store_schemeData.hasManagers
        ) {
            // dataSet = this.removeUnwantedItems(dataMap[formType], MANAGER_TERMINATION_LETTER);
        } else {
            dataSet = dataMap[formType];
        }

        dataSet.sort((prv, nxt) => parseInt(prv.sortOrder) - parseInt(nxt.sortOrder));

        return (
            <Row className="input-row">
                <div className="ant-row">
                    <Col xl={24} lg={24} xs={24} className="label-wrapper doc-view">
                        {this.props.formType !== 'Notices' ? (
                            <Select
                                onChange={event => this.requestOtherData(event)}
                                style={{ width: '30%' }}
                                value={dataSetValue}
                            >
                                {dataSet.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.key}>
                                            {item.value}
                                        </Option>
                                    );
                                })}
                            </Select>
                        ) : null}
                        <Select
                            onChange={event => this.viewData(event)}
                            style={{ width: '49%' }}
                            value={reportListValue}
                            loading={report_data_inProgress}
                            notFoundContent={report_data_inProgress ? <Spin size="small" /> : null}
                        >
                            <Option value="jack" disabled ></Option>
                            {dataSetValue !== SELECT_DOCUMENT_TYPE &&
                                reportList &&
                                reportList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.key}>
                                            <Tooltip title={item.documentName}>
                                                <span className="i-icon">{item.value}</span>
                                            </Tooltip>
                                        </Option>
                                    );
                                })}
                        </Select>

                        <FileDownloader
                            type="primaryDownloadButton"
                            url={viewDocUrl}
                            api={connectApi}
                            bucketNameProp={this.props.isPublic ? publicBucketName : privateBucketName}
                        />
                    </Col>
                </div>
                <div className="ant-row">
                    {viewDocUrl &&
                    (dataSetValue !== SELECT_DOCUMENT_TYPE || reportListValue !== SELECT_DOCUMENT_NAME) ? (
                        // pdf view if only select second dropdown value
                        <div className="doc-preview-container">
                            {/* docx/doc view  */}
                            {/* <iframe src="http://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"></iframe> */}

                            <PDFViewer
                                documentURL={viewDocUrl}
                                onlyDownload={viewDocUrl && !['pdf', 'docx'].includes(extension)}
                                extension={extension}
                            />
                        </div>
                    ) : dataSetValue !== null &&
                      dataSetValue !== SELECT_DOCUMENT_TYPE &&
                      (reportListValue === SELECT_DOCUMENT_NAME || reportListValue === NO_DATA) &&
                      !reportList ? (
                        <div className="empty-view">
                            {/* if there isn't any data  */}
                            <Empty
                                description={
                                    <span>
                                        The category you selected has no uploaded documents or no details entered yet.
                                    </span>
                                }
                            />
                        </div>
                    ) : null}
                </div>
                {viewComments &&
                viewComments.length &&
                (dataSetValue !== SELECT_DOCUMENT_TYPE || reportListValue !== SELECT_DOCUMENT_NAME) ? (
                    <div className="comment-container">
                        <h3 className="header">Comments</h3>
                        <div className="comment-list">
                            {viewComments &&
                                viewComments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        author={this.renderCommentAuthor(comment)}
                                        content={<p>{comment.content}</p>}
                                        avatar={<ProfileImage imageUrl={comment.imageUrl || null} alt={comment.name} />}
                                        datetime={
                                            <span>
                                                {moment(Moment.format(comment.createdDateTime)).format('Do MMM YYYY')}
                                            </span>
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                ) : null}
            </Row>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    store_schemeData: store_schemeData(),
    report_config: report_config(),
    report_data: report_data(),
    report_data_inProgress: report_data_inProgress(),
    report_data_error: report_data_error()
});

const mapDispatchToProps = dispatch => ({
    doRequestReport: payload => {
        dispatch(doRequestReport(payload));
    },
    doRequestSelectedReport: payload => {
        dispatch(doRequestSelectedReport(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsView);
