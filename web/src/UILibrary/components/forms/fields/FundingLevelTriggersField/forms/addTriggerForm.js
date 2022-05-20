import React from 'react';
import { reduxForm } from 'redux-form';
import FormBaseTemplate from '../../../formBase/FormBase';
import { formFields } from '../json/forms';
import { ADD_NEW_TRIGGER_FORM } from '../constants';

let AddNewTriggerForm = props => {
  const { handleSubmit, defineTriggersData } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-body">
        <FormBaseTemplate data={formFields(defineTriggersData)} />
      </div>
    </form>
  );
};

AddNewTriggerForm = reduxForm({
  form: ADD_NEW_TRIGGER_FORM
  //asyncBlurFields: ['upperTriggerFundingLvl1']
})(AddNewTriggerForm);

export default AddNewTriggerForm;
