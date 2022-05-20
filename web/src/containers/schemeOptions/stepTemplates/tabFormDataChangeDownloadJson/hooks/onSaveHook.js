export const OnSaveHook = {
    //use to format data before saving data
    whenSaveDataFormat: (data, props) => data,
    //use to validate data before saving data
    whenSaveValidation: (data, asyncErrors, dataset) => {
        return {};
    }
   
};