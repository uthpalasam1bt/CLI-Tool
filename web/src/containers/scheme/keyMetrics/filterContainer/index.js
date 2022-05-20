import React from 'react';
import Filter from '../../../../components/scheme/filter';

const FilterContainer = props => {
    const { filters, callback } = props;

    return (
        <>
            {filters.map(f =>
                f.visible ? (
                    <div className="lgim-styles-wrapper km-filter-cm">
                        <Filter
                            config={{
                                filterConfig: f.filterConfig,
                                displayName: f.displayName.toUpperCase(),
                                columnName: f.columnName,
                                data: f.data,
                                styleConfig: {
                                    ...(f.data ? { buttonColor: '#1899cc', fontColor: 'white' } : {}),
                                    marginLeft: '5px',
                                    marginTop: '1rem',
                                    fontSize: '13px',
                                    iconStyle: true
                                },
                                showValue: true
                            }}
                            callback={callback}
                            filters={filters}
                        />
                    </div>
                ) : null
            )}
        </>
    );
};

export default FilterContainer;
