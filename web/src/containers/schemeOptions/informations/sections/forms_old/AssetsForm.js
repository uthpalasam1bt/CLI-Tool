import React, { Component } from 'react';
import { change, FormSection, formValueSelector } from 'redux-form';
import FormBaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import { connect } from 'react-redux';
import formSectionJSON from './json/assetsForm';

import { INITIAL_PROPOSAL_FORM, ASSETS_FORM_SECTION } from '../../../registration/Steps/reqip/constants';

const { KEY, FIELD_KEYS } = ASSETS_FORM_SECTION;
const {
    // EXISTING_PROPOSALS,
    KNOW_TARGET_RETURN
    // KNOW_CURRENT_ASSET_ALLOCATION,
    // KNOW_LIABILITY_HEDGE_RATIO,
    // KNOW_TOTAL_AM_ICF,
    //
    // CURRENT_ASSET_ALLOCATION_TYPE,
    // SIMPLE_EQUITIES,
    // SIMPLE_CORPORATE_BONDS,
    // SIMPLE_PROPERTY,
    // SIMPLE_GOVERNMENT_BONDS,
    // SIMPLE_ALTERNATIVES,
    // SIMPLE_CASH,
    // SIMPLE_DIVERSIFIED_GROWTH,
    // SIMPLE_BUY_IN,
    // DETAIL_UK_EQUITY,
    // DETAIL_DIVERSIFIED_GROWTH,
    // DETAIL_GLOBAL_EQUITY,
    // DETAIL_CORPORATE_BONDS,
    // DETAIL_EMERGING_MARKET_EQUITY,
    // DETAIL_OVERSEAS_SOVEREIGN_BONDS,
    // DETAIL_HIGH_YIELD_BONDS,
    // DETAIL_NOMINAL_GILTS,
    // DETAIL_EMERGING_MARKET_DEBT,
    // DETAIL_INDEX_LINKED_GILTS,
    // DETAIL_PROPERTY,
    // DETAIL_LDI,
    // DETAIL_INFRASTRUCTURE,
    // DETAIL_CASH,
    // DETAIL_BUY_IN,
    //
    // ASSET_ALLOCATION_TOTAL,
    // ASSET_VALUE
} = FIELD_KEYS;

// const simpleAssetAllocationFields = [
//     SIMPLE_EQUITIES,
//     SIMPLE_CORPORATE_BONDS,
//     SIMPLE_PROPERTY,
//     SIMPLE_GOVERNMENT_BONDS,
//     SIMPLE_ALTERNATIVES,
//     SIMPLE_CASH,
//     SIMPLE_DIVERSIFIED_GROWTH,
//     SIMPLE_BUY_IN
// ];
// const detailAssetAllocationFields = [
//     DETAIL_UK_EQUITY,
//     DETAIL_DIVERSIFIED_GROWTH,
//     DETAIL_GLOBAL_EQUITY,
//     DETAIL_CORPORATE_BONDS,
//     DETAIL_EMERGING_MARKET_EQUITY,
//     DETAIL_OVERSEAS_SOVEREIGN_BONDS,
//     DETAIL_HIGH_YIELD_BONDS,
//     DETAIL_NOMINAL_GILTS,
//     DETAIL_EMERGING_MARKET_DEBT,
//     DETAIL_INDEX_LINKED_GILTS,
//     DETAIL_PROPERTY,
//     DETAIL_LDI,
//     DETAIL_INFRASTRUCTURE,
//     DETAIL_CASH,
//     DETAIL_BUY_IN
// ];

class AssetsFormSection extends Component {
    state = {
        total: 0
    };

    // UNSAFE_componentWillReceiveProps(np, nc) {
    //     if (np[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple') {
    //         let total = 0;
    //         for (let field of simpleAssetAllocationFields) {
    //             if (!np[field] || !Number(np[field])) continue;
    //
    //             total += Number(np[field]);
    //         }
    //
    //         store.dispatch(change(INITIAL_PROPOSAL_FORM, `${KEY}.${ASSET_ALLOCATION_TOTAL}`, total));
    //         this.setState({ total });
    //     }
    //
    //     if (np[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail') {
    //         let total = 0;
    //         for (let field of detailAssetAllocationFields) {
    //             if (!np[field] || !Number(np[field])) continue;
    //
    //             total += Number(np[field]);
    //         }
    //
    //         store.dispatch(change(INITIAL_PROPOSAL_FORM, `${KEY}.${ASSET_ALLOCATION_TOTAL}`, total));
    //         this.setState({ total });
    //     }
    // }

