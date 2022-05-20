import moment from 'moment';
import _ from 'lodash';
const statusDataMapper = {
    P: 'Pending',
    US: 'Underway-Scheme',
    UL: 'Underway-LGIM',
    C: 'Completed'
};

const reportFlagMapper = {
    CORE: 'Core',
    NAVGUIDE: 'Nav Guide',
    DDF: 'DDF',
    BESPOKE: 'Bespoke',
    NONE: 'None'
};

const showHrFlagMapper = {
    ASSETS: 'Assets',
    LIABILITIES: 'Liabilities'
};

const chartingTypeFlagMapper = {
    SIMPLE: 'Simple',
    COMPLEX: 'Complex'
};

let convertToBillion = numStr => (numStr === '-' ? numStr : (Number(numStr) / 1000000).toFixed(1) + 'M');
export const registerationSchemeDowHooks = {
    schemeName: {
        label: 'Name',
        text: val => val
    },
    // createdAt: {
    //   label: 'Created Date',
    //   text: val => Moment.dateOnly(val, true)
    // },
    policy: {
        label: 'Policy',
        text: val => val
    },
    assets: {
        label: 'Assets',
        text: val => val && val !== '-' && `£${convertToBillion(val)}`
    },
    investmentproposalStatus: {
        label: 'Formal proposalStatus',
        text: val => statusDataMapper[val]
    },
    advisoryAgreementStatus: {
        label: 'Advisory Agreement',
        text: val => statusDataMapper[val]
    },
    fmAgreement: {
        label: 'Asset Mngmt. Agreement',
        text: val => statusDataMapper[val]
    }
};

export const csvFormatHook = (_value, configData) => {
    let DataArr = _.map(configData, f => _.pick(f, ['csvLabelName', 'columnName']));
    let uniq = [...new Set(_value)];
    let tempArr = [];

    DataArr.map(_column => {
        uniq.filter(_f => {
            if (_column.columnName === _f) {
                return tempArr.push({ label: _column.csvLabelName, value: _column.columnName });
            } else return null;
        });
    });

    return tempArr;
};
