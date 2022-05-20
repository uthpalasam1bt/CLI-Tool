import React from 'react';
import _ from 'lodash';
import { Modal } from 'antd';
import { change } from 'redux-form';
import store from '../../../../../../redux/store';
import { IAA_FORM_SECTION, FORM_NAME } from '../constants';
import { otpValidate } from '../../../../../user/actions/loginActions';
import { trusteePickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';

export const OnSubmitHook = {
    whenSubmitValidation: (formData, asyncErr, dataset) => {
        const tabData = formData[IAA_FORM_SECTION.KEY];

        const indvTrusteesEntities = _.get(tabData, 'trusteeEntities', []).filter(
            x => x.trusteeEntityType == 'INDIVIDUAL'
        );
        const corpTrusteesEntities = _.get(tabData, 'trusteeEntities', []).filter(
            x => x.trusteeEntityType !== 'INDIVIDUAL'
        );

        // check that at least one trustee is provided
        const trusteeCount = _.get(tabData, 'trusteeEntities', []).length;
        if (!trusteeCount) {
            return {
                message: 'At least one trustee must be provided!'
            };
        }

        // check indvidual trustee count and provided trustee count match
        const givenCount = indvTrusteesEntities.length;
        const numOfIndvTrustees = tabData['numOfIndividualTrustees'] ? tabData['numOfIndividualTrustees'] : 0;
        if (numOfIndvTrustees != givenCount)
            return {
                message: 'There is a discrepancy in the number of trustees.'
            };

        // check no of corp. entities
        const minCorpEntities = 1;
        const entityPlaceholder = minCorpEntities > 1 ? 'entities' : 'entity';
        if (corpTrusteesEntities.length > 0 && corpTrusteesEntities.length < minCorpEntities) {
            return {
                message: `At least ${minCorpEntities} corporate trustee ${entityPlaceholder} must be provided!`
            };
        }

        // check no of trustees in a corp. entity
        const minCorpTrustees = 2;
        const trusteePlaceholder = minCorpTrustees > 1 ? 'corporate signatories' : 'corporate signatory';
        const noTrusteeEntities = corpTrusteesEntities.find(
            x => !x.trustees || !Array.isArray(x.trustees) || x.trustees.length < minCorpTrustees
        );
        if (noTrusteeEntities)
            return {
                message: `Please add at least ${minCorpTrustees} ${trusteePlaceholder} to continue.`
            };

        // check duplicate corp. trustee company names
        let corpEntityNames = new Set();
        let hasDuplicates = corpTrusteesEntities.some(
            x => corpEntityNames.size === corpEntityNames.add(x.entityName).size
        );
        if (hasDuplicates)
            return {
                message: "Cannot have the same 'Corporate trustee company name' for multiple entities."
            };

        // validate signatory selection
        if (corpTrusteesEntities.length > 0) {
            const errMessage = trusteePickerValidator(dataset, 'signatories', 'IAA', ['client'], 2);
            if (errMessage) return errMessage;
        }

        return {};
    },
    whenSubmitDataFormat: formData => {
        const tabData = formData[IAA_FORM_SECTION.KEY];
        const trusteeEntities = _.get(tabData, 'trusteeEntities', []);
        if (trusteeEntities.length > 0) {
            for (const entity of trusteeEntities) {
                for (const [i, trustee] of _.get(entity, 'trustees', []).entries()) {
                    if (_.get(trustee, 'signDigitally', 'no') == 'no' && _.has(trustee, 'mobileNumber'))
                        delete entity.trustees[i].mobileNumber;
                }

                // the OTP red icon won't show after submit the form
                // if (entity.trusteeEntityType == 'INDIVIDUAL' && _.has(entity, 'trustees[0].isOtpMisMatched')) {
                //     delete entity.trustees[0].isOtpMisMatched;
                // } else {
                //     for (const [i, trustee] of _.get(entity, 'trustees', []).entries()) {
                //         if (_.has(trustee, 'isOtpMisMatched')) delete entity.trustees[i].isOtpMisMatched;
                //     }
                // }
            }
            const copyFormData = _.cloneDeep(formData);
            copyFormData[IAA_FORM_SECTION.KEY]['trusteeEntities'] = trusteeEntities;
            return copyFormData;
        } else {
            return formData;
        }
    },
    submitAsCallback: (successCb, failCb, formData) => {
        const tabData = formData[IAA_FORM_SECTION.KEY];
        const trusteeEntities = _.get(tabData, 'trusteeEntities', []);
        let payload = { detailArray: [] };

        // check OTP
        for (const entity of trusteeEntities) {
            if (entity.trusteeEntityType == 'INDIVIDUAL') {
                if (entity.trustees[0].mobileNumber)
                    payload.detailArray.push({
                        email: entity.trustees[0].email,
                        newOtpNumber: entity.trustees[0].mobileNumber
                    });
            } else {
                entity.trustees.forEach(trustee => {
                    if (trustee.mobileNumber)
                        payload.detailArray.push({
                            email: trustee.email,
                            newOtpNumber: trustee.mobileNumber
                        });
                });
            }
        }

        if (payload.detailArray.length > 0) {
            store.dispatch(
                otpValidate(payload, res => {
                    if (res && Array.isArray(res)) {
                        let newOtps = {};
                        res.forEach(ele => {
                            if (!ele.match && !ele.newNum) newOtps[ele.email] = ele.newOtpNumber;
                        });
                        if (Object.keys(newOtps) && Object.keys(newOtps).length) {
                            Modal.confirm({
                                title: 'Mobile phone number mismatched',
                                content: (
                                    <>
                                        <p className="font-size-14">
                                            The mobile phone number you entered for the Trustee does not match the
                                            mobile phone number saved in the platform.
                                        </p>
                                        {Object.keys(newOtps).map((item, index) => (
                                            <p className="font-size-14">
                                                {' '}
                                                {item} : {newOtps[item]}
                                            </p>
                                        ))}
                                    </>
                                ),
                                onOk() {
                                    for (const email of Object.keys(newOtps)) {
                                        for (const entity of trusteeEntities) {
                                            if (
                                                entity.trusteeEntityType == 'INDIVIDUAL' &&
                                                entity.trustees[0].email == email
                                            ) {
                                                entity.trustees[0].isOtpMisMatched = true;
                                                break;
                                            } else {
                                                const trusteeIdx = entity.trustees.findIndex(
                                                    user => user.email == email
                                                );
                                                if (trusteeIdx > -1) {
                                                    entity.trustees[trusteeIdx].isOtpMisMatched = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (successCb) successCb();
                                   
                                },
                                onCancel() {
                                    for (const email of Object.keys(newOtps)) {
                                        for (const entity of trusteeEntities) {
                                            if (
                                                entity.trusteeEntityType == 'INDIVIDUAL' &&
                                                entity.trustees[0].email == email
                                            ) {
                                                entity.trustees[0].isOtpMisMatched = true;
                                                break;
                                            } else {
                                                const trusteeIdx = entity.trustees.findIndex(
                                                    user => user.email == email
                                                );
                                                if (trusteeIdx > -1) {
                                                    entity.trustees[trusteeIdx].isOtpMisMatched = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    store.dispatch(
                                        change(FORM_NAME, `${IAA_FORM_SECTION.KEY}.trusteeEntities`, trusteeEntities)
                                    );
                                    if (failCb) failCb();
                                }
                            });
                        } else {
                            if (successCb) successCb();
                        }
                    } else {
                        if (successCb) successCb();
                    }
                })
            );
        } else {
            if (successCb) successCb();
        }
    }
};
