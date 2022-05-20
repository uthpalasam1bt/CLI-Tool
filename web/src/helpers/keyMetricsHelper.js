import _ from 'lodash';
import moment from 'moment';

const transformData = (name, data, cnf) => {
    if (Array.isArray(data)) {
        data = data.map(d => {
            if (moment.isMoment(d)) {
                return d.format(
                    cnf.filter(f => _.has(f, `filterConfig`)).find(f => f.columnName === name).filterConfig
                        .dateFormat || 'YYYY/MM/DD'
                );
            } else {
                return d;
            }
        });
    } else {
        if (moment.isMoment(data)) {
            data = data.format(
                cnf.filter(f => _.has(f, `filterConfig`)).find(f => f.columnName === name).filterConfig.dateFormat ||
                    'YYYY/MM/DD'
            );
        }
    }
    return data;
};

export { transformData };
