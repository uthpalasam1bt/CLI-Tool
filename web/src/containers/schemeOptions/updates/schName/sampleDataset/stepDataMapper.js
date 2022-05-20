import dataset1 from './chngSchName/dataset.json';
import dataset2 from './dwnldSchDetl/dataset.json';
import dataset3 from './genrtDocs/dataset.json';
import dataset4 from './aprvIaa/dataset.json';
import dataset5 from './aprvFma/dataset.json';
import dataset6 from './aprvPmc/dataset.json';
import dataset7 from './aprvSip/dataset.json';
import dataset8 from './publDocs/dataset.json';
import dataset9 from './schAprvIaa/dataset.json';
import dataset10 from './schAprvFma/dataset.json';
import dataset11 from './schAprvPmc/dataset.json';
import dataset12 from './schAprvSip/dataset.json';
import dataset13 from './spnsrConsltLtr/dataset.json';
import dataset14 from './lgimDocsExcuStat/dataset.json';
import dataset15 from './actMendt/dataset.json';

export const schemeNameChangeDataMap = {
    schName: {
        chngSchName: () => dataset1,
        dwnldSchDetl: () => dataset2,
        genrtDocs: () => dataset3,
        aprvIaa: () => dataset4,
        aprvFma: () => dataset5,
        aprvPmc: () => dataset6,
        aprvSip: () => dataset7,
        publDocs: () => dataset8,
        schAprvIaa: () => dataset9,
        schAprvFma: () => dataset10,
        schAprvPmc: () => dataset11,
        schAprvSip: () => dataset12,
        spnsrConsltLtr: () => dataset13,
        lgimDocsExcuStat: () => dataset14,
        actMendt: () => dataset15
    }
};
