import React from 'react';
import moment from 'moment';

const sortByName = (a, b) => {
    let aString = a.scheme.schemeName.toLowerCase();
    let bString = b.scheme.schemeName.toLowerCase();
    if (aString < bString) return -1;
    if (aString > bString) return 1;
    return 0;
};

let numberSort = (a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0);

let convertToBillion = numStr => (numStr === '-' ? numStr : (Number(numStr) / 1000000).toFixed(1) + 'm');

const sortByDate = (a, b) => {
    const dateA = moment(a.createdDate, 'DD-MM-YYYY');
    const dateB = moment(b.createdDate, 'DD-MM-YYYY');
    return new Date(dateA) - new Date(dateB);
};

const statusDataMapper = {
    P: {
        className: 'orange-dot',
        displayText: 'Pending'
    },
    US: {
        className: 'grey-dot',
        displayText: 'Underway-Scheme'
    },
    UL: {
        className: 'blue-dot',
        displayText: 'Underway-LGIM'
    },
    C: {
        className: 'green-dot',
        displayText: 'Completed'
    }
};

const FieldStatus = ({ status }) => (
    <span className="italic-text">
        <span className={`dot ${statusDataMapper[status] && statusDataMapper[status].className}`} />
        {statusDataMapper[status] ? statusDataMapper[status].displayText : '-'}
    </span>
);

let columnsMap = (redirectToSchemeOptions, type, updateIsFavourite) => [
    {
        title: 'Name',
        key: 'scheme',
        dataIndex: 'scheme',
        width: 200,
        sorter: sortByName,
        render: scheme => (
            <span className="text-link">
                <i
                    className={`fa fa-icon ${scheme.isFavorite ? 'fa-star selected' : 'fa-star-o'}`}
                    onClick={() => {
                        updateIsFavourite(scheme);
                    }}
                ></i>
                <span
                    onClick={() => {
                        redirectToSchemeOptions(type, scheme);
                    }}
                >
                    {' '}
                    {scheme.schemeName}
                </span>
            </span>
        )
    },
    {
        title: 'Policy',
        key: 'policy',
        dataIndex: 'policy',
        width: 150,
        sorter: (a, b) => numberSort(a.policy, b.policy)
    },
    {
        title: 'Assets',
        key: 'assets',
        dataIndex: 'assets',
        width: 150,
        sorter: (a, b) => numberSort(a.assets, b.assets),
        render: assets => (
            <div>
                <span className="table-text-gray"> {assets && assets !== '-' && '£'} </span>
                <span>{convertToBillion(assets)}</span>
            </div>
        )
    },
    {
        title: 'Proposal',
        key: 'investmentProposal',
        dataIndex: 'investmentProposal',
        width: 200,
        render: status => <FieldStatus status={status} />
    },
    {
        title: 'Advisory Agreement',
        key: 'advisoryAgreement',
        dataIndex: 'advisoryAgreement',
        width: 200,
        render: status => <FieldStatus status={status} />
    },
    {
        title: 'Management Agreement',
        key: 'fmAgreement',
        dataIndex: 'fmAgreement',
        width: 200,
        render: status => <FieldStatus status={status} />
    }
];

export default columnsMap;
