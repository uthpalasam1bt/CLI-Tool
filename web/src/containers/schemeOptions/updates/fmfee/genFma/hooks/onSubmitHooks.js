/* 
this custom hooks can be used to check whether all the signatories has been selected to the documents 
*/
export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors) => {
        let errors = {};
        for (const key in dataset.documents) {
            if (key === 'IMA') continue;
            if (
                // checking the signatories data for each document
                !dataset.signatories ||
                !dataset.signatories[key] ||
                !dataset.signatories[key].admin ||
                !dataset.signatories[key].admin.length
            ) {
                errors = { message: `Please select the list of signatories from the PMC Directors.` }; // throwing an error if the user doensn't select the signatories for the documents
                break;
            }
            if (
                // checking the signatories data for each document
                !dataset.signatories ||
                !dataset.signatories[key] ||
                !dataset.signatories[key].clientTeam ||
                !dataset.signatories[key].clientTeam.length
            ) {
                errors = { message: `Please select the list of signatories from the Client Team.` }; // throwing an error if the user doensn't select the signatories for the documents
                break;
            }
        }
        return errors;
    },
    whenSubmitDataFormat: data => {
        return data;
    }
};
