import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

import { AnalyticsData } from '@excubed/process-data-gui';

import api from '../../../middlewares/connectApi';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { stateMachinesList } from './constants';
import { OutputFilesForm } from '../../workflows/components';
import Loading from '../../../components/Loading';

const ValuationStatus = props => {
  const { loggedUser, schemes } = props;

  const [policyNumbers, setPolicyNumbers] = useState({}); // Manages policy numbers list in state
  const [outputFiles_data, setOutputFiles_data] = useState([]);
  const [showOutputFiles, setShowOutputFiles] = useState(false);
  const [loadingOutputFiles, setLoadingOutputFiles] = useState(false);
  const [analyticalFilesReqBody, setAnalyticalFilesReqBody] = useState({});
  const [jobName, setJobName] = useState('');

  useEffect(() => {
    preparePolicyNumbersList();
  }, [loggedUser, schemes]);

  // Handler for preparing policy numbers list
  const preparePolicyNumbersList = () => {
    if (schemes && schemes.activeSchemes && schemes.activeSchemes.length > 0) {
      let schemeActivationCodes = {};
      schemes.activeSchemes.map(scheme => {
        if (scheme.activationCode && scheme.executeLiability && scheme.executeLiability === 'Y') {
          schemeActivationCodes[scheme.activationCode] = { policy_number: scheme.activationCode };
        }
      });
      setPolicyNumbers({ pensionScheme: Object.values(schemeActivationCodes) });
    }
  };

  // Handler for trigger modules
  const handleTriggerModules = (fileId, reqBody, success, failure) => {
    api
      .executeStepfunctionSet(reqBody)
      .then(res => {
        success(fileId, res);
      })
      .catch(error => {
        failure(fileId, error);
      });
  };

  const getListExecutions = (reqBody, success, failure) => {
    let existExecutionsList = [];

    if (reqBody.existExecutionsList) {
      existExecutionsList = reqBody.existExecutionsList;
      delete reqBody.existExecutionsList;
    }

    api
      .getListExecutions(reqBody)
      .then(res => {
        res.data.content.executionArray = existExecutionsList
          ? existExecutionsList.concat(res.data.content.executionArray)
          : res.data.content;

        //Change 'Triggered From' name in dashboard, when workflow is 'adhocAsset'.
        if (res.data.content.executionArray) {
          res.data.content.executionArray.forEach(execution => {
            if (execution.workFlow && execution.workFlow === 'adhocAsset') {
              execution.workFlow = 'valuation';
            }
          });
        }

        success(res.data.content);
      })
      .catch(error => {
        failure(error);
      });
  };

  const getAnalyticalFiles = reqBody => {
    setJobName(reqBody && reqBody.jobName ? reqBody.jobName : '');
    setAnalyticalFilesReqBody(reqBody);
    setShowOutputFiles(true);
    setLoadingOutputFiles(true);
    api
      .getAnalyticalFiles(reqBody)
      .then(res => {
        setLoadingOutputFiles(false);
        setOutputFiles_data(res.data.content);
      })
      .catch(error => {
        setLoadingOutputFiles(false);
        console.log(error);
        NotificationHelper.getInstance().error('Error in get analytical files.');
      });
  };

  // Handler for common system message pop up
  const handleCommonSystemMessagePopUp = (success, title, message) => {
    // TODO :: title is not yet utilized
    if (success === true) {
      NotificationHelper.getInstance().success(message);
    } else {
      NotificationHelper.getInstance().error(message);
    }
  };

  const onClickRefresh = () => {
    setLoadingOutputFiles(true);
    api
      .getAnalyticalFiles(analyticalFilesReqBody)
      .then(res => {
        setLoadingOutputFiles(false);
        setOutputFiles_data(res.data.content);
      })
      .catch(error => {
        setLoadingOutputFiles(false);
        console.log(error);
        NotificationHelper.getInstance().error('Error in get analytical files.');
      });
  };

  return (
    <>
      <section className="proposal-information-section">
        <div className="root-form-wrapper-information">
          <div className="card card-wrapper">
            <AnalyticsData
              user={loggedUser && loggedUser.name ? loggedUser.name : 'N/A'}
              tenant="LGIM"
              fontFamily="sans-serif"
              width={1170}
              backgroundColor="#fafafa"
              schemeList={policyNumbers}
              notificationPopUp={handleCommonSystemMessagePopUp}
              stateMachinesList={stateMachinesList}
              getListExecutions={getListExecutions}
              getAnalyticalFiles={getAnalyticalFiles}
              executeStepFuncSet={handleTriggerModules}
            />
            {showOutputFiles ? (
              <Modal
                title={jobName}
                visible={true}
                width={900}
                onCancel={() => setShowOutputFiles(false)}
                footer={null}
              >
                {loadingOutputFiles ? (
                  <div style={{ textAlign: 'center' }}>
                    <Loading />
                  </div>
                ) : (
                  <OutputFilesForm
                    schemeId={undefined}
                    completed={true}
                      funcOnClickRefresh={onClickRefresh}
                    fileData={outputFiles_data}
                    userType="lgim"
                  />
                )}
              </Modal>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default ValuationStatus;
