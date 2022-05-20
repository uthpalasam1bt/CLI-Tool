import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'antd';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { history } from 'store';
import moment from 'moment';
import _ from 'lodash';
import uuid from 'uuid';

import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from 'components/Loading';
import NotificationHelper from '../../../../helpers/NotificationHelper';
import { GenerateDownloader } from '../../../../UILibrary/components/forms/fields';
import { downloadFile } from '../../../../helpers/downloadHelper';
import CustomLoader from '../../../../components/CustomLoader';

import prevArrow from 'assets/images/scheme/next.svg';
import nextArrow from 'assets/images/scheme/previous.svg';

import ChartComponents from '../chartingComponents';
import { getChartList } from '../actions';
import { getChartsByPage, clearCharts, generateChartsDocumentRequest, generateAdHocReportRequest } from '../actions';
import { getVisibleChartList } from '../dashboard/rearrange/reducers';

import { getChartDateList, executeStepfunctionRequest } from '../actions';

import {
    AVAILABLE_DATES,
    USER_CHART_LIST,
    DASHBOARD_STEP_FUNCTION_NAME,
    STEP_NAME,
    STEP_FUNCTION_DESCRIPTION,
    INVALIDE_DATE,
    DEFAULT_NO_DATA_MESSAGE,
    PERFORMANCE_NO_DATA_MESSAFE,
    DASHBOARD_SYSTEM_MESSAGES
} from '../constants';

import api from '../../../../middlewares/connectApi';
import AwsIotSingleton from '../../../../helpers/awsIot';

let numberOfChartsPerPage = 4;
let doFetchExecutedCount = 1;
let inprogressCount = 1;
class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            topic: '',
            startDate: AVAILABLE_DATES[0],
            endDate: AVAILABLE_DATES[AVAILABLE_DATES.length - 1],
            dateList: [],
            chartList: [],
            loading: false,
            gettingDatesProgress: false,
            schemeId: null,
            doFetchData: null,
            callDoFetch: false,
            visibleSlide: 0,
            drawableChartTemplateNames: [],
            convertedDateList: [],
            isChartsDocumentGenerationRequestInProgress: false,
            isAdHocReportGenerationRequestInProgress: false,
            isChartsDocumentDownloadInProgress: false,
            isAdHocReportDownloadInProgress: false
        };
    }

    componentDidMount() {
        const {
            schemeId,
            loggedUser: { email: userEmail, userId },
            getChartDateList,
            getChartList,
            getScheme_data
        } = this.props;
        const payload = { schemeId, userEmail };
        const activationCode = getScheme_data && getScheme_data.activationCode ? getScheme_data.activationCode : null;

        this.checkConnectingDevice();

        AwsIotSingleton.getPayloadFromSocket(`/notification/${schemeId}/dashboard`, data => {
            if (data.payload.complete) {
                this.setState({ callDoFetch: true }, () => {});
            } else {
                this.setState({ callDoFetch: false }, () => {});
            }
        });

        // IoT socket listner event handler for dashboard charts document download response
        AwsIotSingleton.getPayloadFromSocket(`/report/charts_document/${schemeId}/${userId}`, data => {
            if (data && data.payload && data.payload.payload) {
                this.downloadChartsDocumentFromSocketPayload(data.payload.payload);
            } else {
                this.setState({ isChartsDocumentDownloadInProgress: false });
                NotificationHelper.getInstance().error(
                    DASHBOARD_SYSTEM_MESSAGES.DOCUMENT_DOWNLOAD_FAIlURE_ERROR.CHARTS_DOCUMENT
                );
            }
        });

        // IoT socket listner event handler for dashboard ad hoc report download response
        AwsIotSingleton.getPayloadFromSocket(`/report/adhoc_report/${schemeId}/${userId}`, data => {
            if (data && data.payload) {
                this.downloadAdHocReportFromSocketPayload(data.payload);
            } else {
                this.setState({ isAdHocReportDownloadInProgress: false });
                NotificationHelper.getInstance().error(
                    DASHBOARD_SYSTEM_MESSAGES.DOCUMENT_DOWNLOAD_FAIlURE_ERROR.ADHOC_REPORT
                );
            }
        });

        // this.executeStepfunction();

        getChartDateList({ activationCode });
        getChartList(payload);
    }

    // Handler for downloading dashboard charts document from socket response + indicating download progress
    downloadChartsDocumentFromSocketPayload = payload => {
        const downloadUrlData = {
            fileName: payload.fileName,
            location: payload.s3pathurl,
            bucket: payload.s3bucketurl
        };
        downloadFile(downloadUrlData, DASHBOARD_SYSTEM_MESSAGES.DOCUMENT_DOWNLOAD_FAIlURE_ERROR.CHARTS_DOCUMENT, () => {
            this.setState({ isChartsDocumentDownloadInProgress: false });
        });
    };

    // Handler for downloading dashboard ad hoc report from socket response + indicating download progress
    downloadAdHocReportFromSocketPayload = payload => {
        const downloadUrlData = {
            fileName: payload.generatedFileName,
            location: payload.location,
            bucket: payload.s3bucket
        };
        downloadFile(downloadUrlData, DASHBOARD_SYSTEM_MESSAGES.DOCUMENT_DOWNLOAD_FAIlURE_ERROR.ADHOC_REPORT, () => {
            this.setState({ isAdHocReportDownloadInProgress: false });
        });
    };

    UNSAFE_componentWillReceiveProps(np, nc) {
        const {
            chartList,
            loading,
            gettingDatesProgress,
            dateList,
            schemeId,
            isChartsDocumentGenerationRequestInProgress,
            isAdHocReportGenerationRequestInProgress
        } = this.state;

        const convertedDateList = [];

        if (np.dateList != null && JSON.stringify(np.dateList) !== JSON.stringify(dateList)) {
            np.dateList.map(item => {
                let date = new Date(
                    0,
                    0,
                    _.get(item, '0000.LGIM_ValDates') - 1,
                    0,
                    -new Date(0).getTimezoneOffset(),
                    0
                );
                convertedDateList.push(date);
            });

            if (convertedDateList.length && convertedDateList[0] && convertedDateList[convertedDateList.length - 1]) {
                this.setState({
                    startDate: convertedDateList[0],
                    endDate: convertedDateList[convertedDateList.length - 1],
                    dateList: np.dateList,
                    callDoFetch: true
                });
            }
            this.setState({
                convertedDateList
            });
        }

        if (np.chartList != null && JSON.stringify(np.chartList) !== JSON.stringify(chartList)) {
            this.setState({ chartList: np.chartList, callDoFetch: true });
        }

        if (np.loading !== loading) {
            this.setState({ loading: np.loading });
        }

        if (np.gettingDatesProgress !== gettingDatesProgress) {
            this.setState({
                gettingDatesProgress: np.gettingDatesProgress
            });
        }

        if (np.schemeId !== schemeId) {
            this.setState({ schemeId: np.schemeId, callDoFetch: true });
        }

        // New prop that indicates dashboard charts document generation request in-progress status
        if (np.isChartsDocumentGenerationRequestInProgress !== isChartsDocumentGenerationRequestInProgress) {
            this.setState({
                isChartsDocumentGenerationRequestInProgress: np.isChartsDocumentGenerationRequestInProgress
            });
        }

        // New prop that indicates dashboard ad hoc report generation request in-progress status
        if (np.isAdHocReportGenerationRequestInProgress !== isAdHocReportGenerationRequestInProgress) {
            this.setState({
                isAdHocReportGenerationRequestInProgress: np.isAdHocReportGenerationRequestInProgress
            });
        }
    }

    componentWillUnmount() {
        const {
            schemeId,
            loggedUser: { userId }
        } = this.props;
        this.props.clearCharts();
        AwsIotSingleton.unsubscribeSocket(`/notification/${schemeId}/dashboard`);
        AwsIotSingleton.unsubscribeSocket(`/report/charts_document/${schemeId}/${userId}`);
        AwsIotSingleton.unsubscribeSocket(`/report/adhoc_report/${schemeId}/${userId}`);
    }

    checkConnectingDevice = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            numberOfChartsPerPage = 1;
        }
    };

    // method to execute step function
    executeStepfunction() {
        const { schemeId, executeStepfunctionRequest, getScheme_data } = this.props;
        const stepFunctionPayload = {
            schemeId: schemeId,
            step: STEP_NAME,
            functionName: DASHBOARD_STEP_FUNCTION_NAME,
            description: STEP_FUNCTION_DESCRIPTION,
            tenant: 'LGIM',
            startDate: moment(this.state.startDate).format('YYYYMMDD'),
            endDate: moment(this.state.endDate).format('YYYYMMDD'),
            activationDate: moment(getScheme_data.inceptionDate).format('YYYYMMDD')
        };
        executeStepfunctionRequest(stepFunctionPayload);
    }

    handleChangeStart = date => {
        const { endDate } = this.state;

        if (new Date(endDate).getTime() >= new Date(date).getTime()) {
            this.setState({ startDate: date, callDoFetch: true }, () => {
                this.executeStepfunction();
            });
        } else {
            NotificationHelper.getInstance().error(INVALIDE_DATE);
        }
    };

    handleChangeEnd = date => {
        const { startDate } = this.state;

        if (new Date(date).getTime() >= new Date(startDate).getTime()) {
            this.setState({ endDate: date, callDoFetch: true }, () => {
                this.executeStepfunction();
            });
        } else {
            NotificationHelper.getInstance().error(INVALIDE_DATE);
        }
    };

    doFetch = async (templateName, params, success, failure) => {
        let { getScheme_data, active_code } = this.props;

        const { callDoFetch, startDate, endDate, drawableChartTemplateNames } = this.state;

        let ndata = null;

        if (doFetchExecutedCount === 16 && callDoFetch) doFetchExecutedCount = 1;

        if (callDoFetch && doFetchExecutedCount !== 16 && inprogressCount <= 16) {
            doFetchExecutedCount += 1;
            try {
                inprogressCount += 1;
                const { data: result = {} } = await api.getChartData({
                    name: templateName,
                    tenant: 'LGIM',
                    scheme: active_code? active_code : getScheme_data.scheme,
                    schemeId: getScheme_data.schemeId,
                    title: params.title,
                    startDate: moment(startDate).format('YYYYMMDD'),
                    endDate: moment(endDate).format('YYYYMMDD')
                });

                console.log('scheme  data  :  ',  getScheme_data.schemeId)
                const { data: userChartList = {} } = await api.getChartListByScheme({
                    schemeId: getScheme_data.schemeId
                });
                console.log('user chat liiit  : ', userChartList);

                if (result && result.content ) {
                    inprogressCount -= 1;
                    const datam = result.content;
                    ndata = datam;

                    let message = DEFAULT_NO_DATA_MESSAGE;
                    if (datam.name === 'performance') {
                        message = PERFORMANCE_NO_DATA_MESSAFE;
                    }

                    const nullCheckKeyOBJ = userChartList.content.find(item => item.templateName === datam.name);

                    const checkArray = nullCheckKeyOBJ.nullCheck;
                    checkArray.map(item => {
                        if (datam[item] && datam[item].find(a => a.isEmpty === true)) {
                            ndata = {
                                ...datam,
                                noData: {
                                    message,
                                    color: '#86898A',
                                    fontSize: 20
                                }
                            };
                        } else {
                            if (!drawableChartTemplateNames.includes(templateName)) {
                                drawableChartTemplateNames.push(templateName);
                            }
                        }
                    });

                    success(ndata);
                }
            } catch (error) {
                failure(error);
            }

            if (doFetchExecutedCount === 16 || inprogressCount > 16) this.setState({ callDoFetch: false });
        } else {
            this.setState({ callDoFetch: false });
        }
    };

    onValidationError = error => {
        // console.log(error);
    };

    changeVisibleSlide(slide) {
        // this.setState({ visibleSlide: slide });
    }

    // Send request to generate Dashboard Charts Document
    generateSchemeChartsDocument = () => {
        const { loggedUser, schemeName, schemeId, generateChartsDocumentRequest } = this.props;
        const { startDate, endDate, chartList, drawableChartTemplateNames } = this.state;
        const { userId } = loggedUser;

        let filteredChartList = [];
        chartList.map(chart => {
            if (drawableChartTemplateNames.includes(chart.templateName)) {
                filteredChartList.push(chart);
            }
        });

        let payload = {
            startDate: moment(startDate).format('YYYYMMDD'),
            endDate: moment(endDate).format('YYYYMMDD'),
            tenant: 'LGIM',
            flowKey: 'report',
            templateKey: 'charts',
            docName: `${schemeName.replace(/ /g, '_')}-${'Charts'.replace(/\s/g, '')}-${moment(startDate).format(
                'DDMMYYYYhmmssa'
            )}-${moment(endDate).format('DDMMYYYYhmmssa')}-${moment().format('DDMMYYYYhmmssa')}-${'G'}`,
            schemeId: schemeId,
            userId: userId,
            charts: filteredChartList
        };

        // Handles indicating charts document download progress
        generateChartsDocumentRequest(payload, () => {
            this.setState({ isChartsDocumentDownloadInProgress: true });
        });
    };

    // Send request to generate Dashboard Ad Hoc Report
    generateSchemeAdHocReport = () => {
        const { loggedUser, schemeName, schemeId, generateAdHocReportRequest } = this.props;
        const { startDate, endDate } = this.state;
        const { userId } = loggedUser;

        const payload = {
            userId: userId,
            startDate: moment(startDate).format('MM/DD/YYYY'),
            docName: `${schemeName.replace(/ /g, '_')}-${'Adhoc'.replace(/\s/g, '')}-${moment(startDate).format(
                'DDMMYYYYhmmssa'
            )}-${moment(endDate).format('DDMMYYYYhmmssa')}-${moment().format('DDMMYYYYhmmssa')}-${'G'}`,
            schemeId: schemeId,
            reportId: uuid(),
            endDate: moment(endDate).format('MM/DD/YYYY'),
            reportType: 'Ad hoc',
            permisson: 'viewOnly'
        };

        // Handles indicating ad hoc report download progress
        generateAdHocReportRequest(payload, () => {
            this.setState({ isAdHocReportDownloadInProgress: true });
        });
    };

    render() {
        const {
            chartList,
            loading,
            gettingDatesProgress,
            schemeId,
            callDoFetch,
            isChartsDocumentGenerationRequestInProgress,
            isAdHocReportGenerationRequestInProgress,
            isChartsDocumentDownloadInProgress,
            isAdHocReportDownloadInProgress
        } = this.state;

        let sliderRef;
        const removeShowFalse = chartList.filter(item => item.show === true);
        let chunkedChartList = _.chunk(removeShowFalse, numberOfChartsPerPage);

        const settings = {
            accessibility: false,
            dots: true,
            dotsClass: 'slick-dots slick-thumb',
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        const handleDashboardNav = action => {
            if (action === 'next') {
                // if (visibleSlide !== 3) this.changeVisibleSlide(visibleSlide + 1);
                sliderRef.slickNext();
            } else {
                // if (visibleSlide !== 0) this.changeVisibleSlide(visibleSlide - 1);
                sliderRef.slickPrev();
            }
        };

        if (loading || gettingDatesProgress) {
            return <Loading />;
        } else {
            return (
                <>
                    <section className="active-dashboard-section">
                        {isChartsDocumentGenerationRequestInProgress || isAdHocReportGenerationRequestInProgress ? (
                            <CustomLoader timeDuration={25} />
                        ) : null}
                        <div className="header-section">
                            <div className="filter-input">
                                <div className="flex-wrapper">
                                    <span class="range-picker-container">
                                        <label>Valuation Date</label>
                                        <DatePicker
                                            selected={this.state.endDate}
                                            isClearable={false}
                                            onChange={this.handleChangeEnd}
                                            maxDate={
                                                this.state.convertedDateList[this.state.convertedDateList.length - 1]
                                            }
                                            includeDates={this.state.convertedDateList}
                                            placeholderText="End date"
                                            className="daterange-picker"
                                            dateFormat="dd/MM/yyyy"
                                            allowClear={false}
                                            disabled={
                                                isChartsDocumentGenerationRequestInProgress ||
                                                isAdHocReportGenerationRequestInProgress ||
                                                isChartsDocumentDownloadInProgress ||
                                                isAdHocReportDownloadInProgress
                                            }
                                        />
                                    </span>
                                    <span class="range-picker-container">
                                        <label>Show history from</label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeStart}
                                            includeDates={this.state.convertedDateList}
                                            isClearable={false}
                                            minDate={this.state.convertedDateList[0]}
                                            placeholderText="Start date"
                                            className="daterange-picker"
                                            dateFormat="dd/MM/yyyy"
                                            disabled={
                                                isChartsDocumentGenerationRequestInProgress ||
                                                isAdHocReportGenerationRequestInProgress ||
                                                isChartsDocumentDownloadInProgress ||
                                                isAdHocReportDownloadInProgress
                                            }
                                        />
                                    </span>
                                </div>
                                <div className="flex-wrapper">
                                    <div className="btn-wrapper">
                                        <span
                                            onClick={
                                                !isChartsDocumentGenerationRequestInProgress &&
                                                !isChartsDocumentDownloadInProgress
                                                    ? this.generateSchemeChartsDocument
                                                    : undefined
                                            }
                                        >
                                            <GenerateDownloader
                                                name="Download Charts"
                                                inProgress={
                                                    isChartsDocumentGenerationRequestInProgress ||
                                                    isChartsDocumentDownloadInProgress
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="btn-wrapper">
                                        <span
                                            onClick={
                                                !isAdHocReportGenerationRequestInProgress &&
                                                !isAdHocReportDownloadInProgress
                                                    ? this.generateSchemeAdHocReport
                                                    : undefined
                                            }
                                        >
                                            <GenerateDownloader
                                                name="Download Report"
                                                inProgress={
                                                    isAdHocReportGenerationRequestInProgress ||
                                                    isAdHocReportDownloadInProgress
                                                }
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="btn-rearrange">
                                <span className="arrange-icon">
                                    <i className="fa fa-clone" />
                                </span>
                                <span
                                    onClick={() => {
                                        if (
                                            isChartsDocumentGenerationRequestInProgress ||
                                            isAdHocReportGenerationRequestInProgress ||
                                            isChartsDocumentDownloadInProgress ||
                                            isAdHocReportDownloadInProgress
                                        ) {
                                            return;
                                        } else {
                                            return history.push(`/scheme/options/dashboard/rearrange/${schemeId}`);
                                        }
                                    }}
                                >
                                    Rearrange
                                </span>
                            </span>
                        </div>
                        <Row gutter={30}>
                            <Slider ref={slider => (sliderRef = slider)} {...settings}>
                                {chunkedChartList &&
                                    chunkedChartList.length &&
                                    chunkedChartList.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item.map((chart, chartIndex) => {
                                                    return (
                                                        <Col key={`${index}-${chartIndex}`} lg={12} md={12} xs={24}>
                                                            <div className="card dashboard-card custom-dashboard-wrap">
                                                                <div className="graph-container-wrap">
                                                                    {ChartComponents[chart.type] &&
                                                                        ChartComponents[chart.type]({
                                                                            doFetch: this.doFetch,
                                                                            onValidationError: this.onValidationError,
                                                                            title: chart.title,
                                                                            chartType: chart.type,
                                                                            callDoFetch: callDoFetch
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </Row>
                    </section>
                    <div className="slider-arrows">
                        {/* {visibleSlide !== 0 ? ( */}
                        <span className="arrow left-arrow" onClick={() => handleDashboardNav('prev')}>
                            <img alt="previous" src={nextArrow} />
                        </span>
                        {/* ) : null} */}
                        {/* {visibleSlide !== 3 ? ( */}
                        <span className="arrow right-arrow" onClick={() => handleDashboardNav('next')}>
                            <img alt="next" src={prevArrow} />
                        </span>
                        {/* ) : null} */}
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        chartList: getVisibleChartList(state.dashboardRearrangeReducer),
        loading: state.dashboardRearrangeReducer.loading,
        charts: state.dashboardReducer.charts,
        dateList: state.chartDatesReducer.chartDateList,
        gettingDatesProgress: state.chartDatesReducer.isLoading,

        // State to prop that indicates dashboard charts document generation request in-progress status
        isChartsDocumentGenerationRequestInProgress:
            state.dashboardDocumentsGenerationReducer.isChartsDocumentGenerationRequestInProgress,

        // State to prop that indicates dashboard ad hoc document generation request in-progress status
        isAdHocReportGenerationRequestInProgress:
            state.dashboardDocumentsGenerationReducer.isAdHocReportGenerationRequestInProgress
    };
};

export default connect(
    mapStateToProps,
    {
        getChartList,
        getChartsByPage,
        clearCharts,
        getChartDateList,
        executeStepfunctionRequest,
        generateChartsDocumentRequest,
        generateAdHocReportRequest
    }
)(Dashboard);
