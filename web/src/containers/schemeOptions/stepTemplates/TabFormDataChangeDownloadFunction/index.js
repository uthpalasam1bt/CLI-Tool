/* 
This step template can be used to create a tab form data change download component  (tab form ) which contains tabs 
To create tabs ,a tab configuration ( formTabs) should pass to this component
inside the tab configuration the devloper can define the formfields for each tab by passing a functional config and json config

in this component the user can change the form data and download the form data as zip file
*/

import React from 'react';
import { Row as AntRow } from 'antd';
import { required, length } from 'redux-form-validators';
import { tabTwoConfig } from './tabTwoFormConfig';
import { tabOneConfig } from './tabOneFormConfig';

import DownloadUiTemplate from '../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../middlewares/connectApi';
import uiLibConstants from '../../../../UILibrary/constants';
import { FormField } from '../../../../UILibrary/components/forms/fields';
import constants from '../../../workflows/constants';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    TAB_KEYS,
    TAB_NAME,
    DOWNLOAD_ZIP_NAME,
    EXCEL_TAB_NAME,
    COMPONENT_TEXT_AREA_NAME,
    COMPONENT_TEXT_AREA_LABEL
} from './constants'; //constants that are  used in this template creation

const {
    DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_FIELDS,
    FORM_SECTION_INCLUDE_COMPONENT
} = uiLibConstants;
const { TEXTAREA } = FORM_FIELDS;
const { BUTTON_TITLE_CONTINUE } = constants;

const TabFormDataDownload = props => {
    const formTabs = [
        /* 
        developer has to pass a formTabs array to create a tab form to the template 
        each tab can be define as a object and each tab has to have 
                
        tabKey-each tab has to have a unique Key 
        tabName-a name for the tab to display in the form 
        type-the type of tab type that you want to create and each type has a way of passing a component to the tab 
        if the type is FORM_SECTION_INCLUDE_NEW then the developer can pass functional configuraation as formFieldFunction and the 
        Json configuration as formFieldData 
        the devloper can also pass a react jsx component directly as formSection if the specified type is FORM_SECTION_INCLUDE_COMPONENT 
        */
        {
            //tab one
            type: FORM_SECTION_INCLUDE_NEW, // tab Type
            tabKey: TAB_KEYS.TAB_ONE_FORM,
            tabName: TAB_NAME.TAB_ONE,
            formFieldFunction: tabOneConfig // passing a functional configuration
        },
        {
            //tab two
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.TAB_TWO_FORM,
            tabName: TAB_NAME.TAB_TWO,
            formFieldFunction: tabTwoConfig
        },
        {
            //tab three
            type: FORM_SECTION_INCLUDE_COMPONENT,
            tabKey: TAB_KEYS.TAB_THREE_FORM,
            tabName: TAB_NAME.TAB_THREE,
            // passing a jsx component
            formSection: (
                <div className="input-row">
                    <AntRow className="label-wrapper">
                        <p className="input-title">{COMPONENT_TEXT_AREA_LABEL}</p>
                    </AntRow>
                    <AntRow>
                        <FormField
                            component={TEXTAREA}
                            name={COMPONENT_TEXT_AREA_NAME}
                            className="form-control w-100"
                            validate={[length({ max: 1500 }), required({ message: 'Required' })]}
                            maxlength="1500"
                            disabled={false} // to disabel the field (must be false) because the user can change the data and download the form data using this component
                        />
                    </AntRow>
                </div>
            )
        }
    ];

    return (
        <>
            <DownloadUiTemplate
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE} // specifying the component type to be created
                formTabs={formTabs} // passing the formTabs array which contains the configuration for the components to be created in each tab
                formName={FORM_NAME} // form name
                options={{
                    title: FORM_TITLE, // title to display in the header
                    titleIicon: FORM_I_ICON, // description to the icon in the header
                    submitButton: {
                        // contains the properties to the continue button displayed in the header
                        title: BUTTON_TITLE_CONTINUE // text to the continue button
                    },
                    labelOverRide: {
                        /* 
                        developer can override the field names that has been  specified in the configuration file that passed 
                        to this component  and download that field data using a different name,
                        for that the developer has to pass the field name that has been speified in  the config as a key 
                        and a new name as a value to be override in this object

                        ***field name : new name***
                         */

                        hmrcDocument: 'Hmrc Document'
                    },
                    zipName: DOWNLOAD_ZIP_NAME, // name to the zip file that being downloaded using this component
                    excelTabNames: EXCEL_TAB_NAME, // tab name to the excel sheet
                    excelFileName: 'IAA Request details', //downloaded excel file name
                    attachmentArray: [
                        /* 
                        developer can also download the documents and letters that has been uploaded 
                        to download the documents developer has to specify the uploaded field name in this array 
                        */
                        'hmrcDocument'
                    ]
                }}
                downloadOptions={{
                    /* 
                     contain the api's to download documents

                    */
                    api: connectApi
                }}
                disabled={false} // used to disable the fields in the component (must be false)
                {...props} // props that are passed down to the child components
            />
        </>
    );
};

export default TabFormDataDownload;
