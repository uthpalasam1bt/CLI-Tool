import _ from 'lodash';
import store from '../../../../../../redux/store';
import { trusteePickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import { checkIfSchemeWithNameExists } from '../../../../actions/schemeOptionActions';
import {
    TAB_KEYS,
    TRUSTEES_PICKER_SECTION
} from '../constants';
export const OnSubmitHook = {
    whenSubmitValidation: (formData, asyncErr, dataset) => {
        const tabData = formData['schemeNameChangeForm'];

        
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
                message: 'At least one trustee must be provided!',
                navigateTo: TAB_KEYS.SCHEME_FORM
            };
        }

        // check indvidual trustee count and provided trustee count match
        const givenCount = indvTrusteesEntities.length;
        const numOfIndvTrustees = tabData['numOfIndividualTrustees'] ? tabData['numOfIndividualTrustees'] : 0;
        if (numOfIndvTrustees != givenCount)
            return {
                message: 'There is a discrepancy in the number of trustees.',
                navigateTo: TAB_KEYS.SCHEME_FORM
            };

        // check no of corp. entities
        const minCorpEntities = 1;
        const entityPlaceholder = minCorpEntities > 1 ? 'entities' : 'entity';
        if (corpTrusteesEntities.length > 0 && corpTrusteesEntities.length < minCorpEntities) {
            return {
                message: `At least ${minCorpEntities} corporate trustee ${entityPlaceholder} must be provided!`,
                navigateTo: TAB_KEYS.SCHEME_FORM
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
                message: `Please add at least ${minCorpTrustees} ${trusteePlaceholder} to continue.`,
                navigateTo: TAB_KEYS.SCHEME_FORM
            };

        // check duplicate corp. trustee company names
        let corpEntityNames = new Set();
        let hasDuplicates = corpTrusteesEntities.some(
            x => corpEntityNames.size === corpEntityNames.add(x.entityName).size
        );
        if (hasDuplicates)
            return {
                message: "Cannot have the same 'Corporate trustee company name' for multiple entities.",
                navigateTo: TAB_KEYS.SCHEME_FORM
            };

        // validate signatory selection
        if (corpTrusteesEntities.length > 0) {
            const err = trusteePickerValidator(dataset, 'signatories', 'IAA', ['client'], 2);
            if (err) {
                err.navigateTo = TRUSTEES_PICKER_SECTION.KEY;
                return err;
            }
        }

        return {};
    },
    submitAsCallback: (submitForm, stopSubmitForm, formData, props, onchangeTab) => {
        if (
            _.get(formData, 'schemeNameChangeForm.schemeName') &&
            _.get(props, `dataset.formData.schemeNameChangeForm.schemeName`)
        ) {
            if (_.has(props, 'options.formDataChangeCallback'))
                props.options.formDataChangeCallback(_.get(formData, 'schemeNameChangeForm.schemeName'), props);

            if (
                _.get(formData, 'schemeNameChangeForm.schemeName') ===
                _.get(props, `dataset.formData.schemeNameChangeForm.schemeName`)
            ) {
                onchangeTab(TAB_KEYS.SCHEME_FORM)
                stopSubmitForm();
            } else {
                submitForm();
            }
        }
    },
    whenFormDataChange: (dirtyFormValues, dataset, handleChangeDataset, props) => {
        if (dirtyFormValues && dataset && props) {
            const callback = result => {
                if (_.has(props, 'options.setAvilable')) props.options.setAvilable(result);

                if (_.has(props, 'options.formDataChangeCallback'))
                    props.options.formDataChangeCallback(
                        _.get(dirtyFormValues, 'schemeNameChangeForm.schemeName'),
                        props,
                        result
                    );
            };
            if (
                _.has(dirtyFormValues, 'schemeNameChangeForm.schemeName') &&
                _.get(dirtyFormValues, 'schemeNameChangeForm.schemeName') !==
                    _.get(props, `dataset.formData.schemeNameChangeForm.schemeName`)
            ) {
                store.dispatch(
                    checkIfSchemeWithNameExists(_.get(dirtyFormValues, 'schemeNameChangeForm.schemeName'), callback)
                );
            }
        }
    },
    submitTabNavigateHook: (activeTab) => {
        if (activeTab === TAB_KEYS.SCHEME_FORM) {
            return { navigateTo: TAB_KEYS.ADMIN_FORM }
        } else {
            return { navigateTo: null }
        }
    }
};
