export const OnSubmitHook = {
    //use to format data before submitting data
    whenSubmitDataFormat: (data, props) => data,
    //use to validate data before submitting data
    whenSubmitValidation: (data, asyncErrors, dataset) => {
        return {};
    },
    //use to do some functionality when submitting data
    submitAsCallback: (successCb, failCb, formData) => successCb && successCb()
};