    render() {
        const { total } = this.state;
        const formFields = formSectionJSON({ ...this.props }, total);

        return (
            <FormSection name={KEY}>
                <FormBaseTemplate data={formFields} disabled={this.props.disabled} />
            </FormSection>
        );
    }
}

const selector = formValueSelector(INITIAL_PROPOSAL_FORM);
AssetsFormSection = connect(state => ({
    // [EXISTING_PROPOSALS]: selector(state, `${KEY}.${EXISTING_PROPOSALS}`),
    [KNOW_TARGET_RETURN]: selector(state, `${KEY}.${KNOW_TARGET_RETURN}`)
    // [KNOW_CURRENT_ASSET_ALLOCATION]: selector(state, `${KEY}.${KNOW_CURRENT_ASSET_ALLOCATION}`),
    // [KNOW_LIABILITY_HEDGE_RATIO]: selector(state, `${KEY}.${KNOW_LIABILITY_HEDGE_RATIO}`),
    // [KNOW_TOTAL_AM_ICF]: selector(state, `${KEY}.${KNOW_TOTAL_AM_ICF}`),
    //
    // [CURRENT_ASSET_ALLOCATION_TYPE]: selector(state, `${KEY}.${CURRENT_ASSET_ALLOCATION_TYPE}`),
    // [SIMPLE_EQUITIES]: selector(state, `${KEY}.${SIMPLE_EQUITIES}`),
    // [SIMPLE_CORPORATE_BONDS]: selector(state, `${KEY}.${SIMPLE_CORPORATE_BONDS}`),
    // [SIMPLE_PROPERTY]: selector(state, `${KEY}.${SIMPLE_PROPERTY}`),
    // [SIMPLE_GOVERNMENT_BONDS]: selector(state, `${KEY}.${SIMPLE_GOVERNMENT_BONDS}`),
    // [SIMPLE_ALTERNATIVES]: selector(state, `${KEY}.${SIMPLE_ALTERNATIVES}`),
    // [SIMPLE_CASH]: selector(state, `${KEY}.${SIMPLE_CASH}`),
    // [SIMPLE_DIVERSIFIED_GROWTH]: selector(state, `${KEY}.${SIMPLE_DIVERSIFIED_GROWTH}`),
    // [SIMPLE_BUY_IN]: selector(state, `${KEY}.${SIMPLE_BUY_IN}`),
    //
    // [DETAIL_UK_EQUITY]: selector(state, `${KEY}.${DETAIL_UK_EQUITY}`),
    // [DETAIL_DIVERSIFIED_GROWTH]: selector(state, `${KEY}.${DETAIL_DIVERSIFIED_GROWTH}`),
    // [DETAIL_GLOBAL_EQUITY]: selector(state, `${KEY}.${DETAIL_GLOBAL_EQUITY}`),
    // [DETAIL_CORPORATE_BONDS]: selector(state, `${KEY}.${DETAIL_CORPORATE_BONDS}`),
    // [DETAIL_EMERGING_MARKET_EQUITY]: selector(state, `${KEY}.${DETAIL_EMERGING_MARKET_EQUITY}`),
    // [DETAIL_OVERSEAS_SOVEREIGN_BONDS]: selector(state, `${KEY}.${DETAIL_OVERSEAS_SOVEREIGN_BONDS}`),
    // [DETAIL_HIGH_YIELD_BONDS]: selector(state, `${KEY}.${DETAIL_HIGH_YIELD_BONDS}`),
    // [DETAIL_NOMINAL_GILTS]: selector(state, `${KEY}.${DETAIL_NOMINAL_GILTS}`),
    // [DETAIL_EMERGING_MARKET_DEBT]: selector(state, `${KEY}.${DETAIL_EMERGING_MARKET_DEBT}`),
    // [DETAIL_INDEX_LINKED_GILTS]: selector(state, `${KEY}.${DETAIL_INDEX_LINKED_GILTS}`),
    // [DETAIL_PROPERTY]: selector(state, `${KEY}.${DETAIL_PROPERTY}`),
    // [DETAIL_LDI]: selector(state, `${KEY}.${DETAIL_LDI}`),
    // [DETAIL_INFRASTRUCTURE]: selector(state, `${KEY}.${DETAIL_INFRASTRUCTURE}`),
    // [DETAIL_CASH]: selector(state, `${KEY}.${DETAIL_CASH}`),
    // [DETAIL_BUY_IN]: selector(state, `${KEY}.${DETAIL_BUY_IN}`),
    //
    // [ASSET_ALLOCATION_TOTAL]: selector(state, `${KEY}.${KNOW_TOTAL_AM_ICF}`),
    // [ASSET_VALUE]: selector(state, `${KEY}.${ASSET_VALUE}`)
}))(AssetsFormSection);

export default AssetsFormSection;
