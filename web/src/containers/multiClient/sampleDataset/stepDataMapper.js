import dataset1 from './changeFmFees/uploadFma/dataset.json';
import dataset2 from './changeFmFees/approveFmFees/dataset.json';
import dataset3 from './changeFmFees/publishToScm/dataset.json';

import dataset4 from './updateIaaFmaAttachement/uploadIaaFma/dataset.json';
import dataset5 from './updateIaaFmaAttachement/approveIaaFma/dataset.json';
import dataset6 from './updateIaaFmaAttachement/publishToScm/dataset.json';

import dataset7 from './distributeNotice/uploadNotice/dataset.json';
import dataset8 from './distributeNotice/approveNotice/dataset.json';
import dataset9 from './distributeNotice/publishToScm/dataset.json';

export const multiClientDataMap = {
    changeFmFees: {
        uploadFma: () => dataset1,
        approveFmFees: () => dataset2,
        publishToScm: () => dataset3
    },
    updateIaaFmaAttachement: {
        uploadIaaFma: () => dataset4,
        approveIaaFma: () => dataset5,
        publishToScm: () => dataset6
    },
    distributeNotice: {
        uploadNotice: () => dataset7,
        approveNotice: () => dataset8,
        publishToScm: () => dataset9
    }
};
