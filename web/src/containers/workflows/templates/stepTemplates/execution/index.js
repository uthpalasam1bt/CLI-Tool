import React from 'react';

import SignatoryTableExecution from './templates/signatoryTableExecution';
import constants from '../../../constants';

const { SIGNATORY_TABLE_EXECUTION } = constants;

const CreateExecutionSection = props => {
    const { executionType } = props;

    return <>{executionType === SIGNATORY_TABLE_EXECUTION ? <SignatoryTableExecution {...props} /> : null}</>;
};

export default CreateExecutionSection;
