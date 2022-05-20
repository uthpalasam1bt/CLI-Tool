import config from 'appConfig';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import { FileDownloader } from '../../../../UILibrary/components/forms/fields';
import connectApi from '../../../../middlewares/connectApi';

import { getOutputFiles_request } from '../../actions/commonActions';

import { getOutputFiles_data, getOutputFiles_data_inProgress } from '../../selectors/commonActionDataSelector';

const { generateBucket } = config;

let OutputFilesForm = props => {
    const {
        schemeId,
        step,
        functionName = 'adhoc_docGen',
        workflow,
        getOutputFiles_data,
        getOutputFiles_request,
        fileData = null,
        funcOnClickRefresh = null
    } = props;
    const [xclDocuments, setXclDocuments] = useState([]);

    useEffect(() => {
        onClickRefresh({ disableFetchFromPropFunction: true });
    }, [0]);

    useEffect(() => {
        if (getOutputFiles_data && getOutputFiles_data.files && !fileData) setXclDocuments(getOutputFiles_data.files);
    }, [getOutputFiles_data]);

    useEffect(() => {
        if (fileData && fileData.files) setXclDocuments(fileData.files);
    }, [fileData]);

    const refreshData = event => {
        onClickRefresh();
    };

    const onClickRefresh = (event) => {

        if (funcOnClickRefresh) {
            if (!event || (event && !event.disableFetchFromPropFunction)) funcOnClickRefresh();
        } else {
            getOutputFiles_request({
                schemeId,
                step,
                functionName,
                workflow
            });
        }

    };
    const sortByDate = (a, b) => {
        return new Date(a.lastModified) - new Date(b.lastModified);
    };

    return (
        <form>
            <div className="form-body">
                <Row className="input-row">
                    <Col xl={3} lg={6} xs={6} className="pull-right">
                        <span className="btn btn-analytic-refresh-enabled btn-upload" onClick={refreshData}>
                            Refresh
                        </span>
                    </Col>
                </Row>
                <br />
                <Row className="input-row">
                    <Col xl={12} lg={12} xs={12} className="pull-left">
                        <label className="input-title">
                            <b>Analytical Modules</b>
                        </label>
                    </Col>
                    <Col xl={10} lg={12} xs={12} className="text-center">
                        <label className="input-title">
                            <b>Date Modified</b>
                        </label>
                    </Col>
                    <Col xl={2} lg={12} xs={12} className="pull-right">
                        <label className="input-title">
                            <b>Size (KB)</b>
                        </label>
                    </Col>
                </Row>
                {xclDocuments && xclDocuments.length
                    ? xclDocuments.sort(sortByDate).map((a, index) => (
                          <Row className="input-row" key={index}>
                              <Col xl={12} lg={12} xs={12} className="pull-left">
                                  <FileDownloader
                                      type="resourceXSL"
                                      bucketNameProp={generateBucket}
                                      url={a.url}
                                      api={connectApi}
                                  />
                              </Col>
                              <Col xl={10} lg={12} xs={12} className="text-center">
                                  <label className="input-title">
                                      {moment(new Date(a.lastModified)).format('DD/MM/YYYY')}
                                  </label>
                              </Col>
                              <Col xl={2} lg={12} xs={12} className="pull-right" style={{ textAlign: 'right' }}>
                                  <label className="input-title">
                                      {(a.size / 1024).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </label>
                              </Col>
                          </Row>
                      ))
                    : null}
            </div>
        </form>
    );
};

const mapStateToProps = state => ({
    getOutputFiles_data: getOutputFiles_data()(state),
    getOutputFiles_data_inProgress: getOutputFiles_data_inProgress()(state)
});

const mapDispatchToProps = dispatch => ({
    getOutputFiles_request: payload => {
        dispatch(getOutputFiles_request(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputFilesForm);
