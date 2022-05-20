import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import BaseReportTypeContainer from '../../components/BaseReportType';
import BaseTableComponent from '../../../reportTable/BaseTableComponent';
import { tableColumns } from '../../../reportTable/columns';
import PublishedReuploadModal from '../../../components/modals/PublishedReuploadModal';

import {
    generateReportValidation_inProgress,
    generateReportValidationSuccess,
    generateReportValidationError,
    getUploadReportSchemes,
    getUploadReportSchemes_inProgress,
    getUploadSchemes_error, getUploadUrl,
    getGenerateReportSchemes_inProgress,
    getGenerateReportSchemes,
    getGenerateSchemes_error
} from '../../selectors';
import {  generateReportReset, generateReportValidation, getGenerateReportSchemesData, getUploadReportSchemesData, getUploadReportUrl } from '../../action';
import { GenerationStatus, getReportStatusMsg, handleReportName, OUT_TIME_FORMAT, renameUploadReport, ReportStatus, ReportTypes, SORTING_TIME_FORMAT, TIME_FORMAT } from '../../../utility';

import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { TABS } from '../../../constants/adminReportViewConstant';
const { GENERATE_REPORTS } = TABS;

const GenerateReportContainer = props => {
    const {
        report_types = {},
        getReportType_inProgress,
        urlParams,
        getStepReportData,
        tabId,
        getGenerateSchemesData,
        generateReportSchemes_inProgress,
        generateDocument_inProgress,
        generateReportSchemes,
        generateReportSchemes_error,
        updateStepAction,
        proceedSelectedReports,
        validateReport_inProgress,
        validateReport,
        generateReportValidationSuccess,
        generateReportSuccess = {},
        generateReportError,
        socketData = {},
        generateReport_inProgress,
        setSocketData,
        session
    } = props;
    const { reportName } = urlParams;

    const [reportTypes, setReportTypes] = useState(null);
    const [reportType, setReportType] = useState(null);
    const [generateDataSource, setGenerateDataSource] = useState([]);

    const [selectedQuarterValue, setSelectedQuarterValue] = useState(null);
    const [selectedYearValue, setSelectedYearValue] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selectedAdHocReport, setSelectedAdHocReport] = useState(null);
    const [dateList, setDateList] = useState(null);
    const [adHocSelectedDate, setAdHocSelectedDate] = useState(null);
    const [selectedAdHocReportKey, setSelectedAdHocReportKey] = useState(null);
    const [selectedQuarterlyReportsKeys, setselectedQuarterlyReportsKeys] = useState(null);
    const [selectedQuarterlyReports, setselectedQuarterlyReports] = useState(null);

    const [publishedReuploadModalVisible,setPublishedReuploadModalVisible]=useState(false)
    const [publishedSchemes,setPublishedSchemes]=useState([])
  
    const dispatch = useDispatch();

    useEffect(() => {
        if(!reportType){
            setGenerateDataSource([]);
            setPublishedReuploadModalVisible(false);
        }

        if (reportType && reportName === tabId) {
            proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY]);
            if (reportType && reportType !== ReportTypes.ADHOC && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, startDate, endDate, tabId });
                setselectedQuarterlyReportsKeys(null);
            } else if (reportType && reportType === ReportTypes.ADHOC && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, tabId });
            }
        }
    }, [reportName]);

    useEffect(() => {
        if (generateReportSuccess && reportType && reportName === tabId) {

            if (reportType === ReportTypes.QUARTER && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, startDate, endDate, tabId });
                setselectedQuarterlyReportsKeys([]);
            } else if (reportType === ReportTypes.ADHOC && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, tabId });
            }
            dispatch(generateReportReset());
        }
    }, [generateReportSuccess]);

    useEffect(()=>{
        if(generateReportError){
            if (reportType === ReportTypes.ADHOC) {
                setSelectedAdHocReport(null);
                setSelectedAdHocReportKey(null);
                proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY]);
            } else if (reportType === ReportTypes.QUARTER) {
                setselectedQuarterlyReportsKeys([])
            }
        }
    },[generateReportError])

    useEffect(() => {

        if (
            reportName === tabId &&
            reportType &&
            !generateReportSuccess &&
            !generateReportSchemes_inProgress &&
            socketData &&
            socketData.payload &&
            GENERATE_REPORTS.TAB_KEY === socketData.payload.tabId &&
            (socketData.payload.socketAction === 'reportGenerate' || (socketData.payload.socketAction === 'generate-pending' && socketData.payload.sessionId !== session)) &&
            reportType === socketData.payload.socketReportType
        ) {
            getGenerateSchemesData({ reportType, startDate, endDate, tabId });
            setselectedQuarterlyReportsKeys([]);

        }

    }, [JSON.stringify(socketData)])

    useEffect(() => {
        if (report_types && report_types.Generate && report_types.Generate.reports) {
            setReportTypes(report_types.Generate.reports);
        }
    }, [report_types.Generate]);


    useEffect(() => {
        if ( reportName === tabId) {

            if(!reportType){
                setGenerateDataSource([]);
            } else if (reportType && startDate && endDate && reportType !== ReportTypes.ADHOC && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, startDate, endDate, tabId });
                setselectedQuarterlyReportsKeys([]);
            } else if (reportType && reportType === ReportTypes.ADHOC && !generateReportSchemes_inProgress) {
                getGenerateSchemesData({ reportType, tabId });
            }
        }

    }, [reportType, startDate, endDate]);


    useEffect(()=>{
        if (reportName === tabId) {

            if(generateReportSchemes_inProgress){
                if (reportType === ReportTypes.ADHOC) {
                    setAdHocSelectedDate(null)
                    setDateList(null)
                    setSelectedAdHocReport(null)
                } else if (reportType === ReportTypes.QUARTER) {
                    setselectedQuarterlyReportsKeys(null)
                    setselectedQuarterlyReports(null)
                }
            }

            if (generateReportSchemes && reportType) {

                    let schemesDataSource = [];
                    
                    schemesDataSource = generateReportSchemes
                      .sort((schm1, schm2) => {
                        let prev = schm1.updatedAt
                        ? moment(schm1.updatedAt, SORTING_TIME_FORMAT)
                        : moment(schm1.createdAt, SORTING_TIME_FORMAT),
                      next = schm2.updatedAt
                        ? moment(schm2.updatedAt, SORTING_TIME_FORMAT)
                        : moment(schm2.createdAt, SORTING_TIME_FORMAT);
                    return next.diff(prev);
                      })
                      .map(scheme => {
                          return {
                              key: scheme.reportId
                                ? scheme.reportId
                                : scheme.schemeId
                                  ? scheme.schemeId
                                  : scheme.entityId,
                              ReportId: scheme.reportId,
                              reportId: scheme.reportId,
                              schemeId: scheme.schemeId ? scheme.schemeId : scheme.entityId,
                              schemeName: scheme.schemeName,
                              inceptionDate: scheme.inceptionDate,
                              classification: scheme.schemeClassification,
                              classificationDisplayName:scheme.classificationDisplayName,
                              reportStatus: scheme.reportStatus,
                              generationStatus:scheme.generateStatus,
                              startDate: scheme.startDate,
                              endDate: scheme.endDate,
                              url: scheme.reportUpload && scheme.reportUpload.url,
                              tab: tabId,
                              ReportType: scheme.reportType ? scheme.reportType : reportType,
                              reportSource: scheme.reportSource,
                              updatedAt: scheme.updatedAt,
                          };
                      }).filter(scheme=>(scheme.reportType && scheme.reportType ===reportType) || !scheme.reportType);


                schemesDataSource.length ? setGenerateDataSource([...schemesDataSource]) : setGenerateDataSource([]);

            }else{
                setGenerateDataSource([]);
            }
        }

    }, [generateReportSchemes, generateReportSchemes_inProgress])

    useEffect(() => {
        if (selectedAdHocReport && selectedAdHocReport.schemeId ) {
            if (selectedAdHocReport.startDate && selectedAdHocReport.endDate) {
                setAdHocSelectedDate([
                    moment(selectedAdHocReport.startDate, TIME_FORMAT),
                    moment(selectedAdHocReport.endDate, TIME_FORMAT)
                ]);
                setDateList(null);
            } else if (!selectedAdHocReport.startDate && !selectedAdHocReport.endDate && selectedAdHocReport.reportStatus === ReportStatus.UN_INITIATED) {
                const data={
                    tabId: tabId,
                    startDate:null,
                    endDate:null,
                    reportType:selectedAdHocReport.ReportType,
                    schemeData:[{
                        schemeId:selectedAdHocReport.schemeId
                    }]
                }
                validateReport({
                    data
                });
            }

        }
    }, [selectedAdHocReport]);

    useEffect(()=>{
        if (adHocSelectedDate && adHocSelectedDate.length && selectedAdHocReportKey && selectedAdHocReportKey.length && selectedAdHocReport) {

            selectedAdHocReport.startDate=moment(adHocSelectedDate[0], OUT_TIME_FORMAT).format(TIME_FORMAT)
            selectedAdHocReport.endDate=moment(adHocSelectedDate[1], OUT_TIME_FORMAT).format(TIME_FORMAT)
            selectedAdHocReport.docName=renameUploadReport(selectedAdHocReport,{},true).trim().replace(/ /g, '__')

            const data={
                tabId: tabId,
                startDate:selectedAdHocReport.startDate,
                endDate:selectedAdHocReport.endDate,
                reportType:selectedAdHocReport.ReportType,
                schemeData:[{
                    schemeId:selectedAdHocReport.schemeId
                }]
            }
            validateReport({
                data
            });
        }else{
            proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])
        }

    }, [adHocSelectedDate, selectedAdHocReportKey])

    useEffect(()=>{
        if (selectedQuarterlyReportsKeys && selectedQuarterlyReportsKeys.length === 0 && reportType === ReportTypes.QUARTER) {
            proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])
        }
    },[selectedQuarterlyReportsKeys])



    useEffect(() => {
        if (urlParams && urlParams.reportName === tabId) {
            
            if (reportType && generateReportValidationSuccess && !generateReportValidationSuccess.isContinue) {

                if (generateReportValidationSuccess &&(!generateReportValidationSuccess.getDateList||generateReportValidationSuccess.getDateList&&generateReportValidationSuccess.getDateList.length===0)&& !generateReportValidationSuccess.reportPublished&&generateReportValidationSuccess.reportPendingStatus) {
                    if(generateReportValidationSuccess.reportPendingStatus.length>0){
                        const GenerationStatus=[ReportStatus.SELECT_FOR_APPROVAL,ReportStatus.PENDING_PUBLISH,ReportStatus.PENDING_APPROVAL,ReportStatus.UPLOADED]
                        const msgs=generateReportValidationSuccess.reportPendingStatus.filter(status=>{
                            return  GenerationStatus.includes(status)
                        })
                     
                        if(msgs.length===1){
                            NotificationHelper.getInstance().error(getReportStatusMsg(msgs[0]));

                           
                        }else{
                            NotificationHelper.getInstance().error(getReportStatusMsg('Report processed already.'));

                        }

                        if(reportType===ReportTypes.ADHOC){
                            setAdHocSelectedDate(null)
                        }

                        if(reportType===ReportTypes.QUARTER){
                            if(generateReportValidationSuccess.pendingSchemes&&generateReportValidationSuccess.pendingSchemes.length){
                                let keys=[]
                                if(selectedQuarterlyReportsKeys && selectedQuarterlyReportsKeys.length){
                                    keys=selectedQuarterlyReportsKeys.filter(key=>{
                                        return !generateReportValidationSuccess.pendingSchemes.find(rp=>{
                                            return rp.schemeId===key
                                        })
                                    })
                                }
                
                                
                                setselectedQuarterlyReportsKeys([...keys])
                            
                                quarterlyGenerateReports(keys)
                            }
                          }

                       
                    }

                    if(generateReportValidationSuccess.publishedSchemes&&generateReportValidationSuccess.publishedSchemes.length){
                       const havePublished= _.get(generateReportValidationSuccess,'publishedSchemes',[]).filter(rp=>{
                         return   !_.get(generateReportValidationSuccess,'pendingSchemes',[]).find(sch=>{
                               return sch.schemeId===rp.schemeId
                           })
                       })
                       if(havePublished&&havePublished.length){
                        setPublishedReuploadModalVisible(true)
                        setPublishedSchemes([...generateReportValidationSuccess.publishedSchemes])
                       }
                       
                    }
                  
                }

                if(generateReportValidationSuccess&&generateReportValidationSuccess.getDateList&&reportType===ReportTypes.ADHOC &&!generateReportValidationSuccess.pendingSchemes){
                    setDateList(generateReportValidationSuccess.getDateList);
                }else{
                    if(!generateReportValidationSuccess.getDateList||reportType!==ReportTypes.ADHOC) setDateList(null)
                    };
                

            } else if (reportType && generateReportValidationSuccess && generateReportValidationSuccess.isContinue) {

                if(generateReportValidationSuccess.reportPublished){
                    setPublishedReuploadModalVisible(true)
                    if (generateReportValidationSuccess.publishedSchemes && generateReportValidationSuccess.publishedSchemes.length) {
                        setPublishedSchemes([...generateReportValidationSuccess.publishedSchemes])
                    }
                } else {
                    setPublishedSchemes([])
                    if (reportType === ReportTypes.QUARTER) {
                        quarterlyGenerateReports(selectedQuarterlyReportsKeys)
                    } else if (reportType === ReportTypes.ADHOC) {
                        adHocGenerateReports()
                    }
                }

            } else if (generateReportValidationSuccess && (!generateReportValidationSuccess.publishedSchemes || !generateReportValidationSuccess.publishedSchemes.length)) {
                setPublishedReuploadModalVisible(false)
            }

        }
    }, [generateReportValidationSuccess]);

    const adHocGenerateReports=()=>{
        if(selectedAdHocReport){
            selectedAdHocReport.startDate=moment(adHocSelectedDate[0], OUT_TIME_FORMAT).format(TIME_FORMAT)
            selectedAdHocReport.endDate= moment(adHocSelectedDate[1]  ,  OUT_TIME_FORMAT).format(TIME_FORMAT)
            const data = [];
            data.push(selectedAdHocReport);
            if (data && data.length) {
                proceedSelectedReports(data, [GENERATE_REPORTS.TAB_KEY]);
            }
        }
    }

    const quarterlyGenerateReports=(keys)=>{
        if (keys && keys.length && generateDataSource && generateDataSource.length) {

            let reports = []
            generateDataSource.map(scheme => {
                keys.map(rp => {
                    if (rp === scheme.schemeId) {
                            scheme.startDate=startDate
                            scheme.endDate=endDate
                            scheme.docName=renameUploadReport(scheme,{startDate,endDate},true)
                            reports.push(scheme)
                        }
                    })
                })

                if(reports.length>0){
                    proceedSelectedReports(reports, [GENERATE_REPORTS.TAB_KEY])

                }else{
                    proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])

                }
        }
    }

    const generateColumns = [
        { ...tableColumns.schemeNameColumn() },
        {
            ...tableColumns.classificationColumn()
        },
        {
            ...tableColumns.generationStatusColumn()
        }
    ];

    const handleReportTypeSelect = name => {
        setAdHocSelectedDate(null)
        setSelectedAdHocReport(null)
        setSelectedAdHocReportKey(null)
        setselectedQuarterlyReports(null)
        setStartDate(null);
        setEndDate(null);
        setselectedQuarterlyReportsKeys(null)
        proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])
        setSocketData(null)
        setReportType(name);
    };


    const handlePublishedReuploadProceed = () => {
        setPublishedReuploadModalVisible(false)
        if (reportType === ReportTypes.QUARTER) {
            quarterlyGenerateReports(selectedQuarterlyReportsKeys)
        } else if (reportType === ReportTypes.ADHOC) {
            adHocGenerateReports()
        }

    }

    const onClosePublishModal = () => {
        setPublishedReuploadModalVisible(false);
        if(reportType===ReportTypes.QUARTER){
            if(publishedSchemes.length){

                let keys=[]
                if(selectedQuarterlyReportsKeys && selectedQuarterlyReportsKeys.length){
                    keys=selectedQuarterlyReportsKeys.filter(key=>{
                        return !publishedSchemes.find(rp=>{
                            return rp.schemeId===key
                        })
                    })
                }

                
                setselectedQuarterlyReportsKeys([...keys])
                quarterlyGenerateReports(keys)
            }

         
     
        } else if (reportType === ReportTypes.ADHOC) {
            setSelectedAdHocReportKey(null)
            setSelectedAdHocReport(null)
            setAdHocSelectedDate(null)

        }


    }

    const quarterRowHandler = {
        onSelect:(record, selected, selectedRows, nativeEvent)=>{
            if (selectedRows && selectedRows.length > 0) {
                let data
                const schemeIds=selectedRows.map(rp=>({schemeId:rp.schemeId}))
                if(!selected){
                    
                    data ={
                         tabId:tabId,
                         reportType: reportType,
                         startDate: startDate,
                         endDate: endDate,
                         schemeData: [
                             ...schemeIds
                         ]
                     }
                } else if (selected) {
                    data ={
                        tabId:tabId,
                        reportType: reportType,
                        startDate: startDate,
                        endDate: endDate,
                        schemeData: [
                            ...schemeIds
                        ],
                        newlySelectedSchemeData:{
                            schemeId:record.key
                        }
                    }
                }

                if (data) {
                    proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])
                    validateReport({ data })
                }
               

            } else {
                proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY]);
                setselectedQuarterlyReportsKeys([]);
        }
        },
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedQuarterlyReportsKeys([...selectedRowKeys]);


      


    
        },
        getCheckboxProps: record => ({
            disabled:
              record.reportStatus === GenerationStatus.GENERATION_INPROGRESS ||
              record.reportStatus === GenerationStatus.GENERATION_PENDING
        }),
        onSelectAll: (selectedAll, selectedRecords) => {
            if (selectedAll && selectedRecords && selectedRecords.length > 0) {

                    const schemeIds=selectedRecords.map(rp=>({schemeId:rp.schemeId}))
                    const data={
                        tabId:tabId,
                        reportType: reportType,
                        startDate: startDate,
                        endDate: endDate,
                        schemeData: [
                            ...schemeIds
                        ],
                        selectAll:selectedAll
                    }
                proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY])
                    validateReport({data})

            }
        },
        selectedRowKeys:selectedQuarterlyReportsKeys,
        
    };


    const adhocRowHandler = {
        onChange: (selectedRowKeys, selectedRow) => {
          console.dir(document)
            if(!_.isEqual(selectedRowKeys,selectedAdHocReportKey)){
                setAdHocSelectedDate(null)
                setDateList(null)
            }


            if (selectedRowKeys) {
                setSelectedAdHocReportKey(selectedRowKeys);
            }
            if (selectedRow && selectedRow.length) {
                setSelectedAdHocReport(selectedRow[0]);
                setSelectedReport(selectedRow[0])
            } else {
                setSelectedAdHocReport(null);
                setSelectedAdHocReportKey(null);
                proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY]);
            }

        },
        getCheckboxProps: record => ({
            disabled:
              record.reportStatus === GenerationStatus.GENERATION_INPROGRESS ||
              record.reportStatus === GenerationStatus.GENERATION_PENDING
        }),
     
        
        selectedRowKeys: selectedAdHocReportKey,
        
    };

    return (
      <>
          <Spin spinning={getReportType_inProgress||generateReport_inProgress||generateReportSchemes_inProgress||validateReport_inProgress}>
              {reportTypes && reportTypes.length > 0 && (
                <BaseReportTypeContainer
                  reports={reportTypes}
                  handleReportTypeSelect={handleReportTypeSelect}
                  reportType={reportType}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  selectedQuarterValue={selectedQuarterValue}
                  selectedYearValue={selectedYearValue}
                  dateList={dateList}
                  adHocSelectedDate={adHocSelectedDate}
                  setAdHocSelectedDate={setAdHocSelectedDate}
                  selectedAdHocReport={selectedAdHocReport}
                />
              )}

              <BaseTableComponent
                className="custom-row table-row mt-15 border-table"
                tableKey={'generate'}
                columns={generateColumns}
                dataSource={generateDataSource}
                rowSelection={
                    reportType !== ReportTypes.ADHOC
                      ? {
                          type: 'checkbox',
                          ...quarterRowHandler
                      }
                      : {
                          type: 'radio',
                          ...adhocRowHandler
                      }
                }
              />

              <PublishedReuploadModal
                visible={publishedReuploadModalVisible}
                onClose={onClosePublishModal}
                onProceed={handlePublishedReuploadProceed}
                title="Generate"
                content="Selected document already published. Proceed to generate again."
              />
          </Spin>
      </>
    );
};



const mapStateToProps = createStructuredSelector({
    generateReportSchemes_inProgress: getGenerateReportSchemes_inProgress(),
    generateReportSchemes: getGenerateReportSchemes(),
    generateReportSchemes_error: getGenerateSchemes_error(),
    validateReport_inProgress:generateReportValidation_inProgress(),
    generateReportValidationSuccess:generateReportValidationSuccess(),
    generateReportvalidationError:generateReportValidationError()

});

const mapDispatchToProps = dispatch => ({
    getGenerateSchemesData: data => dispatch(getGenerateReportSchemesData(data)),
    validateReport:(data)=>dispatch(generateReportValidation(data))


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateReportContainer);