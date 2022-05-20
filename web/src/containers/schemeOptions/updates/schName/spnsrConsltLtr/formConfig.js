import React from 'react';
import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';

import constants from '../../../../../UILibrary/constants';
import { HAS_SPONSOR_BEEN_CONSULTED } from './constants';

import _ from 'lodash';
import { Spin } from 'antd';
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    const ConsultationSponsor = _.get(props, 'dataset.documents.ConsultationSponsor.url', null);

    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Has the sponsor been consulted?',
            field: {
                name: HAS_SPONSOR_BEEN_CONSULTED,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            }
        },

        {
            type: ROW,
            rawComponents: ConsultationSponsor && (
                <div className="doc-preview-container">
                    <div>
                        <PDFViewer documentURL={ConsultationSponsor} />
                    </div>
                </div>
            )
        }
    ];
};
