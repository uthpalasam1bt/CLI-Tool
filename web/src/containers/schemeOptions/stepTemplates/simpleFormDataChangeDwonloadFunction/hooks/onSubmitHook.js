export const OnSubmitHook = {
    //use to format data before submitting data
    whenSubmitDataFormat: (data, props) => data,
    //use to validate data before submitting data
    whenSubmitValidation: (data, asyncErrors, dataset) => {
        return {};
    }
   
};