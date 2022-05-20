export const OnSaveHook = {
    //use to format data before saving data
    whenSaveDataFormat: (data, props) => data,
    //use to validate data before saving data
    whenSaveValidation: (data, asyncErrors, dataset) => {
        return {};
    },
    //use to do some functionality when saving data
    saveAsCallback: (successCb, failCb, formData) => successCb && successCb()
};