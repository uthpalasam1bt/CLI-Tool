import React from 'react';
import { reduxForm } from 'redux-form';
import FormBaseTemplate from '../../../formBase/FormBase';
import { defineTriggersFormFields } from '../json/forms';
import { DEFINE_TRIGGER_FORM } from '../constants';

let DefineTriggerForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-body">
        <FormBaseTemplate data={defineTriggersFormFields(props)} />
      </div>
    </form>
  );
};

DefineTriggerForm = reduxForm({
  form: DEFINE_TRIGGER_FORM
  //asyncBlurFields: ['upperTriggerFundingLvl1']
})(DefineTriggerForm);

export default DefineTriggerForm;
