import React from 'react';
import { Row, Col } from 'antd';
import config from 'appConfig';
import { FileDownloader } from '../../../../../../../UILibrary/components/forms/fields';
import connectApi from '../../../../../../../middlewares/connectApi';

const { bucket: privateBucketName, publicBucket: publicBucketName, generateBucket: generateBucketName } = config;

const MultipleDocViewer = props => {
    const { urls = [], title, hideTitles = false, bucketType = false ,published=false ,requiredDocStatus} = props;
    return (
        <div className="form-body">
            {urls.map((subDoc, subKey) =>{ 
                if(requiredDocStatus&&subDoc.documentStatus===requiredDocStatus){
                    return (
                        <Row className={hideTitles ? 'input-row' : 'input-row checkbox-row'} key={subKey}>
                    {!hideTitles && (
                        <Col xl={14} lg={12} xs={24} className="label-wrapper">
                            <label className="input-title">{title.replace(/\%\w+\%/i, ' ' + (subKey + 1))}</label>
                        </Col>
                    )}
                    <Col xl={10} lg={12} xs={24} className={!hideTitles && 'pull-right'}>
                        <div className={!hideTitles ? 'resource-wrapper' : 'resource-wrapper pull-left'}>
                            <FileDownloader
                                type="resource"
                                url={subDoc.url}
                                api={connectApi}
                                bucketNameProp={bucketType ? publicBucketName : privateBucketName}
                            />
                        </div>
                    </Col>
                </Row>
                    )
                }
                if(!requiredDocStatus){
                    return (
                        <Row className={hideTitles ? 'input-row' : 'input-row checkbox-row'} key={subKey}>
                            {!hideTitles && (
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">{title.replace(/\%\w+\%/i, ' ' + (subKey + 1))}</label>
                                </Col>
                            )}
                            <Col xl={10} lg={12} xs={24} className={!hideTitles && 'pull-right'}>
                                <div className={!hideTitles ? 'resource-wrapper' : 'resource-wrapper pull-left'}>
                                    <FileDownloader
                                        type="resource"
                                        url={subDoc.url}
                                        api={connectApi}
                                        bucketNameProp={bucketType ? publicBucketName : privateBucketName}
                                    />
                                </div>
                            </Col>
                        </Row>
                    )
                }
               })}
        </div>
    );
};

export default MultipleDocViewer;
