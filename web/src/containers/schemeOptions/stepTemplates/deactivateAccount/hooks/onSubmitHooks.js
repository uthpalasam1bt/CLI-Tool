import { Modal } from 'antd';
import moment from 'moment';

export const OnSubmitHook = {
    whenSubmitValidation: async (formData, asyncErr, dataset) => {
        return {};
    },
    whenSubmitDataFormat: data => {
        let { deactivateDate } = data;
        let submitData = {
            deactivateDate,
            shouldSchedule: false
        };
        if (moment(deactivateDate, 'YYYY-MM-DD') > moment()) {
            submitData.shouldSchedule = true;
        }
        return submitData;
    },
    submitAsCallback: (successCb, failCb, formData) => {
        //builds warning message
        let { deactivateDate } = formData;

        let message = '';
        // changed the format according to bug ticket TP2-1770
        if (moment(deactivateDate, 'YYYY-MM-DD') <= moment()) {
            message = 'Are you sure you want to deactivate the scheme?';
        } else {
            message = `Are you sure you want to deactivate the scheme on ${moment(deactivateDate, 'YYYY-MM-DD').format(
                'DD/MM/YYYY'
            )}`;
        }
        Modal.confirm({
            title: message,
            onOk() {
                if (successCb) successCb();
            },
            onCancel() {
                if (failCb) failCb();
            }
        });
    }
};
