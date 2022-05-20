import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';

import { FileUploader } from '@excubed/analytics-gui';

import api from '../../../middlewares/connectApi';
import NotificationHelper from '../../../helpers/NotificationHelper';
import AwsIotSingleton from '../../../helpers/awsIot';
import { FILE_MANAGEMENT } from '../../../config/constants';

const { TENANT } = FILE_MANAGEMENT;
// NOTE :: To change default tenant, go to src/config/constants and refer instructions

// NOTE :: Following is the implementation of File Management tab in Home (Renamed to File Management)
const AnalyticsManagement = props => {
    const { loggedUser, schemes } = props;

    const [policyNumbers, setPolicyNumbers] = useState({}); // Manages policy numbers list in state
    const [socketPayload, setSocketPayload] = useState(null); // Manages socket payload in state

    useEffect(() => {
        preparePolicyNumbersList();

        // Init socket supscription
        const topic = `/fileUploader/status/${TENANT}`;
        AwsIotSingleton.getPayloadFromSocket(topic, data => setSocketPayload(data.payload));
    }, [loggedUser, preparePolicyNumbersList, schemes]);

    useEffect(() => {
        return () => {
            // Init socket Unsupscription
            const topic = `/fileUploader/status/${TENANT}`;
            AwsIotSingleton.unsubscribeSocket(topic);
        };
    }, []);

    // Handler for preparing policy numbers list
    const preparePolicyNumbersList = () => {
        if (schemes && schemes.activeSchemes && schemes.activeSchemes.length > 0) {
            let schemeActivationCodes = {};
            schemes.activeSchemes.map(scheme => {
                if (scheme.activationCode) {
                    schemeActivationCodes[scheme.activationCode] = { policy_number: scheme.activationCode };
                }
            });

            setPolicyNumbers({ pensionScheme: Object.values(schemeActivationCodes) });
        }
    };

    // Handler for upload files function
    const handleUploadFiles = (fileId, reqBody, success, failure) => {
        api.uploadFiles(JSON.stringify(reqBody))
            .then(res => {
                success(fileId, res);
            })
            .catch(error => {
                failure(fileId, error);
            });
    };

    // Handler for trigger modules
    const handleTriggerModules = (fileId, reqBody, success, failure) => {
        api.executeStepfunctionSet(reqBody)
            .then(res => {
                success(fileId, res);
            })
            .catch(error => {
                failure(fileId, error);
            });
    };

    // Handler to getting processed files function
    const handleGetProcessedFiles = (reqBody, success, failure) => {
        api.getProcessedFiles(JSON.stringify(reqBody))
            .then(res => {
                setSocketPayload(null);
                success(res.data.content);
            })
            .catch(error => {
                failure(error);
            });
    };

    // Handler for downloading files function
    const handleDownloadFile = (reqBody, success, failure) => {
        api.downloadFile(JSON.stringify(reqBody))
            .then(res => {
                success(res.data.content);
            })
            .catch(error => {
                failure(error);
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

    return (
        <>
            <section className="proposal-information-section">
                <div className="root-form-wrapper-information">
                    <div className="card card-wrapper">
                        <FileUploader
                            user={loggedUser && loggedUser.name ? loggedUser.name : 'N/A'}
                            fontFamily="sans-serif"
                            schemeList={policyNumbers}
                            width={1170} // With  default side menu bar = 775
                            backgroundColor="#fafafa"
                            uploadFiles={handleUploadFiles}
                            getProcessedFiles={handleGetProcessedFiles}
                            downloadFile={handleDownloadFile}
                            notificationPopUp={handleCommonSystemMessagePopUp}
                            tenant={TENANT}
                            processedFileStatus={socketPayload}
                            executeStepFuncSet={handleTriggerModules}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AnalyticsManagement;
